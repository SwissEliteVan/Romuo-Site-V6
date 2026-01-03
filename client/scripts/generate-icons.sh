#!/bin/bash

# Script pour générer les icônes PWA
# Nécessite ImageMagick: brew install imagemagick (macOS) ou apt-get install imagemagick (Ubuntu)

set -e

# Couleurs pour l'output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🎨 Génération des icônes PWA pour ROMUO VTC${NC}"

# Vérifier qu'ImageMagick est installé
if ! command -v convert &> /dev/null; then
    echo -e "${RED}❌ ImageMagick n'est pas installé${NC}"
    echo "Installez-le avec:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    echo "  Windows: https://imagemagick.org/script/download.php"
    exit 1
fi

# Demander le chemin du logo source
read -p "Chemin vers le logo source (PNG, 512x512 minimum): " LOGO_PATH

if [ ! -f "$LOGO_PATH" ]; then
    echo -e "${RED}❌ Fichier non trouvé: $LOGO_PATH${NC}"
    exit 1
fi

# Créer le dossier icons s'il n'existe pas
ICONS_DIR="public/icons"
mkdir -p "$ICONS_DIR"

# Tailles à générer
SIZES=(72 96 128 144 152 192 384 512)

echo -e "${GREEN}✓ Génération des icônes...${NC}"

# Générer chaque taille
for size in "${SIZES[@]}"; do
    OUTPUT="${ICONS_DIR}/icon-${size}x${size}.png"
    convert "$LOGO_PATH" -resize ${size}x${size} "$OUTPUT"
    echo -e "  ✓ Généré: icon-${size}x${size}.png"
done

echo -e "${GREEN}✓ Toutes les icônes ont été générées avec succès!${NC}"
echo -e "${YELLOW}📁 Emplacement: $ICONS_DIR${NC}"
echo ""
echo -e "${GREEN}Prochaines étapes:${NC}"
echo "  1. Vérifiez les icônes générées dans $ICONS_DIR"
echo "  2. Testez l'installation PWA avec: npm run build && npm run preview"
echo "  3. Ouvrez Chrome DevTools > Application > Manifest pour vérifier"
