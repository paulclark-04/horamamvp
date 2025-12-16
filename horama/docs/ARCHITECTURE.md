# Horama MVP Architecture

## Stack
- **Framework**: Next.js 16.0.10 (App Router, React 19)
- **Database**: Supabase (PostgreSQL + Auth + Realtime)
- **Styling**: Tailwind CSS v4
- **Validation**: Zod

## Directory Structure
```
src/
├── app/           # Next.js App Router pages and layouts
├── components/    # Reusable UI components
├── contracts/     # Zod schemas (shared types)
└── lib/           # Utilities and clients
    ├── auth/      # Auth guards (requireSession, requireAdmin)
    └── supabase/  # Supabase clients (client.ts, server.ts)
```

## Auth Model
- **Admin routes**: Protected server-side via `requireSession()` in layout
- **API routes**: Must call guard utilities to verify access
- **Fail-closed**: Deny access by default until auth check passes

## Conventions
- **Barrel exports**: Each folder exposes `index.ts` for clean imports.
- **Contracts**: Zod schemas define API boundaries; types derived via `z.infer`.
- **Supabase**: `lib/supabase/client.ts` (browser), `lib/supabase/server.ts` (SSR).
- **Env**: Access via `envPublic` (client) or `envServer` (server-only).
