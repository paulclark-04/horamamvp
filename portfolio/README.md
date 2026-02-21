---
title: "Horama - Site Vitrine et CRM pour startup IA/Vision par Ordinateur"
description: "Application web complete combinant un site vitrine anime et un panneau d'administration CRM, developpee en une semaine lors d'un hackathon avec Next.js 16 et Supabase."
tags: ["Next.js", "React", "Supabase", "CRM", "Web App", "Hackathon"]
date: "2025-12"
duration: "1 semaine"
role: "Developpeur Full-Stack"
youtube: "https://youtu.be/B4QjNPAM9OY"
---

## Description

Horama est une application web complete developpee dans le cadre d'un hackathon pour une startup specialisee en intelligence artificielle et vision par ordinateur. Le projet repond a un double besoin : presenter l'offre de services de l'entreprise via un site vitrine professionnel et fournir un outil interne de gestion de la relation client (CRM).

Le site vitrine met en avant les 6 services principaux de l'entreprise (detection d'objets, inspection qualite, OCR, Edge AI, MLOps, securite) avec des animations fluides et un design moderne. Le formulaire de contact multi-etapes permet de capturer des leads qualifies directement dans le CRM.

Le panneau d'administration offre une vue complete sur les leads, contacts, interactions, candidatures et documents, avec un tableau de bord affichant des KPIs en temps reel. L'ensemble a ete concu et developpe en une semaine, demontrant la capacite a livrer un MVP fonctionnel dans un delai contraint.

## Fonctionnalites principales

- Site vitrine avec 10+ pages animees (hero, services, expertise, cas d'usage, actualites, conferences, recrutement)
- Formulaire de contact multi-etapes (4 etapes) avec validation Zod cote client et serveur
- Panneau d'administration protege avec authentification Supabase (email/mot de passe)
- Tableau de bord KPI avec statistiques en temps reel (leads, interactions, statuts)
- Gestion des leads avec filtrage, qualification et suivi des interactions
- Upload de CV et gestion des candidatures avec stockage securise (Supabase Storage)
- Gestion de documents internes avec URLs signees pour le telechargement
- Mode sombre/clair avec persistance du theme
- Animations avancees (gradient anime, compteurs, transitions de pages, carrousel de logos)
- Rate limiting sur les API publiques (protection anti-spam)

## Stack technique

| Categorie | Technologies |
|-----------|--------------|
| Frontend | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4 |
| Animations | Framer Motion 12 |
| Backend | Next.js API Routes, Supabase (PostgreSQL, Auth, Storage) |
| Validation | Zod 4 |
| Securite | Row-Level Security (RLS), Rate Limiting, Signed URLs |
| Outils | ESLint 9, Babel React Compiler |

## Architecture

```
Client (Navigateur)
    |
    +-- Site Vitrine (Server Components + Client Components)
    |       |
    |       +-- Pages statiques (SSR)
    |       +-- Formulaire contact (Client) --> API /leads
    |       +-- Upload CV (Client) -----------> API /candidatures
    |
    +-- Admin Panel (Protected Routes)
            |
            +-- requireAdmin() middleware
            +-- Dashboard, Leads, Contacts, Documents
            +-- API /admin/* (Service Role)
            |
            v
      Supabase Backend
        +-- PostgreSQL (RLS)
        +-- Auth (email/password)
        +-- Storage (documents, CVs)
```

Le projet utilise le App Router de Next.js 16 avec une separation claire entre les routes publiques (`site_vitrine/`) et protegees (`admin/(protected)/`). Les Server Components gerent le data fetching tandis que les Client Components ("use client") gerent l'interactivite et les animations.

## Defis et apprentissages

- Mise en place d'une authentification robuste avec Supabase Auth et des politiques RLS granulaires pour isoler les donnees entre roles admin et utilisateurs publics
- Integration du upload de fichiers (CV en PDF/DOCX) avec validation cote serveur, stockage dans Supabase Storage et generation d'URLs signees pour le telechargement securise
- Conception d'un formulaire multi-etapes avec conservation de l'etat entre les etapes, validation progressive et animations de transition fluides via Framer Motion
- Livraison d'un MVP complet (site vitrine + CRM) en une semaine, necessitant une priorisation stricte des fonctionnalites et une architecture modulaire pour iterer rapidement
