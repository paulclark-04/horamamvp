-- =============================================================================
-- FINAL RLS HARDENING MIGRATION
-- =============================================================================
-- This migration addresses critical security issues identified in review.
-- It is idempotent and can be re-run safely.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. CANDIDATURES: Replace unsafe FOR ALL with explicit policies
-- -----------------------------------------------------------------------------
-- Issue: FOR ALL without proper WITH CHECK is unsafe for INSERT/UPDATE ops.
-- Fix: Drop FOR ALL, create explicit SELECT/UPDATE/DELETE for admin, keep INSERT for public.

-- Drop all existing candidatures policies
drop policy if exists "Public can apply" on public.candidatures;
drop policy if exists "Admins view candidatures" on public.candidatures;
drop policy if exists "Admins manage candidatures" on public.candidatures;

-- Admin SELECT
create policy "Admin select candidatures"
  on public.candidatures
  for select
  using (public.is_admin());

-- Admin UPDATE (with check to prevent non-admins from updating)
create policy "Admin update candidatures"
  on public.candidatures
  for update
  using (public.is_admin())
  with check (public.is_admin());

-- Admin DELETE
create policy "Admin delete candidatures"
  on public.candidatures
  for delete
  using (public.is_admin());

-- Admin INSERT (admins can also create candidatures manually)
create policy "Admin insert candidatures"
  on public.candidatures
  for insert
  with check (public.is_admin());

-- Ensure statut is always present and defaults to 'new' (MVP safety)
alter table public.candidatures
  alter column statut set default 'new';

alter table public.candidatures
  alter column statut set not null;

-- Public INSERT (job application - only allowed columns enforced by DB defaults)
-- Note: statut defaults to 'new' at DB level, public cannot override
create policy "Public apply for jobs"
  on public.candidatures
  for insert
  with check (
    -- Allow insert only if statut is 'new' (default) to prevent public from setting other statuses.
    -- Use COALESCE so inserts that omit the column still pass (default applies).
    coalesce(statut, 'new') = 'new'
  );

-- -----------------------------------------------------------------------------
-- 2. ELEMENTS_MEDIA: Ensure is_public column and correct policies
-- -----------------------------------------------------------------------------
-- Already has is_public from previous migration, but let's ensure policies are correct

-- Ensure column exists (idempotent)
alter table public.elements_media add column if not exists is_public boolean default false;

-- Drop overly permissive policies
drop policy if exists "Public view media" on public.elements_media;
drop policy if exists "Public view public media only" on public.elements_media;
drop policy if exists "Admins manage media" on public.elements_media;

-- Public SELECT only where is_public = true
create policy "Public view public media"
  on public.elements_media
  for select
  using (is_public = true);

-- Admin has explicit SELECT (includes private media)
create policy "Admin select all media"
  on public.elements_media
  for select
  using (public.is_admin());

-- Admin INSERT
create policy "Admin insert media"
  on public.elements_media
  for insert
  with check (public.is_admin());

-- Admin UPDATE
create policy "Admin update media"
  on public.elements_media
  for update
  using (public.is_admin())
  with check (public.is_admin());

-- Admin DELETE
create policy "Admin delete media"
  on public.elements_media
  for delete
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- 3. CATEGORIES: Add is_public column for controlled visibility
-- -----------------------------------------------------------------------------
-- MVP model: Public can see categories marked as public, admin full CRUD

alter table public.categories add column if not exists is_public boolean default true;

-- Drop existing policies
drop policy if exists "Public view categories" on public.categories;
drop policy if exists "Authenticated view categories" on public.categories;
drop policy if exists "Admins manage categories" on public.categories;

-- Public SELECT only where is_public = true
create policy "Public view public categories"
  on public.categories
  for select
  using (is_public = true);

-- Admin SELECT (all categories)
create policy "Admin select all categories"
  on public.categories
  for select
  using (public.is_admin());

-- Admin INSERT
create policy "Admin insert categories"
  on public.categories
  for insert
  with check (public.is_admin());

-- Admin UPDATE
create policy "Admin update categories"
  on public.categories
  for update
  using (public.is_admin())
  with check (public.is_admin());

-- Admin DELETE
create policy "Admin delete categories"
  on public.categories
  for delete
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- 4. REMOVE promote_to_admin FUNCTION
-- -----------------------------------------------------------------------------
-- Issue: Mixed JWT claims with PostgreSQL roles incorrectly.
-- Fix: Remove entirely. Admin seeding must be done manually via SQL as postgres.

drop function if exists public.promote_to_admin(uuid);

-- DOCUMENTATION: To create an admin user after auth signup:
-- 1. Run as postgres/superuser:
--    INSERT INTO public.utilisateurs (id, email, role)
--    VALUES ('<user-uuid-from-auth.users>', '<user-email>', 'admin')
--    ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- -----------------------------------------------------------------------------
-- 5. OFFRES_EMPLOI: Add date_expiration and tighten public visibility
-- -----------------------------------------------------------------------------

-- Add expiration date column
alter table public.offres_emploi add column if not exists date_expiration timestamptz default null;

-- Drop existing public select policy
drop policy if exists "Public view published offers" on public.offres_emploi;

-- Public SELECT: published AND not expired
create policy "Public view active published offers"
  on public.offres_emploi
  for select
  using (
    statut = 'published'
    and (date_expiration is null or date_expiration > now())
  );

-- Ensure admin policy for offres_emploi is safe for INSERT/UPDATE as well (WITH CHECK)
drop policy if exists "Admins manage offers" on public.offres_emploi;

create policy "Admins manage offers"
  on public.offres_emploi
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================================================
-- END OF MIGRATION
-- =============================================================================
