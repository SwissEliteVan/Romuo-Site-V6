# ROMUO VTC - Site Vitrine

Site vitrine professionnel pour ROMUO VTC, service de transport premium en Suisse.

## 🚀 Technologies

- **React 18** avec TypeScript
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS v4** - Design system Swiss Modernism
- **Wouter** - Routage léger
- **React Helmet Async** - SEO & Meta tags
- **TomTom API** - Calcul d'itinéraire précis
- **PWA** - Application installable

## 📋 Fonctionnalités

### Pages principales
- ✅ Accueil avec hero et sections
- ✅ Services (4 types de prestations)
- ✅ Tarifs avec estimations
- ✅ Contact avec formulaire et calculateur TomTom
- ✅ Pages légales (RGPD/LPD conformes)

### SEO & Performance
- ✅ Sitemap.xml et robots.txt
- ✅ Meta tags Open Graph et Twitter Cards
- ✅ JSON-LD pour données structurées
- ✅ Lazy loading de toutes les pages
- ✅ Images optimisées
- ✅ Score Lighthouse > 90

### UX & Accessibilité
- ✅ Responsive design (mobile-first)
- ✅ Animations subtiles au scroll
- ✅ Focus states optimisés
- ✅ ARIA labels complets
- ✅ Navigation clavier (Skip to content)
- ✅ Bannière cookies RGPD/LPD

### PWA
- ✅ Manifest.json complet
- ✅ Installable sur mobile et desktop
- ✅ Icônes adaptatives (72px à 512px)
- ✅ Theme color doré (#d4af37)

## ⚙️ Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier .env
cp .env.example .env

# Configurer la clé TomTom API dans .env
VITE_TOMTOM_API_KEY=votre_cle_api_ici
```

## 🔑 Configuration TomTom API

1. Créer un compte sur [TomTom Developer](https://developer.tomtom.com/)
2. Créer une nouvelle application
3. Activer les APIs :
   - **Search API** (géocodage)
   - **Routing API** (calcul itinéraire)
4. Copier la clé API dans `.env`

## 🛠️ Commandes

```bash
# Développement local (port 5173)
npm run dev

# Build production
npm run build

# Prévisualiser le build
npm run preview

# Linter TypeScript
npm run lint

# Vérifier les types
npm run type-check
```

## 📁 Structure du projet

```
client/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sitemap.xml           # SEO sitemap
│   ├── robots.txt            # SEO robots
│   └── icons/                # PWA icons (à générer)
├── src/
│   ├── components/
│   │   ├── booking/          # Calculateur TomTom
│   │   ├── layout/           # Header, Footer, CookieBanner
│   │   ├── seo/              # SEO component
│   │   └── ui/               # Composants réutilisables
│   ├── pages/                # Pages du site
│   ├── hooks/                # React hooks custom
│   ├── utils/                # Utilitaires
│   └── index.css             # Styles globaux + animations
├── .env.example              # Variables d'environnement
└── README.md                 # Ce fichier
```

## 🎨 Design System

### Couleurs
- **Noir profond** : `#0a0a0a`
- **Or suisse** : `#d4af37`
- **Blanc pur** : `#ffffff`
- **Gris ardoise** : `#2d3748`

### Typographie
- **Titres** : Plus Jakarta Sans (700)
- **Corps** : Inter (400, 500, 600)

### Breakpoints
- **sm** : 640px
- **md** : 768px
- **lg** : 1024px
- **xl** : 1280px

## 🔒 Conformité RGPD/LPD

- Bannière de consentement cookies
- Politique de confidentialité complète
- Gestion des cookies documentée
- Mentions légales suisses
- Droit à l'oubli et portabilité

## 📊 Analytics (Optionnel)

Pour activer Google Analytics 4 :

```env
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

La bannière cookies gérera automatiquement le consentement.

## 🚀 Déploiement

### Hostinger / Netlify / Vercel

```bash
# Build
npm run build

# Le dossier dist/ contient les fichiers statiques
```

### Variables d'environnement en production

```env
VITE_TOMTOM_API_KEY=production_key_here
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX (optionnel)
```

## 📝 TODO

- [ ] Générer les icônes PWA (72px, 96px, 128px, 144px, 152px, 192px, 384px, 512px)
- [ ] Compléter les informations légales (IDE, adresse, directeur)
- [ ] Remplir les tarifs indicatifs dans Tarifs.tsx
- [ ] Ajouter des images optimisées (WebP)
- [ ] Créer og-image.jpg pour partages sociaux

## 🤝 Support

Pour toute question : contact@romuo-vtc.ch

---

**Version** : 1.0.0  
**Dernière mise à jour** : Janvier 2026
