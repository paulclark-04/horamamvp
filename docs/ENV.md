# Environment Variables

## `.env.local` Template

```bash
# Public (safe for client-side)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Server-only (NEVER expose to client)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret  # Optional, for future use
```

## Usage Rules

> [!CAUTION]
> **Never import `envServer` in client components.**  
> Server-only variables (`SUPABASE_SERVICE_ROLE_KEY`) will leak to the browser.

> [!IMPORTANT]
> **All API routes must access env through `envServer` to fail-fast.**  
> This ensures missing variables are caught at startup, not runtime.

## Exports

| Export | Usage | Variables |
|--------|-------|-----------|
| `envPublic` | Client Components, Browser | `NEXT_PUBLIC_*` |
| `envServer` | Server Components, API Routes, Actions | All variables |
