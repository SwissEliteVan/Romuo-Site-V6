#!/bin/bash

# Script de déploiement automatisé pour ROMUO VTC
# Usage: ./scripts/deploy.sh [netlify|vercel|custom]

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PLATFORM=${1:-"netlify"}

echo -e "${YELLOW}🚀 Déploiement ROMUO VTC sur $PLATFORM${NC}"

# Vérifier que toutes les variables d'environnement sont configurées
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Fichier .env manquant${NC}"
    echo "Créez-le à partir de .env.example:"
    echo "  cp .env.example .env"
    exit 1
fi

# Vérifier la clé TomTom
if ! grep -q "VITE_TOMTOM_API_KEY=.*" .env || grep -q "VITE_TOMTOM_API_KEY=your_tomtom_api_key_here" .env; then
    echo -e "${YELLOW}⚠️  Clé TomTom API non configurée dans .env${NC}"
    read -p "Continuer quand même? (y/N): " confirm
    if [[ $confirm != [yY] ]]; then
        exit 1
    fi
fi

# Vérifier que les icônes PWA existent
if [ ! -d "public/icons" ] || [ -z "$(ls -A public/icons 2>/dev/null)" ]; then
    echo -e "${YELLOW}⚠️  Icônes PWA manquantes dans public/icons${NC}"
    echo "Générez-les avec: ./scripts/generate-icons.sh"
    read -p "Continuer quand même? (y/N): " confirm
    if [[ $confirm != [yY] ]]; then
        exit 1
    fi
fi

# Validation du code
echo -e "${GREEN}📋 Validation du code...${NC}"
npm run validate

# Build
echo -e "${GREEN}🏗️  Build...${NC}"
npm run build

# Tests post-build
echo -e "${GREEN}🧪 Vérification du build...${NC}"
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Dossier dist/ manquant après le build${NC}"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo -e "${RED}❌ index.html manquant dans dist/${NC}"
    exit 1
fi

# Déploiement selon la plateforme
case $PLATFORM in
    netlify)
        echo -e "${GREEN}🌐 Déploiement sur Netlify...${NC}"
        if ! command -v netlify &> /dev/null; then
            echo -e "${RED}❌ Netlify CLI non installé${NC}"
            echo "Installez-le avec: npm install -g netlify-cli"
            exit 1
        fi
        netlify deploy --prod --dir=dist
        ;;
    
    vercel)
        echo -e "${GREEN}🌐 Déploiement sur Vercel...${NC}"
        if ! command -v vercel &> /dev/null; then
            echo -e "${RED}❌ Vercel CLI non installé${NC}"
            echo "Installez-le avec: npm install -g vercel"
            exit 1
        fi
        vercel --prod
        ;;
    
    custom)
        echo -e "${GREEN}📦 Build terminé${NC}"
        echo "Le dossier dist/ contient les fichiers à déployer"
        echo "Uploadez le contenu de dist/ sur votre serveur"
        ;;
    
    *)
        echo -e "${RED}❌ Plateforme invalide: $PLATFORM${NC}"
        echo "Usage: ./scripts/deploy.sh [netlify|vercel|custom]"
        exit 1
        ;;
esac

echo -e "${GREEN}✅ Déploiement terminé!${NC}"
