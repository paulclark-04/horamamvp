# Horama MVP

Application web Next.js pour Horama - Site vitrine et panneau d'administration.

## Stack Technique

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS 4, Framer Motion
- **Backend**: Supabase (Auth, Database, Storage)
- **Langage**: TypeScript

## Prérequis

- Node.js >= 18.x (recommandé: 20.x ou supérieur)
- npm >= 9.x
- Compte Supabase (pour la base de données)

## Installation

### 1. Cloner le repository

```bash
git clone https://github.com/paulclark-04/horamamvp.git
cd horamamvp
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration des variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
```

> **Note**: Les clés Supabase sont disponibles dans le dashboard Supabase : Settings > API

### 4. Configuration de la base de données Supabase

Les migrations SQL se trouvent dans le dossier `supabase/migrations/`. Exécutez-les dans l'ordre dans votre console SQL Supabase :

1. `20251215170000_init_schema.sql` - Schéma initial
2. `20251215170001_storage_buckets.sql` - Buckets de stockage
3. `20251215170002_seed_data.sql` - Données de base
4. `20251215175500_harden_rls.sql` - Politiques RLS
5. `20251215180800_harden_rls_final.sql` - Politiques RLS finales
6. `20251217120000_seed_data.sql` - Données supplémentaires

## Lancement

### Mode développement

```bash
npm run dev
```

Ou utilisez le script de démarrage qui ouvre automatiquement les pages :

```bash
./start.sh
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Mode production

```bash
npm run build
npm run start
```

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm run start` | Lance le serveur de production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run typecheck` | Vérifie les types TypeScript |

## Structure du projet

```
horamamvp/
├── src/
│   ├── app/                    # Routes Next.js (App Router)
│   │   ├── admin/              # Panneau d'administration
│   │   │   ├── (protected)/    # Routes protégées (auth requise)
│   │   │   │   ├── dashboard/
│   │   │   │   ├── boite-de-reception/
│   │   │   │   ├── gestion-contacts/
│   │   │   │   ├── gestion-documents/
│   │   │   │   ├── qualification-leads/
│   │   │   │   ├── recrutement/
│   │   │   │   └── settings/
│   │   │   ├── login/
│   │   │   └── unauthorized/
│   │   ├── site_vitrine/       # Pages du site vitrine
│   │   │   ├── actualites/
│   │   │   ├── cas-usage/
│   │   │   ├── conferences/
│   │   │   ├── contact/
│   │   │   ├── expertise/
│   │   │   ├── legal/
│   │   │   ├── recrutement/
│   │   │   ├── services/
│   │   │   └── technologies/
│   │   └── page.tsx            # Page d'accueil
│   ├── components/             # Composants React réutilisables
│   ├── contexts/               # Contextes React
│   ├── contracts/              # Types et interfaces
│   └── lib/                    # Utilitaires et configuration
├── public/                     # Assets statiques
├── supabase/
│   └── migrations/             # Scripts SQL de migration
├── docs/                       # Documentation
└── .env.local                  # Variables d'environnement (à créer)
```

## Accès Administration

| Champ | Valeur |
|-------|--------|
| **URL** | http://localhost:3000/admin/login |
| **Email** | admin@horama.ai |
| **Mot de passe** | Admin123! |

> **Important**: Changez ces identifiants en production !

## Fonctionnalités

### Site Vitrine
- Page d'accueil
- Présentation des services et expertise
- Technologies utilisées
- Cas d'usage
- Actualités et conférences
- Page de contact
- Espace recrutement
- Mentions légales

### Panneau Administration
- Dashboard
- Boîte de réception
- Gestion des contacts
- Gestion des documents
- Qualification des leads
- Recrutement (gestion des CV)
- Paramètres

## Licence

Projet privé - Tous droits réservés.
