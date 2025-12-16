# PR: RLS Hardening Finalization

## Summary
This PR finalizes and corrects the Row Level Security (RLS) policies for the Horama MVP database.

## What Was Fixed

### 1. Candidatures RLS (Critical)
- **Issue**: Used `FOR ALL` policy without proper `WITH CHECK`, allowing potential bypasses.
- **Fix**: Replaced with explicit `SELECT`, `UPDATE`, `DELETE`, `INSERT` policies for admin. Public INSERT now enforces `statut = 'new'` via policy.

### 2. Elements Media Visibility
- **Issue**: Policy allowed public access to all media metadata.
- **Fix**: Added `is_public` column (default `false`). Public `SELECT` restricted to `is_public = true`.

### 3. Categories Visibility
- **Issue**: All categories publicly visible.
- **Fix**: Added `is_public` column (default `true`). Public `SELECT` restricted to `is_public = true`.

### 4. promote_to_admin Function (Critical)
- **Issue**: Mixed JWT claims (`service_role`) with PostgreSQL roles, which don't exist in that context. Hardcoded email.
- **Fix**: Removed entirely. Admin seeding documented as manual SQL operation.

### 5. Offres Emploi Expiration
- **Issue**: Published offers visible indefinitely.
- **Fix**: Added `date_expiration` column. Public `SELECT` now requires `statut = 'published' AND (date_expiration IS NULL OR date_expiration > now())`.

## Why These Changes Were Necessary
- **Security**: `FOR ALL` policies are dangerous when combined with public INSERT permissions.
- **Correctness**: PostgreSQL does not have a `service_role` role; JWT claim checks don't work as intended.
- **MVP Safety**: Tighter defaults prevent accidental data exposure.

## Remaining MVP Assumptions
- No 2FA (Supabase Auth default)
- Single admin role (no RBAC)
- Storage bucket policies managed via Supabase dashboard
- Candidatures not linked to auth users (anonymous applications)

## Files Changed
- `supabase/migrations/20251215180800_harden_rls_final.sql` (new)
- `docs/RLS_DECISIONS.md` (updated)

## Verification
| Test | Expected | Status |
|------|----------|--------|
| Public can read published articles | ✅ | Verified |
| Public can read published non-expired offers | ✅ | Verified |
| Public can submit job application | ✅ | Verified |
| Public cannot set candidature statut | ✅ | Verified |
| Public cannot read CRM tables | ✅ | Verified |
| Admin can CRUD all tables | ✅ | Verified |
| No privilege escalation path | ✅ | Verified |
