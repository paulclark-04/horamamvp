# RLS Decisions & Security Model

## Overview
We enforce a strict security model using PostgreSQL Row Level Security (RLS) policies. All tables have RLS enabled, and access is denied by default.

## User Roles
Roles are defined in the `utilisateurs` table, linked to `auth.users`.
- **admin**: Full CRUD access to all resources.
- **user**: Standard authenticated user (limited access, self-management only).
- **anon/public**: Unauthenticated website visitors (minimal read access, job applications).

## Helper Functions
- `public.is_admin()`: Returns `true` if `auth.uid()` has role `'admin'` in `utilisateurs`. This is a `SECURITY DEFINER` function.

---

## Policies by Table

### 1. utilisateurs
| Role | SELECT | INSERT | UPDATE | DELETE |
|------|--------|--------|--------|--------|
| Admin | ✅ All | ✅ | ✅ | ✅ |
| User | ✅ Own profile only | ❌ | ❌ | ❌ |
| Public | ❌ | ❌ | ❌ | ❌ |

### 2. leads_contacts & interactions
| Role | SELECT | INSERT | UPDATE | DELETE |
|------|--------|--------|--------|--------|
| Admin | ✅ | ✅ | ✅ | ✅ |
| User/Public | ❌ | ❌ | ❌ | ❌ |

> [!NOTE]
> Internal CRM data. No public or user access.

### 3. offres_emploi (Job Offers)
| Role | SELECT | INSERT | UPDATE | DELETE |
|------|--------|--------|--------|--------|
| Admin | ✅ All | ✅ | ✅ | ✅ |
| Public | ✅ Published + Not Expired | ❌ | ❌ | ❌ |

**Visibility condition:**
```sql
statut = 'published' AND (date_expiration IS NULL OR date_expiration > now())
```

### 4. candidatures (Job Applications)
| Role | SELECT | INSERT | UPDATE | DELETE |
|------|--------|--------|--------|--------|
| Admin | ✅ | ✅ | ✅ | ✅ |
| Public | ❌ | ✅ (new only) | ❌ | ❌ |

> [!IMPORTANT]
> Public INSERT is restricted: `statut` must equal `'new'` (enforced by policy + DB default). This prevents public users from setting `statut` to other values like `'hired'`.

### 5. articles
| Role | SELECT | INSERT | UPDATE | DELETE |
|------|--------|--------|--------|--------|
| Admin | ✅ All | ✅ | ✅ | ✅ |
| Public | ✅ Published only | ❌ | ❌ | ❌ |

### 6. categories
| Role | SELECT | INSERT | UPDATE | DELETE |
|------|--------|--------|--------|--------|
| Admin | ✅ All | ✅ | ✅ | ✅ |
| Public | ✅ Where `is_public = true` | ❌ | ❌ | ❌ |

> [!NOTE]
> Column `is_public` (default `true`) controls visibility. Private categories can be used for internal tagging.

### 7. elements_media
| Role | SELECT | INSERT | UPDATE | DELETE |
|------|--------|--------|--------|--------|
| Admin | ✅ All | ✅ | ✅ | ✅ |
| Public | ✅ Where `is_public = true` | ❌ | ❌ | ❌ |

> [!NOTE]
> Column `is_public` (default `false`) controls visibility. New media is private by default.

---

## Storage Bucket Policies

### media-public
- **Public**: Read-only
- **Admin**: Full access

### documents-private
- **Public**: No access
- **Admin**: Full access

---

## Admin User Seeding

> [!CAUTION]
> The `promote_to_admin` function has been **removed** for security reasons. It incorrectly mixed JWT claims with PostgreSQL roles.

**To create an admin user:**
1. Create user via Supabase Auth (UI, API, or CLI)
2. Run as `postgres` superuser in SQL Editor:
```sql
INSERT INTO public.utilisateurs (id, email, role)
VALUES ('<user-uuid>', '<user-email>', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

---

## Security Verification Checklist

### Public Users Can:
- [x] Read published articles
- [x] Read published, non-expired job offers
- [x] Read public categories
- [x] Read public media metadata
- [x] Submit job applications (INSERT with `statut = 'new'`)

### Public Users Cannot:
- [x] Read CRM data (leads, interactions)
- [x] Read draft/archived content
- [x] Modify any existing data
- [x] Read private media or categories
- [x] Escalate privileges

### Admins Can:
- [x] Full CRUD on all tables
- [x] Manage candidatures (view, update status, delete)
- [x] Access all content regardless of status

---

## MVP Assumptions
1. No 2FA yet (Supabase Auth default)
2. Single admin role (no granular permissions)
3. No per-user application tracking (candidatures not linked to auth users)
4. Storage policies managed separately via Supabase dashboard or SQL
