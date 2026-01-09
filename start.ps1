Write-Host "TaskBoard Pro - Demarrage..." -ForegroundColor Cyan

# Vérification de l'installation de Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Erreur: Node.js n'est pas installe." -ForegroundColor Red
    Write-Host "Telechargez-le sur https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Vérification de l'installation de npm
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "Erreur: npm n'est pas installe." -ForegroundColor Red
    Write-Host "Telechargez-le sur https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Affichage des versions
Write-Host "Node.js version: $(node -v)" -ForegroundColor Green
Write-Host "npm version: $(npm -v)" -ForegroundColor Green

# Installation des dependances si necessaire
if (-not (Test-Path "node_modules")) {
    Write-Host "Installation des dependances..." -ForegroundColor Yellow
    npm install
}

# Lancement du serveur
Write-Host "Lancement du serveur..." -ForegroundColor Cyan
npm start
