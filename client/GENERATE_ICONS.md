# Génération des icônes PWA

Pour générer les icônes PWA, vous avez plusieurs options :

## Option 1 : Utiliser un service en ligne (Recommandé)

### PWA Asset Generator
1. Visitez : https://www.pwabuilder.com/imageGenerator
2. Uploadez votre logo (idéalement 512x512px minimum, format PNG avec transparence)
3. Téléchargez le package généré
4. Copiez les icônes dans `public/icons/`

### RealFaviconGenerator
1. Visitez : https://realfavicongenerator.net/
2. Uploadez votre logo
3. Configurez les options pour iOS, Android, etc.
4. Téléchargez le package
5. Copiez les icônes dans `public/icons/`

## Option 2 : Utiliser ImageMagick (CLI)

Si vous avez ImageMagick installé, vous pouvez générer les icônes automatiquement :

```bash
# Installer ImageMagick (si nécessaire)
# macOS : brew install imagemagick
# Ubuntu : sudo apt-get install imagemagick
# Windows : https://imagemagick.org/script/download.php

# Créer le dossier
mkdir -p public/icons

# Générer les icônes à partir d'un logo source (logo.png)
# Remplacez "logo.png" par le chemin vers votre logo
convert logo.png -resize 72x72 public/icons/icon-72x72.png
convert logo.png -resize 96x96 public/icons/icon-96x96.png
convert logo.png -resize 128x128 public/icons/icon-128x128.png
convert logo.png -resize 144x144 public/icons/icon-144x144.png
convert logo.png -resize 152x152 public/icons/icon-152x152.png
convert logo.png -resize 192x192 public/icons/icon-192x192.png
convert logo.png -resize 384x384 public/icons/icon-384x384.png
convert logo.png -resize 512x512 public/icons/icon-512x512.png
```

## Option 3 : Utiliser npm package

```bash
# Installer pwa-asset-generator
npm install -g pwa-asset-generator

# Générer les icônes
pwa-asset-generator logo.png public/icons --icon-only --manifest manifest.json
```

## Icônes requises

Les tailles suivantes sont nécessaires (déjà configurées dans manifest.json) :
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

## Design recommandé

Pour le logo ROMUO VTC :
- **Couleur de fond** : Noir profond (#0a0a0a)
- **Élément principal** : Lettre "R" en or suisse (#d4af37)
- **Style** : Swiss Modernism, minimaliste, géométrique
- **Format** : PNG avec transparence ou fond noir
- **Padding** : 10-15% autour du logo pour breathing room

## Vérification

Après génération, vérifiez que les icônes sont bien présentes :
```bash
ls -lh public/icons/
```

Vous devriez voir 8 fichiers PNG.

## Test PWA

Pour tester l'installation PWA en local :
1. Build le projet : `npm run build`
2. Servir en local : `npm run preview`
3. Ouvrir Chrome DevTools > Application > Manifest
4. Vérifier que les icônes apparaissent correctement
