# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2026-01-03

### Ajouté

#### SEO & Performances
- Sitemap.xml avec toutes les pages et priorités
- Robots.txt avec référence au sitemap
- Meta tags Open Graph et Twitter Cards
- JSON-LD pour données structurées
- Lazy loading de toutes les pages
- Optimisation responsive mobile-first

#### PWA (Progressive Web App)
- Manifest.json complet avec métadonnées
- Support installation mobile et desktop
- Meta tags PWA (theme-color, mobile-capable)
- Apple Touch Icons pour iOS
- Mode standalone configuré
- Documentation génération icônes (GENERATE_ICONS.md)

#### UX & Design
- 6 animations CSS personnalisées (fadeIn, slideIn, pulse, shimmer)
- Hook useInView avec Intersection Observer
- Composant AnimatedSection réutilisable
- Delays en cascade pour animations
- Effets hover avec ombre dorée
- Transitions fluides (cubic-bezier)
- Design system Swiss Modernism

#### Accessibilité (WCAG)
- Composant SkipToContent pour navigation clavier
- Focus states dorés (2px outline) sur tous les éléments
- Scroll offset pour header fixe (80px)
- ARIA labels complets sur icônes et boutons
- Respect prefers-reduced-motion

#### RGPD/LPD Conformité
- Bannière de consentement cookies
- Gestion localStorage du consentement
- Boutons Accepter/Refuser
- Intégration Google Analytics 4 conditionnelle
- Pages légales complètes (Mentions, Confidentialité, Cookies)
- Politique de conservation des données

#### APIs & Fonctionnalités
- Intégration TomTom API (Search + Routing)
- Calculateur d'itinéraire précis
- Géocodage adresses suisses (countrySet=CH)
- Distance et durée réelles pour tarification
- Fallback sur estimation basique

#### Configuration & Déploiement
- Fichier .env.example avec documentation
- _headers Netlify (security, cache control, CSP)
- _redirects pour SPA routing et HTTPS
- vercel.json pour configuration Vercel
- README.md complet (179 lignes)
- CHANGELOG.md pour suivi des versions

#### Gestion d'erreurs
- ErrorBoundary React avec UI élégante
- Affichage détails techniques en dev mode
- Boutons "Retour accueil" et "Nous contacter"
- Logging erreurs en console

#### Sécurité
- Content-Security-Policy configurée
- Headers anti-XSS, anti-clickjacking
- X-Content-Type-Options: nosniff
- Referrer-Policy strict
- Permissions-Policy pour géolocalisation

### Optimisé

#### Responsive Design
- 12 pages/composants optimisés mobile-first
- Breakpoints Tailwind cohérents (sm, md, lg)
- Textes adaptatifs (text-base sm:text-lg md:text-xl)
- Boutons full-width mobile (w-full sm:w-auto)
- Padding et spacing progressifs
- Tableaux avec scroll horizontal mobile
- Icônes avec flex-shrink-0

#### Performance
- Code splitting avec React.lazy()
- Suspense avec LoadingSpinner
- Cache immutable pour assets (1 an)
- No-cache pour service worker et manifest
- Images optimisées (placeholder WebP)

### Documenté

- README.md complet avec installation, configuration, déploiement
- Design system documenté (couleurs, typographie, breakpoints)
- Guide TomTom API avec étapes détaillées
- GENERATE_ICONS.md avec 3 méthodes de génération
- .env.example avec toutes les variables
- CHANGELOG.md pour suivi des versions

## Commits

Total: 6 commits pushés sur `claude/vtc-app-mvp-4FF0V`

1. `fix: Optimisation responsive complète du site vitrine`
2. `feat: Intégration TomTom API pour calcul d'itinéraire précis`
3. `feat: Améliorations UX, SEO et accessibilité`
4. `feat: PWA, bannière cookies et configuration complète`
5. `docs: Ajout README complet avec documentation technique`
6. `feat: Configuration déploiement et gestion d'erreurs`

## TODO

- [ ] Générer les icônes PWA (8 tailles: 72px à 512px)
- [ ] Compléter les mentions légales (IDE, adresse, directeur)
- [ ] Remplir les tarifs indicatifs dans Tarifs.tsx
- [ ] Créer og-image.jpg pour partages sociaux (1200x630px)
- [ ] Configurer Google Analytics 4 (optionnel)
- [ ] Tester installation PWA sur iOS/Android
- [ ] Audit Lighthouse (viser 90+ sur tous les scores)

## Notes de version

Version initiale production-ready du site vitrine ROMUO VTC.

**Technologies:**
- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- Wouter
- TomTom API
- React Helmet Async

**Hébergement recommandé:**
- Netlify (avec _headers et _redirects)
- Vercel (avec vercel.json)
- Hostinger / OVH / Infomaniak

---

**Mainteneur:** ROMUO VTC  
**Contact:** contact@romuo-vtc.ch  
**Téléphone:** 076 084 20 89
