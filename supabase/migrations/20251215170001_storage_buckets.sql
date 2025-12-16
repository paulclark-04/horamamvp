-- -----------------------------------------------------------------------------
-- STORAGE BUCKETS
-- -----------------------------------------------------------------------------

-- Create buckets if they don't exist
insert into storage.buckets (id, name, public)
values ('documents-private', 'documents-private', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('media-public', 'media-public', true)
on conflict (id) do nothing;

-- -----------------------------------------------------------------------------
-- STORAGE POLICIES
-- -----------------------------------------------------------------------------
-- Note: Storage policies must be set on storage.objects

-- Bucket: media-public
-- Public Read
create policy "Public Access Media"
  on storage.objects for select
  using ( bucket_id = 'media-public' );

-- Admin Upload/Delete/Update
create policy "Admin Manage Media"
  on storage.objects for all
  using ( bucket_id = 'media-public' and public.is_admin() );

-- Bucket: documents-private
-- Admin Read/Write (Strictly private for now)
create policy "Admin Manage Documents"
  on storage.objects for all
  using ( bucket_id = 'documents-private' and public.is_admin() );
