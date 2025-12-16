# Horama MVP — Developer Onboarding

This repo contains:
- `supabase/`: local Supabase config + SQL migrations
- `horama/`: Next.js App Router app (pnpm workspace)

## Prerequisites
- Node.js (recommended: 20+)
- pnpm
- Docker Desktop (running)
- Supabase CLI (`supabase`)

Quick checks:
```bash
node -v
pnpm -v
docker --version
supabase --version
```

## Quickstart (Local)
From a fresh machine:
```bash
# 1) Clone
git clone <REPO_URL> horamamvp
cd horamamvp

# 2) Install Next.js deps
pnpm -C horama install

# 3) Start Supabase (requires Docker Desktop)
supabase start

# 4) Copy local Supabase keys into horama/.env.local
supabase status

# 5) Run the app
pnpm -C horama dev
```

Then open the app:
- http://localhost:3000

## Environment Variables
Local environment file is `horama/.env.local`.

Template:
```env
# Supabase (from `supabase status`)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_LOCAL_ANON_KEY

# Server-only (NEVER expose client-side / NEVER commit)
SUPABASE_SERVICE_ROLE_KEY=YOUR_LOCAL_SERVICE_ROLE_KEY
```

Where to get values:
- Run `supabase status` (from repo root). It prints the API URL, anon key, and service role key for your local stack.

Security note:
- Never commit `SUPABASE_SERVICE_ROLE_KEY`. Treat it like a production secret.

## Create an Admin User
The admin CRM (`/admin/*`) is protected by RLS and requires a row in `public.utilisateurs` with `role='admin'`.

1) Create an Auth user in Supabase Studio:
- Open Studio (see `supabase status`, usually http://localhost:54323)
- Go to **Authentication → Users → Add user**
- Set an email + password (this is what you'll use on `/admin/login`)
- Copy the user UUID

2) Promote the user to admin (SQL Editor in Studio):
```sql
insert into public.utilisateurs (id, email, role)
values ('<auth_user_uuid>', '<auth_user_email>', 'admin')
on conflict (id) do update
set email = excluded.email,
    role = 'admin';
```

After this:
- Visit http://localhost:3000/admin/login
- Sign in with the email/password you created

## Useful URLs
- App: http://localhost:3000
- Admin login: http://localhost:3000/admin/login
- Supabase Studio: usually http://localhost:54323 (confirm via `supabase status`)
- Supabase API: usually http://localhost:54321 (confirm via `supabase status`)

## Common Issues
- **`supabase start` fails / Docker not running**
  - Ensure Docker Desktop is open and running, then retry `supabase start`.
- **Port conflicts**
  - Supabase defaults to ports `54321` (API), `54322` (DB), `54323` (Studio). Stop other services using those ports or run `supabase stop`.
  - Next.js defaults to `3000`. If it's taken, Next will prompt to use another port.
- **`curl` multiline fails on macOS/zsh**
  - Ensure each line ends with a backslash `\` and there are no trailing spaces after it.
  - If unsure, run the command as a single line.

## Project Structure
- `supabase/migrations/`: database schema + RLS policies (SQL)
- `horama/src/app/(marketing)/`: public marketing pages
- `horama/src/app/admin/(protected)/`: admin CRM pages (protected server-side)
- `horama/src/app/api/`: API routes (public + admin)
- `horama/src/components/admin/`: admin UI components
- `horama/src/lib/supabase/`: Supabase clients (`client.ts`, `server.ts`, `service.ts`)

## Development Workflow
- Run dev server: `pnpm -C horama dev`
- Lint: `pnpm -C horama lint`
- Typecheck: `pnpm -C horama typecheck`

### Database migrations
- Create a new migration (repo root):
  ```bash
  supabase migration new <name>
  ```
- Edit the generated SQL in `supabase/migrations/`.

### Reset local DB safely
This wipes your local DB and re-applies migrations:
```bash
supabase db reset
```
If you only want to stop services:
```bash
supabase stop
```
