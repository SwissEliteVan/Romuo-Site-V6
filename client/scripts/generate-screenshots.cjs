#!/usr/bin/env node

/**
 * Script de génération de screenshots placeholder pour PWA
 * Crée des images de démonstration pour le manifest
 *
 * Usage: node scripts/generate-screenshots.cjs
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SCREENSHOTS_DIR = path.join(PUBLIC_DIR, 'screenshots');

// Créer le dossier screenshots s'il n'existe pas
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

console.log('📸 ROMUO VTC - Générateur de screenshots PWA\n');

async function generateScreenshots() {
  // Screenshot mobile (narrow)
  const mobileWidth = 390;
  const mobileHeight = 844;

  const mobileSvg = Buffer.from(`
    <svg width="${mobileWidth}" height="${mobileHeight}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${mobileWidth}" height="${mobileHeight}" fill="#0a0a0a"/>

      <!-- Gradient overlay -->
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#d4af37;stop-opacity:0.1"/>
          <stop offset="100%" style="stop-color:#d4af37;stop-opacity:0"/>
        </linearGradient>
      </defs>
      <rect width="${mobileWidth}" height="${mobileHeight}" fill="url(#goldGradient)"/>

      <!-- Title -->
      <text x="${mobileWidth/2}" y="200" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#ffffff" text-anchor="middle">
        ROMUO VTC
      </text>

      <!-- Subtitle -->
      <text x="${mobileWidth/2}" y="250" font-family="Arial, sans-serif" font-size="24" fill="#d4af37" text-anchor="middle">
        Transport Premium
      </text>

      <!-- Features -->
      <text x="${mobileWidth/2}" y="350" font-family="Arial, sans-serif" font-size="18" fill="#cccccc" text-anchor="middle">
        ✈️ Transferts Aéroport
      </text>
      <text x="${mobileWidth/2}" y="400" font-family="Arial, sans-serif" font-size="18" fill="#cccccc" text-anchor="middle">
        💼 Déplacements Business
      </text>
      <text x="${mobileWidth/2}" y="450" font-family="Arial, sans-serif" font-size="18" fill="#cccccc" text-anchor="middle">
        🚗 Véhicules Premium
      </text>

      <!-- CTA -->
      <rect x="45" y="550" width="300" height="60" rx="8" fill="#d4af37"/>
      <text x="${mobileWidth/2}" y="590" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#0a0a0a" text-anchor="middle">
        Réserver Maintenant
      </text>

      <!-- Footer -->
      <text x="${mobileWidth/2}" y="${mobileHeight - 50}" font-family="Arial, sans-serif" font-size="14" fill="#666666" text-anchor="middle">
        24/7 • Service Premium • Suisse
      </text>
    </svg>
  `);

  await sharp(mobileSvg)
    .png()
    .toFile(path.join(SCREENSHOTS_DIR, 'home-mobile.png'));

  console.log('✅ home-mobile.png (390x844)');

  // Screenshot desktop (wide)
  const desktopWidth = 1920;
  const desktopHeight = 1080;

  const desktopSvg = Buffer.from(`
    <svg width="${desktopWidth}" height="${desktopHeight}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${desktopWidth}" height="${desktopHeight}" fill="#0a0a0a"/>

      <!-- Gradient overlay -->
      <defs>
        <linearGradient id="goldGradientDesktop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#d4af37;stop-opacity:0.1"/>
          <stop offset="100%" style="stop-color:#d4af37;stop-opacity:0"/>
        </linearGradient>
      </defs>
      <rect width="${desktopWidth}" height="${desktopHeight}" fill="url(#goldGradientDesktop)"/>

      <!-- Main Title -->
      <text x="${desktopWidth/2}" y="350" font-family="Arial, sans-serif" font-size="96" font-weight="bold" fill="#ffffff" text-anchor="middle">
        ROMUO VTC
      </text>

      <!-- Subtitle -->
      <text x="${desktopWidth/2}" y="450" font-family="Arial, sans-serif" font-size="48" fill="#d4af37" text-anchor="middle">
        Transport Premium Suisse
      </text>

      <!-- Description -->
      <text x="${desktopWidth/2}" y="550" font-family="Arial, sans-serif" font-size="28" fill="#cccccc" text-anchor="middle">
        Voyagez avec élégance et sérénité
      </text>

      <!-- Features Row -->
      <text x="560" y="700" font-family="Arial, sans-serif" font-size="24" fill="#cccccc" text-anchor="middle">
        ⚡ Réservation
      </text>
      <text x="560" y="730" font-family="Arial, sans-serif" font-size="24" fill="#cccccc" text-anchor="middle">
        Instantanée
      </text>

      <text x="${desktopWidth/2}" y="700" font-family="Arial, sans-serif" font-size="24" fill="#cccccc" text-anchor="middle">
        🛡️ Sécurité
      </text>
      <text x="${desktopWidth/2}" y="730" font-family="Arial, sans-serif" font-size="24" fill="#cccccc" text-anchor="middle">
        Maximale
      </text>

      <text x="1360" y="700" font-family="Arial, sans-serif" font-size="24" fill="#cccccc" text-anchor="middle">
        💎 Véhicules
      </text>
      <text x="1360" y="730" font-family="Arial, sans-serif" font-size="24" fill="#cccccc" text-anchor="middle">
        Premium
      </text>

      <!-- CTA -->
      <rect x="810" y="820" width="300" height="80" rx="12" fill="#d4af37"/>
      <text x="${desktopWidth/2}" y="875" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#0a0a0a" text-anchor="middle">
        Réserver
      </text>

      <!-- Footer -->
      <text x="${desktopWidth/2}" y="${desktopHeight - 50}" font-family="Arial, sans-serif" font-size="20" fill="#666666" text-anchor="middle">
        Disponible 24/7 • Service Premium • Genève • Lausanne • Zurich
      </text>
    </svg>
  `);

  await sharp(desktopSvg)
    .png()
    .toFile(path.join(SCREENSHOTS_DIR, 'home-desktop.png'));

  console.log('✅ home-desktop.png (1920x1080)');

  console.log('\n🎉 Screenshots générés avec succès !');
  console.log(`📁 Emplacement: ${SCREENSHOTS_DIR}`);
  console.log('\n💡 Ces screenshots sont des placeholders. Remplacez-les par de vraies captures d\'écran de votre app.');
}

generateScreenshots().catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
