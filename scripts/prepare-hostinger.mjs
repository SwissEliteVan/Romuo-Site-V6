#!/usr/bin/env node

/**
 * Script de préparation pour déploiement Hostinger
 * Crée un dossier "hostinger/public_html" prêt à uploader
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('📦 Préparation du package Hostinger...\n');

// Étape 1 : Vérifier que le build existe
const distPublicPath = path.join(rootDir, 'dist', 'public');
const distServerPath = path.join(rootDir, 'dist', 'server');

if (!fs.existsSync(distPublicPath) || !fs.existsSync(distServerPath)) {
  console.error('❌ ERREUR : Le build n\'existe pas.');
  console.error('   Exécutez d\'abord : npm run build\n');
  process.exit(1);
}

console.log('✅ Build détecté');

// Étape 2 : Créer le dossier de destination
const hostingerDir = path.join(rootDir, 'hostinger');
const publicHtmlDir = path.join(hostingerDir, 'public_html');

if (fs.existsSync(hostingerDir)) {
  console.log('🗑️  Suppression de l\'ancien package...');
  fs.rmSync(hostingerDir, { recursive: true, force: true });
}

fs.mkdirSync(publicHtmlDir, { recursive: true });
console.log('📁 Dossier public_html créé');

// Étape 3 : Copier dist/ entier
console.log('📋 Copie du build...');
copyDirectory(path.join(rootDir, 'dist'), path.join(publicHtmlDir, 'dist'));
console.log('✅ Build copié');

// Étape 4 : Créer le package.json runtime (SANS devDependencies)
console.log('📝 Création du package.json runtime...');
const runtimePackageJson = {
  name: 'romuo-vtc-production',
  version: '1.0.0',
  type: 'module',
  scripts: {
    start: 'node server.js',
  },
  dependencies: {
    express: '^4.21.2',
  },
};

fs.writeFileSync(
  path.join(publicHtmlDir, 'package.json'),
  JSON.stringify(runtimePackageJson, null, 2)
);
console.log('✅ package.json runtime créé');

// Étape 5 : Copier server.js
console.log('📋 Copie de server.js...');
fs.copyFileSync(
  path.join(rootDir, 'server.js'),
  path.join(publicHtmlDir, 'server.js')
);
console.log('✅ server.js copié');

// Étape 6 : Créer README_HOSTINGER.txt
console.log('📝 Création du README...');
const readmeContent = `
========================================
ROMUO VTC - Package Hostinger
========================================

Ce dossier contient tout le nécessaire pour déployer sur Hostinger.

CONTENU :
---------
- package.json : Dépendances runtime (uniquement Express)
- server.js : Point d'entrée Node.js
- dist/
  ├── public/ : Site React buildé (HTML, CSS, JS, assets)
  └── server/ : Serveur Express compilé

INSTRUCTIONS DE DÉPLOIEMENT :
------------------------------

1. UPLOAD VIA FTP/SFTP OU GESTIONNAIRE DE FICHIERS :
   - Connectez-vous à Hostinger (hPanel)
   - Accédez au gestionnaire de fichiers
   - Allez dans "public_html" (ou le dossier de votre domaine)
   - Uploadez TOUT le contenu de ce dossier "public_html" :
     ✓ package.json
     ✓ server.js
     ✓ dist/ (avec public/ et server/ à l'intérieur)

2. CONFIGURATION NODE.JS (hPanel) :
   - Allez dans : Site Web → Node.js
   - Application root : public_html
   - Application startup file : server.js
   - Node.js version : 18+ ou 20 LTS

3. INSTALLER LES DÉPENDANCES :
   - Cliquez sur "NPM Install"
   - Attendez la fin de l'installation

4. DÉMARRER L'APPLICATION :
   - Cliquez sur "Restart"
   - L'application sera accessible via votre domaine

5. VÉRIFICATIONS :
   - Visitez votre domaine : le site doit s'afficher
   - Visitez /health : doit retourner {"status":"ok",...}
   - Pas de 404 sur les assets (vérifier console F12)

DÉPANNAGE :
-----------

❌ Page blanche ?
   → Vérifiez que dist/public/index.html existe dans public_html

❌ Erreur de port ?
   → Le serveur écoute sur process.env.PORT (automatique Hostinger)

❌ NPM Install échoue ?
   → Vérifiez que package.json est bien le runtime (pas celui du dev)

❌ Routes SPA 404 ?
   → Normalement géré. Vérifiez que Node.js est bien actif (pas Apache)

CONTACT SUPPORT :
-----------------
Téléphone : 076 084 20 89
Email : contact@romuo-vtc.ch

Bonne mise en ligne ! 🚀
`;

fs.writeFileSync(
  path.join(publicHtmlDir, 'README_HOSTINGER.txt'),
  readmeContent.trim()
);
console.log('✅ README créé');

// Étape 7 : Créer .env.example (optionnel)
const envExample = `# Variables d'environnement pour production
# Copiez ce fichier en .env et remplissez les valeurs

# Port (défini automatiquement par Hostinger)
# PORT=3000

# Google Maps API (optionnel)
# VITE_MAPS_KEY=VOTRE_CLE_API

# Google Analytics 4 (optionnel)
# VITE_GA4_ID=G-XXXXXXXXXX

# Node environment
NODE_ENV=production
`;

fs.writeFileSync(path.join(publicHtmlDir, '.env.example'), envExample);
console.log('✅ .env.example créé');

console.log('\n✨ Package Hostinger prêt !\n');
console.log('📂 Emplacement : hostinger/public_html/');
console.log('\n📤 Prochaines étapes :');
console.log('   1. Uploadez le contenu de "hostinger/public_html/" sur Hostinger');
console.log('   2. Configurez Node.js dans hPanel (application root: public_html, startup: server.js)');
console.log('   3. Exécutez "NPM Install" dans hPanel');
console.log('   4. Cliquez sur "Restart"');
console.log('\n✅ Votre site sera en ligne !\n');

// Fonction utilitaire : Copier récursivement un dossier
function copyDirectory(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
