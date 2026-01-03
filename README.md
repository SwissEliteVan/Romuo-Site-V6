# 🚗 ROMUO VTC — Site Web Premium

Application web moderne pour **ROMUO VTC**, service de transport premium en Suisse.

![Stack](https://img.shields.io/badge/Stack-React%20%2B%20TypeScript%20%2B%20Express-blue)
![Deployment](https://img.shields.io/badge/Deployment-Hostinger%20Node.js-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

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
- React 19 + TypeScript
- Vite (build)
- Wouter (routing SPA)
- Tailwind CSS v4
- Radix UI (composants accessibles)
- Framer Motion (animations)

**Backend :**
- Express.js (serveur Node.js)
- Headers de sécurité (CSP, X-Frame-Options, etc.)
- Fallback SPA (toutes routes → index.html)
- Health check endpoint

**SEO & Analytics :**
- react-helmet-async (méta dynamiques)
- JSON-LD structured data
- Google Analytics 4 (opt-in)
- Sitemap XML + robots.txt

**Déploiement :**
- Hostinger Node.js Apps
- Build automatisé
- Script de packaging

---

## 🚀 Installation locale

### Prérequis

- Node.js 18+ ou 20 LTS
- npm (ou pnpm)

### Installation

```bash
# Cloner le repo
git clone https://github.com/SwissEliteVan/Romuo-Site-V6.git
cd Romuo-Site-V6

# Installer les dépendances
npm install --legacy-peer-deps

# Lancer en développement
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

### Build production

```bash
# Build complet (client + serveur)
npm run build

# Tester en production locale
npm start
```

---

## 📦 Déploiement sur Hostinger

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

Créez un fichier `.env` à la racine (optionnel) :

```bash
# Google Maps (pour calcul devis précis)
VITE_MAPS_KEY=VOTRE_CLE_API

# Google Analytics 4 (pour tracking)
VITE_GA4_ID=G-XXXXXXXXXX

# Environnement
NODE_ENV=production
```

> **Note :** Sans ces clés, l'app fonctionne avec des fonctionnalités limitées (calcul basique, pas de tracking).

---

## 📂 Structure du projet

```
Romuo-Site-V6/
├── client/                  # Application React
│   ├── public/              # Fichiers statiques (robots.txt, sitemap.xml, etc.)
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   │   ├── booking/     # Calcul devis + carte
│   │   │   ├── consent/     # Cookie consent
│   │   │   ├── layout/      # Header, Footer, Layout
│   │   │   ├── seo/         # SEO components
│   │   │   └── ui/          # UI primitives (Button, Card, etc.)
│   │   ├── pages/           # Pages de l'app
│   │   ├── utils/           # Utilitaires (analytics, jsonLd)
│   │   ├── App.tsx          # Root component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Styles globaux
│   └── index.html           # HTML template
├── server/                  # Serveur Express
│   └── index.ts             # Serveur Node.js
├── scripts/                 # Scripts utilitaires
│   └── prepare-hostinger.mjs  # Packaging Hostinger
├── dist/                    # Build output
│   ├── public/              # Site buildé
│   └── server/              # Serveur compilé
├── hostinger/               # Package prêt pour upload
│   └── public_html/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
├── DEPLOY_HOSTINGER.md      # Guide déploiement
└── README.md                # Ce fichier
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

---

## 🛣️ Roadmap

### Phase 1 : Lancement (✅ COMPLÉTÉ)
- [x] Site vitrine complet
- [x] Calculateur devis basique
- [x] Formulaire contact
- [x] SEO optimisé
- [x] Cookie consent + GA4
- [x] Déploiement Hostinger

### Phase 2 : Améliorations (EN COURS)
- [x] Section flotte de véhicules avec détails (Berline premium, Van, Berline luxe)
- [x] Section témoignages clients avec système de notation
- [x] Formulaire de réservation détaillé avec validation
- [x] Sélection de type de service (transfert, business, longue distance, disposition)
- [x] Sélection de nombre de passagers et bagages
- [ ] Intégration Google Maps API réelle
- [ ] Paiement en ligne (Stripe/Twint)
- [ ] Back-office admin
- [ ] Multi-langue (FR/EN/DE)

### Phase 3 : Évolution (Futur)
- [ ] Application mobile (React Native)
- [ ] Tracking GPS en temps réel
- [ ] Intégration calendrier
- [ ] Programme de fidélité

---

**🚀 Prêt pour le déploiement !**
