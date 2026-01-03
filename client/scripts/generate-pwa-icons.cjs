#!/usr/bin/env node

/**
 * Script de génération des icônes PWA
 * Génère toutes les tailles d'icônes à partir du logo source
 *
 * Usage: node scripts/generate-pwa-icons.js
 */

const fs = require('fs');
const path = require('path');

// Configuration des icônes
const ICON_SIZES = [
  { size: 72, name: 'icon-72x72.png' },
  { size: 96, name: 'icon-96x96.png' },
  { size: 128, name: 'icon-128x128.png' },
  { size: 144, name: 'icon-144x144.png' },
  { size: 152, name: 'icon-152x152.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 384, name: 'icon-384x384.png' },
  { size: 512, name: 'icon-512x512.png' },
];

const MASKABLE_SIZES = [
  { size: 192, name: 'icon-maskable-192x192.png' },
  { size: 512, name: 'icon-maskable-512x512.png' },
];

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ICONS_DIR = path.join(PUBLIC_DIR, 'icons');
const LOGO_SOURCE = path.join(PUBLIC_DIR, 'logo.svg');

// Créer le dossier icons s'il n'existe pas
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

console.log('🎨 ROMUO VTC - Générateur d\'icônes PWA\n');

// Vérifier si sharp est disponible
try {
  const sharp = require('sharp');

  console.log('✅ Sharp trouvé, génération des icônes...\n');

  async function generateIcons() {
    // Lire le SVG source
    const svgBuffer = fs.readFileSync(LOGO_SOURCE);

    // Générer les icônes standard
    for (const { size, name } of ICON_SIZES) {
      const outputPath = path.join(ICONS_DIR, name);

      await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 10, g: 10, b: 10, alpha: 1 } // #0a0a0a
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ ${name} (${size}x${size})`);
    }

    // Générer les icônes maskables (avec plus de padding)
    for (const { size, name } of MASKABLE_SIZES) {
      const outputPath = path.join(ICONS_DIR, name);
      const padding = Math.floor(size * 0.2); // 20% padding

      await sharp(svgBuffer)
        .resize(size - padding * 2, size - padding * 2, {
          fit: 'contain',
          background: { r: 10, g: 10, b: 10, alpha: 1 }
        })
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: { r: 10, g: 10, b: 10, alpha: 1 }
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ ${name} (${size}x${size}) - maskable`);
    }

    console.log('\n🎉 Toutes les icônes ont été générées avec succès !');
    console.log(`📁 Emplacement: ${ICONS_DIR}`);
  }

  generateIcons().catch(err => {
    console.error('❌ Erreur lors de la génération:', err);
    process.exit(1);
  });

} catch (err) {
  console.log('⚠️  Sharp n\'est pas installé.');
  console.log('\n📦 Installation de sharp...\n');

  const { execSync } = require('child_process');

  try {
    execSync('npm install --save-dev sharp', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('\n✅ Sharp installé ! Relancez le script: npm run generate:icons\n');
  } catch (installErr) {
    console.error('\n❌ Erreur lors de l\'installation de sharp.');
    console.log('\n📚 Installation manuelle:');
    console.log('   npm install --save-dev sharp');
    console.log('   npm run generate:icons');
    console.log('\n💡 Alternative: Utilisez le script Bash avec ImageMagick:');
    console.log('   ./scripts/generate-icons.sh');
    process.exit(1);
  }
}
