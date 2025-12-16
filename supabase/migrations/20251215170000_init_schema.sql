-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. UTILS (Triggers, Functions)
-- -----------------------------------------------------------------------------

-- Function to handle updated_at timestamps
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- 2. TABLES
-- -----------------------------------------------------------------------------

-- Table: utilisateurs (Extends auth.users)
create table if not exists public.utilisateurs (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null check (role in ('admin', 'user')) default 'user',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: leads_contacts
create table if not exists public.leads_contacts (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('lead', 'contact')),
  nom text,
  prenom text,
  email text,
  telephone text,
  societe text,
  statut text, -- e.g., 'new', 'contacted', 'qualified', 'lost'
  user_id uuid references public.utilisateurs(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: interactions
create table if not exists public.interactions (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('call', 'email', 'meeting', 'other')),
  notes text,
  date timestamptz default now(),
  lead_id uuid references public.leads_contacts(id) on delete cascade,
  user_id uuid references public.utilisateurs(id) on delete set null,
  created_at timestamptz default now()
);

-- Table: offres_emploi
create table if not exists public.offres_emploi (
  id uuid primary key default uuid_generate_v4(),
  titre text not null,
  description text,
  statut text not null check (statut in ('draft', 'published', 'archived')) default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: candidatures
create table if not exists public.candidatures (
  id uuid primary key default uuid_generate_v4(),
  nom text not null,
  prenom text not null,
  email text not null,
  cv_url text,
  offre_id uuid references public.offres_emploi(id) on delete set null,
  statut text not null check (statut in ('new', 'reviewing', 'rejected', 'hired')) default 'new',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: categories (For Articles/Blog)
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  nom text not null unique,
  created_at timestamptz default now()
);

-- Table: articles
create table if not exists public.articles (
  id uuid primary key default uuid_generate_v4(),
  titre text not null,
  slug text not null unique,
  contenu text,
  image_url text,
  statut text not null check (statut in ('draft', 'published')) default 'draft',
  published_at timestamptz,
  category_id uuid references public.categories(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: elements_media
create table if not exists public.elements_media (
  id uuid primary key default uuid_generate_v4(),
  nom text not null,
  url text not null,
  type text, -- mime type
  bucket text not null,
  created_at timestamptz default now()
);

-- -----------------------------------------------------------------------------
-- 3. TRIGGERS (Auto-update updated_at)
-- -----------------------------------------------------------------------------

create trigger handle_utilisateurs_updated_at before update on public.utilisateurs
  for each row execute procedure public.handle_updated_at();

create trigger handle_leads_contacts_updated_at before update on public.leads_contacts
  for each row execute procedure public.handle_updated_at();

create trigger handle_offres_emploi_updated_at before update on public.offres_emploi
  for each row execute procedure public.handle_updated_at();

create trigger handle_candidatures_updated_at before update on public.candidatures
  for each row execute procedure public.handle_updated_at();

create trigger handle_articles_updated_at before update on public.articles
  for each row execute procedure public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 4. RLS POLICIES
-- -----------------------------------------------------------------------------

-- Helper function to check if current user is admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
as $$
  select exists (
    select 1 from public.utilisateurs
    where id = auth.uid()
    and role = 'admin'
  );
$$;

-- Enable RLS on all tables
alter table public.utilisateurs enable row level security;
alter table public.leads_contacts enable row level security;
alter table public.interactions enable row level security;
alter table public.offres_emploi enable row level security;
alter table public.candidatures enable row level security;
alter table public.categories enable row level security;
alter table public.articles enable row level security;
alter table public.elements_media enable row level security;

-- TABLE: utilisateurs
-- Admin can view all, update all
create policy "Admins can do everything on utilisateurs"
  on public.utilisateurs
  for all
  using (public.is_admin());

-- Users can view their own profile
create policy "Users can view own profile"
  on public.utilisateurs
  for select
  using (auth.uid() = id);

-- TABLE: leads_contacts (Admin Only)
create policy "Admins only leads_contacts"
  on public.leads_contacts
  for all
  using (public.is_admin());

-- TABLE: interactions (Admin Only)
create policy "Admins only interactions"
  on public.interactions
  for all
  using (public.is_admin());

-- TABLE: offres_emploi
-- Public can view published offers
create policy "Public view published offers"
  on public.offres_emploi
  for select
  using (statut = 'published');

-- Admins full access
create policy "Admins manage offers"
  on public.offres_emploi
  for all
  using (public.is_admin());

-- TABLE: candidatures
-- Public can insert (apply)
create policy "Public can apply"
  on public.candidatures
  for insert
  with check (true);

-- Admins full access
create policy "Admins view candidatures"
  on public.candidatures
  for all
  using (public.is_admin());

-- Users can view their own candidatures (if we link them in future, currently no user_id on candidatures, keeping it simple)

-- TABLE: articles
-- Public can view published articles
create policy "Public view published articles"
  on public.articles
  for select
  using (statut = 'published');

-- Admins full access
create policy "Admins manage articles"
  on public.articles
  for all
  using (public.is_admin());

-- TABLE: categories
-- Public can view all
create policy "Public view categories"
  on public.categories
  for select
  using (true);

-- Admins manage categories
create policy "Admins manage categories"
  on public.categories
  for all
  using (public.is_admin());

-- TABLE: elements_media
-- Public can view media (assuming these are public assets)
create policy "Public view media"
  on public.elements_media
  for select
  using (true);

-- Admins manage media
create policy "Admins manage media"
  on public.elements_media
  for all
  using (public.is_admin());
