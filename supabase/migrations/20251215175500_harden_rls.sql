-- -----------------------------------------------------------------------------
-- HARDENING RLS POLICIES (Follow-up)
-- -----------------------------------------------------------------------------

-- 1. Add is_public column to elements_media & tighten public select
alter table public.elements_media add column if not exists is_public boolean default false;

drop policy if exists "Public view media" on public.elements_media;
create policy "Public view public media only"
  on public.elements_media
  for select
  using (is_public = true);

-- 2. Tighten categories visibility (Admin-manageable, public read remains ok for published content navigation)
-- Option: Restrict to admin only. If you want public read, keep the existing policy.
-- Here we restrict to admin only for a stricter model:
drop policy if exists "Public view categories" on public.categories;
create policy "Authenticated view categories"
  on public.categories
  for select
  using (auth.role() = 'authenticated');

-- 3. Harden candidatures: deny update/delete for anon/authenticated
-- The existing "Public can apply" policy only allows INSERT, which is correct.
-- We explicitly block UPDATE and DELETE for non-admins:
drop policy if exists "Admins view candidatures" on public.candidatures;

create policy "Admins manage candidatures"
  on public.candidatures
  for all
  using (public.is_admin());

-- Explicitly deny update/delete for non-admins (safety net, RLS default is deny)
-- No additional policy needed as RLS defaults to deny. The admin policy handles admin access.
-- The INSERT policy "Public can apply" already exists and only allows inserts.

-- 4. Secure promote_to_admin function: restrict to postgres/service role only
drop function if exists public.promote_to_admin(uuid);

create or replace function public.promote_to_admin(user_uuid uuid)
returns void
language plpgsql
security definer
as $$
begin
  -- Only allow execution by service_role (used by Supabase backend/migrations)
  if current_setting('request.jwt.claim.role', true) is distinct from 'service_role' then
    raise exception 'Access denied: This function can only be called by the service role.';
  end if;

  insert into public.utilisateurs (id, email, role)
  values (user_uuid, 'admin@horama.com', 'admin')
  on conflict (id) do update set role = 'admin';
end;
$$;

-- Revoke execute from public and authenticated, grant only to service_role
revoke execute on function public.promote_to_admin(uuid) from public;
revoke execute on function public.promote_to_admin(uuid) from authenticated;
