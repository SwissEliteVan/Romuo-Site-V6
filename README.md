# 🚗 ROMUO VTC — Site Web Premium

Application web moderne et performante pour **ROMUO VTC**, service de chauffeur privé haut de gamme en Suisse.

[![Node](https://img.shields.io/badge/node-18.x-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/licenses/MIT)

---

## 🎯 Caractéristiques principales

### ✨ Fonctionnalités

- **Site vitrine premium** avec design Swiss Modernism
- **Calculateur de devis** avec carte interactive (Google Maps/Mapbox)
- **Formulaire de contact** avec validation
- **Multi-pages** : Accueil, Services, Tarifs, Contact, Pages légales
- **SEO optimisé** : React Helmet Async + JSON-LD + Sitemap
- **Conformité** : LPD Suisse + RGPD (Cookie Consent + GA4 optionnel)
- **Performance** : Lazy loading, cache optimisé, Core Web Vitals
- **Accessibilité** : WCAG AA, focus visible, ARIA, min 44px tactile
- **Mobile-first** : Design responsive premium

### 🛠️ Stack technique

**Frontend :**
- **React 18** + **TypeScript 5** (strict mode)
- **Vite** - Build tool ultra-rapide
- **Wouter** - Routing SPA léger
- **Tailwind CSS v4** - Styling Swiss Modernism
- **Lucide React** - Icônes modernes
- **React Helmet Async** - SEO meta tags

**APIs & Services :**
- **TomTom API** - Géocodage + calcul d'itinéraires
- **Google Analytics 4** - Analytics (optionnel avec consent)
- **PWA** - Service Worker avec Workbox

**DevOps & Infrastructure :**
- **Docker** - Containerisation multi-stage (Alpine + Nginx)
- **Nginx** - Web server production avec SSL/TLS
- **GitHub Actions** - CI/CD automatisé (lint, test, build, deploy)
- **Netlify / Vercel** - Plateformes de déploiement

**Qualité & Tooling :**
- **ESLint** + **Prettier** - Code quality
- **TypeScript strict** - Type safety
- **Lighthouse CI** - Performance monitoring
- **Pre-commit hooks** - Validation automatique
- **Makefile** - Commandes développeur simplifiées

---

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** 18.x ou supérieur
- **npm** 9.x ou supérieur
- **Git** (recommandé)
- **Docker** (optionnel)

### Option 1 : Setup Automatique (Recommandé)

```bash
# Cloner le repo
git clone https://github.com/SwissEliteVan/Romuo-Site-V6.git
cd Romuo-Site-V6

# Lancer le setup interactif
./setup.sh

# Ou avec Make
make init
```

Le script vous guidera à travers :
- Configuration des variables d'environnement
- Installation des dépendances
- Configuration des clés API
- Génération de certificats SSL (optionnel)

### Option 2 : Setup Manuel

```bash
# Installer les dépendances
cd client
npm install

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec votre clé API TomTom

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### Option 3 : Docker

```bash
# Development
make docker-dev
# ou
docker compose up

# Production
make docker-prod
# ou
docker compose -f docker-compose.prod.yml up
```

## 🛠️ Commandes Disponibles

Le projet utilise **Makefile** pour simplifier les commandes courantes :

```bash
make help              # Affiche toutes les commandes disponibles
make init              # Setup complet du projet (setup.sh + install)
make dev               # Lance le serveur de développement
make build             # Build pour production
make preview           # Prévisualise le build production
make validate          # Vérifie code (type-check, lint, format)
make lint              # Lance ESLint
make lint-fix          # Corrige les erreurs ESLint
make format            # Formate le code avec Prettier
make audit             # Audit de sécurité npm

# Docker
make docker-dev        # Lance l'environnement Docker dev
make docker-dev-bg     # Lance Docker dev en arrière-plan
make docker-prod       # Lance l'environnement Docker production
make docker-stop       # Arrête tous les containers Docker
make docker-logs       # Affiche les logs Docker

# SSL & Deployment
make ssl-dev           # Génère certificats SSL auto-signés
make generate-icons    # Génère les icônes PWA
make deploy-netlify    # Déploie sur Netlify
make deploy-vercel     # Déploie sur Vercel

# Maintenance
make clean             # Nettoie build artifacts
make clean-install     # Nettoie et réinstalle dépendances
```

---

## 📦 Déploiement

### Guide complet

Consultez **[DEPLOY_HOSTINGER.md](./DEPLOY_HOSTINGER.md)** pour le guide détaillé.

### Résumé rapide

```bash
# 1. Builder
npm run build

# 2. Packager pour Hostinger
npm run prepare:hostinger

# 3. Uploader le contenu de hostinger/public_html/ sur Hostinger

# 4. Configurer Node.js Apps dans hPanel
# - Application root: public_html
# - Startup file: server.js
# - Node version: 20 LTS

# 5. NPM Install + Restart dans hPanel
```

---

## 🌍 Variables d'environnement

Créez un fichier `.env` dans le dossier `client/` :

```bash
# REQUIRED: TomTom API Key
VITE_TOMTOM_API_KEY=your_api_key_here

# OPTIONAL: Google Analytics 4 Measurement ID
# VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Obtenir une clé API TomTom

1. Créer un compte sur [TomTom Developer Portal](https://developer.tomtom.com/)
2. Créer une nouvelle application
3. Activer les APIs nécessaires :
   - **Search API** (géocodage)
   - **Routing API** (calcul d'itinéraires)
4. Copier la clé API dans `client/.env`

> **Note :** Sans clé TomTom, le calculateur utilisera une estimation basique (mode démo).

---

## 📂 Structure du projet

```
Romuo-Site-V6/
├── client/                       # Application React frontend
│   ├── public/                   # Fichiers statiques
│   │   ├── icons/                # Icônes PWA (8 tailles)
│   │   ├── manifest.json         # PWA manifest
│   │   ├── sitemap.xml           # SEO sitemap
│   │   ├── robots.txt            # Directives robots
│   │   ├── offline.html          # Page PWA offline
│   │   ├── logo.svg              # Logo SVG
│   │   ├── _headers              # Netlify security headers
│   │   └── _redirects            # Netlify redirects
│   ├── src/
│   │   ├── components/           # Composants réutilisables
│   │   │   ├── booking/          # RouteCalculator (TomTom API)
│   │   │   ├── layout/           # Header, Footer, CookieBanner
│   │   │   └── ui/               # Button, Card, AnimatedSection, etc.
│   │   ├── pages/                # Pages (Home, Services, Contact, etc.)
│   │   ├── hooks/                # Custom hooks (useInView)
│   │   ├── utils/                # Analytics, helpers
│   │   ├── App.tsx               # Root component
│   │   ├── main.tsx              # Entry point avec ErrorBoundary
│   │   └── index.css             # Styles + animations
│   ├── scripts/                  # Scripts d'automatisation
│   │   ├── deploy.sh             # Script de déploiement
│   │   ├── pre-commit.sh         # Validation pre-commit
│   │   └── generate-icons.sh     # Génération icônes PWA
│   ├── Dockerfile                # Production multi-stage
│   ├── Dockerfile.dev            # Development
│   ├── .dockerignore             # Exclusions Docker
│   ├── .env.example              # Template env dev
│   ├── .env.production.example   # Template env production
│   ├── .nvmrc                    # Version Node.js (18)
│   ├── .prettierrc               # Config Prettier
│   ├── .eslintrc.cjs             # Config ESLint
│   ├── lighthouserc.json         # Config Lighthouse CI
│   ├── vite.config.ts            # Config Vite + PWA
│   ├── tsconfig.json             # TypeScript strict
│   ├── package.json              # Dependencies + scripts
│   ├── README.md                 # Doc frontend
│   ├── DEPLOYMENT.md             # Guide déploiement complet
│   ├── CHANGELOG.md              # Historique versions
│   └── GENERATE_ICONS.md         # Guide génération icônes
├── nginx/                        # Configuration Nginx production
│   ├── nginx.conf                # Config complète (SSL, cache, CSP)
│   └── ssl/                      # Certificats SSL
│       └── README.md             # Guide SSL
├── .github/
│   └── workflows/                # GitHub Actions CI/CD
│       ├── ci.yml                # Tests, lint, build, audit
│       ├── lighthouse.yml        # Performance audits
│       └── deploy.yml            # Déploiement automatisé
├── docker-compose.yml            # Environnement dev Docker
├── docker-compose.prod.yml       # Environnement prod Docker
├── Makefile                      # Commandes simplifiées (30+)
├── setup.sh                      # Setup interactif
├── .dockerignore                 # Exclusions Docker racine
├── .editorconfig                 # Config éditeurs
├── .gitignore                    # Git exclusions
├── .nvmrc                        # Version Node.js
├── CONTRIBUTING.md               # Guide contribution
├── SECURITY.md                   # Politique de sécurité
└── README.md                     # Ce fichier
```

---

## 🎨 Design

**Mouvement design :** Swiss Modernism / International Typographic Style

**Palette de couleurs :**
- Noir profond : `#0a0a0a`
- Or suisse : `#d4af37`
- Blanc pur : `#ffffff`
- Gris ardoise : `#2d3748`

**Principes :**
- Précision et clarté
- Minimalisme luxueux
- Contraste fort
- Typographie héroïque

---

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| **Accueil** | `/` | Hero, services, FAQ, CTA |
| **Services** | `/services` | Transfert aéroport, Business, Longue distance, Disposition |
| **Tarifs** | `/tarifs` | Politique tarifaire, exemples |
| **Contact** | `/contact` | Formulaire + devis + coordonnées |
| **Mentions légales** | `/mentions-legales` | Impressum Suisse |
| **Confidentialité** | `/confidentialite` | LPD + RGPD |
| **Cookies** | `/cookies` | Politique cookies |
| **404** | `/*` | Page non trouvée |

---

## ✅ Conformité & Sécurité

### Conformité LPD/RGPD

- ✅ Cookie consent obligatoire avant tracking
- ✅ Politique de confidentialité détaillée
- ✅ Droits utilisateurs (accès, rectification, effacement)
- ✅ Pas de tracking sans consentement
- ✅ Données minimales collectées

### Sécurité

- ✅ Headers CSP, X-Frame-Options, X-Content-Type-Options
- ✅ HTTPS only (forcé en production)
- ✅ Validation formulaires côté client
- ✅ Sanitization des inputs
- ✅ Pas de données sensibles en localStorage

### Accessibilité (WCAG AA)

- ✅ Contraste minimum 4.5:1
- ✅ Navigation clavier complète
- ✅ Focus visible
- ✅ ARIA labels
- ✅ Taille tactile min 44px
- ✅ Skip to content

---

## 📈 Performance

### Optimisations

- ✅ Lazy loading des pages (React.lazy + Suspense)
- ✅ Code splitting automatique (Vite)
- ✅ Cache agressif pour assets hashés
- ✅ Compression GZIP
- ✅ Images optimisées
- ✅ Minification CSS/JS

### Core Web Vitals (objectifs)

- **LCP** (Largest Contentful Paint) : < 2.5s
- **FID** (First Input Delay) : < 100ms
- **CLS** (Cumulative Layout Shift) : < 0.1

---

## 🧪 Tests

```bash
# Vérifier types TypeScript
npm run check

# Formater le code
npm run format

# Build test
npm run build
```

---

## 📞 Contact & Support

**ROMUO VTC**
- Téléphone : [076 084 20 89](tel:+41760842089)
- Email : contact@romuo-vtc.ch
- Disponibilité : 24/7 sur réservation

---

## 📄 Licence

MIT License - © 2026 ROMUO VTC

## 📚 Documentation

Documentation complète disponible :

- **[Client README](client/README.md)** - Documentation frontend détaillée (179 lignes)
- **[Deployment Guide](client/DEPLOYMENT.md)** - Guide de déploiement 4 plateformes (292 lignes)
- **[Contributing Guide](CONTRIBUTING.md)** - Guide de contribution complet (326 lignes)
- **[Security Policy](SECURITY.md)** - Politique de sécurité et rapports de vulnérabilités
- **[Changelog](client/CHANGELOG.md)** - Historique des versions et TODO
- **[Icon Generation](client/GENERATE_ICONS.md)** - Guide génération icônes PWA

---

## 🛣️ Roadmap

### Phase 1 : MVP ✅ COMPLÉTÉ
- [x] Site vitrine complet avec Swiss Modernism design
- [x] Calculateur de devis avec **TomTom API** (géocodage + routing)
- [x] Formulaire de contact multi-sections
- [x] SEO optimisé (sitemap, robots.txt, meta tags)
- [x] PWA avec service worker et offline mode
- [x] Cookie consent RGPD/LPD conforme
- [x] Google Analytics 4 (opt-in)
- [x] Docker multi-stage production
- [x] GitHub Actions CI/CD
- [x] Documentation complète
- [x] Scripts d'automatisation

### Phase 2 : Améliorations (Prochaines étapes)
- [ ] Générer les 8 icônes PWA (72px à 512px)
- [ ] Compléter les mentions légales (IDE, adresse)
- [ ] Ajouter tarifs indicatifs détaillés
- [ ] Créer og-image.jpg pour social sharing
- [ ] Système de réservation en ligne
- [ ] Intégration calendrier de disponibilité
- [ ] Multi-langue (FR/EN/DE)

### Phase 3 : Évolution (Futur)
- [ ] Backend API avec base de données
- [ ] Paiement en ligne (Stripe/Twint)
- [ ] Back-office administrateur
- [ ] Application mobile (React Native)
- [ ] Tracking GPS temps réel des véhicules
- [ ] Programme de fidélité client
- [ ] Notifications SMS/Email automatiques

---

**🚀 Prêt pour le déploiement !**
