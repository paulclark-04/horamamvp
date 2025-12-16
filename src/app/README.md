# Horama pages (React + Tailwind + React Router)

This bundle replicates the 5 pages from the provided PDFs (dark gradient background, glass cards, layout, spacing).

## Stack
- React 18 + TypeScript
- Tailwind CSS
- React Router

## Quick start (Vite)
```bash
npm create vite@latest horama-ui -- --template react-ts
cd horama-ui

npm i react-router-dom
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

1) Replace your `tailwind.config.*`, `src/index.css`, and `src/` files with the code snippets in this folder.
2) Add images under `public/assets/` (optional). If you don’t add them, the components fall back to gradients.

## Routes
- `/` Accueil
- `/verticales`
- `/cas-usage`
- `/actualites`
- `/contact`

> Notes:  
> - The design uses a reusable `SiteLayout` with the top navbar + footer, matching the PDFs.  
> - All “content” (cards text, FAQs, metrics) is wired from constants so you can edit quickly.
