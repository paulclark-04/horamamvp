-- -----------------------------------------------------------------------------
-- SEED DATA
-- -----------------------------------------------------------------------------

-- Categories
insert into public.categories (nom) values
('Technology'),
('Company News'),
('Industry Insights')
on conflict do nothing;

-- Sample Articles
insert into public.articles (titre, slug, contenu, statut, published_at, category_id)
select 
  'Welcome to Horama', 
  'welcome-to-horama', 
  'This is the first post on our new platform.', 
  'published', 
  now(), 
  id
from public.categories where nom = 'Company News'
limit 1;

-- Sample Job Offer
insert into public.offres_emploi (titre, description, statut) values
('Senior Developer', 'We are looking for a senior developer to join our team.', 'published'),
('Marketing Intern', 'Great opportunity for students.', 'draft');

-- NOTE: We cannot easily seed auth.users from SQL without knowing the internal ID or hashing requirement.
-- Instead, we will assume an admin user will be created via Auth UI/CLI and we manually insert their role here if we knew the ID.
-- For the sake of this seed, we will providing a helper to promote the first user to admin if they exist.

-- Function to self-promote (ONLY FOR DEV/MVP SEEDING, REMOVE IN PROD)
-- Usage: select promote_to_admin('user-uuid');
create or replace function public.promote_to_admin(user_uuid uuid)
returns void
language plpgsql
security definer
as $$
begin
  insert into public.utilisateurs (id, email, role)
  values (user_uuid, 'admin@horama.com', 'admin')
  on conflict (id) do update set role = 'admin';
end;
$$;
