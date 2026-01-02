# 🚀 Déploiement Hostinger — ROMUO VTC

Guide complet pour déployer l'application ROMUO VTC sur Hostinger via Node.js Apps.

---

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Prérequis](#prérequis)
3. [Préparation locale](#préparation-locale)
4. [Upload sur Hostinger](#upload-sur-hostinger)
5. [Configuration Node.js (hPanel)](#configuration-nodejs-hpanel)
6. [Vérifications post-déploiement](#vérifications-post-déploiement)
7. [Configuration des variables d'environnement](#configuration-des-variables-denvironnement)
8. [Dépannage](#dépannage)
9. [Mises à jour futures](#mises-à-jour-futures)

---

## 🎯 Vue d'ensemble

### Architecture de déploiement

L'application ROMUO VTC est une **SPA (Single Page Application)** React servie par un serveur **Express.js** sur Node.js.

**Structure Hostinger requise :**

```
public_html/
├── package.json       ← Dépendances runtime (uniquement Express)
├── server.js          ← Point d'entrée Node.js
├── dist/
│   ├── public/        ← Site React buildé (HTML, CSS, JS, assets)
│   │   ├── index.html
│   │   ├── assets/
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   └── favicon.svg
│   └── server/        ← Serveur Express compilé
│       └── index.js
└── .env (optionnel)   ← Variables d'environnement
```

**Points clés :**
- ✅ Serveur Express sert les fichiers statiques
- ✅ Fallback SPA : toutes les routes renvoient `index.html`
- ✅ Headers de sécurité configurés
- ✅ Cache optimisé pour les assets
- ✅ Health check endpoint `/health`

---

## ✅ Prérequis

### Sur votre machine locale

- **Node.js** : version 18+ ou 20 LTS ([télécharger](https://nodejs.org/))
- **npm** : installé automatiquement avec Node.js
- **Git** : pour cloner le repo (optionnel)

### Sur Hostinger

- **Plan compatible Node.js** : Business ou supérieur
- **Accès hPanel** : pour configurer Node.js Apps
- **Domaine configuré** : domaine principal ou sous-domaine

---

## 🛠️ Préparation locale

### Étape 1 : Cloner le projet

```bash
git clone https://github.com/SwissEliteVan/Romuo-Site-V6.git
cd Romuo-Site-V6
```

### Étape 2 : Installer les dépendances

```bash
npm install --legacy-peer-deps
```

> **Note :** `--legacy-peer-deps` est nécessaire car React 19 n'est pas encore officiellement supporté par certaines libs.

### Étape 3 : Builder le projet

```bash
npm run build
```

**Ce qui se passe :**
1. `build:client` : Vite compile le code React → `dist/public/`
2. `build:server` : esbuild compile le serveur Express → `dist/server/`

**Vérifiez :**
```bash
ls dist/public/  # Doit contenir index.html, assets/, robots.txt, etc.
ls dist/server/  # Doit contenir index.js
```

### Étape 4 : Générer le package Hostinger

```bash
npm run prepare:hostinger
```

**Résultat :**
```
hostinger/
  public_html/
    ├── package.json      ← Runtime minimal
    ├── server.js         ← Point d'entrée
    ├── dist/             ← Build complet
    ├── .env.example      ← Template variables d'environnement
    └── README_HOSTINGER.txt
```

> **IMPORTANT :** C'est le contenu de `hostinger/public_html/` que vous allez uploader.

---

## 📤 Upload sur Hostinger

### Méthode 1 : Gestionnaire de fichiers (recommandé pour débutants)

1. **Connectez-vous à hPanel** : [https://hpanel.hostinger.com/](https://hpanel.hostinger.com/)
2. **Allez dans "Fichiers"** → "Gestionnaire de fichiers"
3. **Naviguez vers `public_html`** (ou le dossier de votre domaine)
4. **Supprimez les fichiers par défaut** (index.html, etc.)
5. **Uploadez TOUT le contenu de `hostinger/public_html/`** :
   - Sélectionnez tous les fichiers ET le dossier `dist/`
   - Uploadez-les directement dans `public_html/`

### Méthode 2 : FTP/SFTP (recommandé pour experts)

**Paramètres FTP :**
- Hôte : Indiqué dans hPanel → Fichiers → FTP
- Port : 21 (FTP) ou 22 (SFTP)
- Utilisateur : votre nom d'utilisateur FTP
- Mot de passe : votre mot de passe FTP

**Avec FileZilla :**
1. Connectez-vous au serveur
2. Naviguez vers `public_html/`
3. Glissez-déposez le contenu de `hostinger/public_html/`

**Structure finale sur Hostinger :**
```
public_html/
├── package.json
├── server.js
└── dist/
    ├── public/
    └── server/
```

---

## ⚙️ Configuration Node.js (hPanel)

### Étape 1 : Activer Node.js Apps

1. Dans hPanel, allez dans **"Sites web"** → **"Node.js"**
2. Sélectionnez votre domaine
3. **Configuration :**
   - **Application root :** `public_html`
   - **Application startup file :** `server.js`
   - **Node.js version :** `20` (ou 18+)
4. Cliquez sur **"Créer"**

### Étape 2 : Installer les dépendances

1. Dans la page Node.js Apps, cliquez sur **"NPM Install"**
2. Attendez la fin de l'installation (quelques secondes)
3. Vérifiez que `express` est installé (visible dans les logs)

### Étape 3 : Démarrer l'application

1. Cliquez sur **"Restart"** (ou "Start" si c'est la première fois)
2. Attendez quelques secondes
3. L'indicateur doit passer au vert ✅

---

## ✅ Vérifications post-déploiement

### 1. Page d'accueil

**Test :** Visitez `https://votre-domaine.ch`

**Résultat attendu :**
- ✅ Page d'accueil ROMUO VTC affichée
- ✅ Design Swiss Modernism (noir/or)
- ✅ Navigation fonctionnelle
- ✅ Pas de 404 sur les assets

### 2. Health check

**Test :** Visitez `https://votre-domaine.ch/health`

**Résultat attendu :**
```json
{
  "status": "ok",
  "timestamp": "2026-01-02T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

### 3. Routing SPA

**Test :** Visitez directement :
- `https://votre-domaine.ch/services`
- `https://votre-domaine.ch/tarifs`
- `https://votre-domaine.ch/contact`

**Résultat attendu :**
- ✅ Pages affichées correctement
- ✅ Pas de 404 au refresh (F5)

### 4. Console navigateur

**Test :** Ouvrez la console (F12) sur le site

**Vérifiez :**
- ✅ Aucune erreur 404 sur les fichiers JS/CSS
- ✅ Bandeau cookie consent affiché après 1 seconde
- ✅ Aucune erreur JavaScript

---

## 🔐 Configuration des variables d'environnement

### Variables disponibles

Créez un fichier `.env` dans `public_html/` (optionnel) :

```bash
# Google Maps API (optionnel)
VITE_MAPS_KEY=VOTRE_CLE_API

# Google Analytics 4 (optionnel)
VITE_GA4_ID=G-XXXXXXXXXX

# Environnement
NODE_ENV=production
```

### Comment obtenir les clés API

#### Google Maps

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un projet
3. Activez "Maps JavaScript API" + "Distance Matrix API"
4. Créez une clé API avec restrictions
5. Ajoutez-la dans `.env`

#### Google Analytics 4

1. Créez une propriété GA4 sur [analytics.google.com](https://analytics.google.com/)
2. Récupérez l'ID (format : `G-XXXXXXXXXX`)
3. Décommentez le code dans `client/src/utils/analytics.ts` et `client/src/components/consent/CookieConsent.tsx`
4. Ajoutez l'ID dans `.env`

> **Note :** Sans ces clés, l'app fonctionne mais avec fonctionnalités limitées (calcul devis basique, pas de tracking analytics).

---

## 🐛 Dépannage

### ❌ Page blanche

**Cause :** `dist/public/` n'est pas uploadé ou mal placé

**Solution :**
1. Vérifiez que `public_html/dist/public/index.html` existe
2. Vérifiez les permissions (755 pour dossiers, 644 pour fichiers)
3. Consultez les logs Node.js dans hPanel

### ❌ Erreur 500 sur toutes les pages

**Cause :** Serveur Node.js ne démarre pas

**Solution :**
1. Vérifiez les logs dans hPanel → Node.js → Logs
2. Vérifiez que `package.json` est bien le runtime (pas celui du dev)
3. Relancez "NPM Install" puis "Restart"

### ❌ 404 sur les routes (/services, /contact, etc.)

**Cause :** Node.js n'est pas actif, Apache sert en mode statique

**Solution :**
1. Vérifiez que Node.js Apps est bien activé pour ce domaine
2. Vérifiez que le serveur est démarré (indicateur vert)
3. Redémarrez l'application

### ❌ Assets 404 (CSS/JS manquants)

**Cause :** Build incomplet ou mauvais chemin

**Solution :**
1. Vérifiez que `dist/public/assets/` contient des fichiers `.js` et `.css`
2. Vérifiez le contenu de `index.html` (chemins doivent commencer par `/assets/`)
3. Rebuild en local et re-upload

### ❌ Cookie consent ne s'affiche pas

**Cause :** JavaScript non chargé ou erreur

**Solution :**
1. Ouvrez la console (F12), recherchez des erreurs JavaScript
2. Vérifiez que `index.js` se charge correctement
3. Videz le cache navigateur

---

## 🔄 Mises à jour futures

### Workflow de mise à jour

1. **Modifiez le code en local**
2. **Testez en dev :** `npm run dev`
3. **Buildez :** `npm run build`
4. **Packagez :** `npm run prepare:hostinger`
5. **Uploadez** le contenu de `hostinger/public_html/` (écrase l'ancien)
6. **Redémarrez** l'app Node.js dans hPanel

> **Astuce :** Vous n'avez PAS besoin de supprimer/recréer l'app Node.js. Un simple upload + restart suffit.

### Git workflow (optionnel)

```bash
# Après modifications
git add .
git commit -m "Description des changements"
git push origin main

# Sur Hostinger : re-pull + rebuild + redeploy
```

---

## 📞 Support

**ROMUO VTC**
- **Téléphone :** 076 084 20 89
- **Email :** contact@romuo-vtc.ch

**Documentation technique :**
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [Hostinger Node.js](https://www.hostinger.com/tutorials/how-to-deploy-node-js)

---

**✅ Votre application ROMUO VTC est maintenant en ligne !**
