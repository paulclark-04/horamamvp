#!/bin/bash

# Démarrage de l'application Horama
echo "🚀 Démarrage de l'application Horama..."

# Fonction pour trouver un port disponible à partir d'un port de départ
find_available_port() {
  local port=$1
  while lsof -i :"$port" > /dev/null 2>&1; do
    echo "⚠️  Port $port déjà utilisé, essai du port $((port + 1))..." >&2
    port=$((port + 1))
  done
  echo "$port"
}

# Trouver un port disponible à partir de 3000
PORT=$(find_available_port 3000)
echo "📡 Port disponible trouvé : $PORT"

# Attendre que le serveur soit prêt puis ouvrir les pages
(
  # Attendre que le serveur soit disponible
  while ! curl -s "http://localhost:$PORT" > /dev/null 2>&1; do
    sleep 1
  done

  echo "✅ Serveur prêt ! Ouverture des pages..."

  # Ouvrir la page admin
  open "http://localhost:$PORT/admin/login"

  # Ouvrir le site vitrine
  open "http://localhost:$PORT"
) &

# Lancer le serveur de développement sur le port trouvé
npm run dev -- -p "$PORT"
