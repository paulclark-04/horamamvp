#!/bin/bash

# Démarrage de l'application Horama
echo "🚀 Démarrage de l'application Horama..."

# Attendre que le serveur soit prêt puis ouvrir les pages
(
  # Attendre que le serveur soit disponible
  while ! curl -s http://localhost:3000 > /dev/null 2>&1; do
    sleep 1
  done

  echo "✅ Serveur prêt ! Ouverture des pages..."

  # Ouvrir la page admin
  open "http://localhost:3000/admin/login"
  
  # Ouvrir le site vitrine
  open "http://localhost:3000"
) &

# Lancer le serveur de développement
npm run dev
