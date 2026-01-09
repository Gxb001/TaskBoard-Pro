#!/bin/bash

echo "TaskBoard Pro - Demarrage..."

if ! command -v node &> /dev/null; then
    echo "Erreur: Node.js n'est pas installe."
    echo "Telechargez-le sur https://nodejs.org"
    exit 1
fi

echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

if [ ! -d "node_modules" ]; then
    echo "Installation des dependances..."
    npm install
fi

echo "Lancement du serveur..."
npm start

