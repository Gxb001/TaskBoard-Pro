@echo off
title TaskBoard Pro
echo TaskBoard Pro - Demarrage...

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Erreur: Node.js n'est pas installe.
    echo Telechargez-le sur https://nodejs.org
    pause
    exit /b 1
)

echo Node.js installe: OK

if not exist "node_modules" (
    echo Installation des dependances...
    call npm install
)

echo Lancement du serveur...
call npm start

