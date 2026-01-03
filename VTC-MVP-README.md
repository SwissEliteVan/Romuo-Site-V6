# 🚗 ROMUO VTC - MVP Application Type Uber

## 📋 Vue d'ensemble

Ce projet contient un **MVP complet** d'une application VTC (type Uber) avec :

- ✅ **Backend complet** (API REST + WebSocket) - LIVRÉ
- ✅ **Base de données** (Prisma + PostgreSQL/SQLite) - LIVRÉ
- ✅ **Types et utilitaires partagés** (TypeScript + i18n FR/EN) - LIVRÉ
- ⏳ **3 applications frontend** (Passager, Chauffeur, Admin) - STRUCTURE CRÉÉE
- ✅ **Documentation complète** - LIVRÉE

**État du projet** : Backend 100% fonctionnel, frontends à compléter (structure + config prêtes)

---

## 🏗️ Architecture

```
romuo-vtc-mvp/
├── apps/                       # Frontends (React + Vite + PWA)
│   ├── rider/                  # App Passager ⏳
│   ├── driver/                 # App Chauffeur ⏳
│   └── admin/                  # Back-office Admin ⏳
├── server-vtc/                 # Backend (Express + WebSocket) ✅
│   ├── prisma/                 # Schema DB + migrations ✅
│   ├── src/
│   │   ├── routes/            # API endpoints ✅
│   │   ├── services/          # Business logic ✅
│   │   ├── middleware/        # Auth, validation, rate limit ✅
│   │   ├── websocket/         # WebSocket server ✅
│   │   └── utils/             # Logger, errors ✅
│   └── package.json
├── packages/shared/            # Code partagé ✅
│   └── src/
│       ├── config.ts          # Configuration centralisée ✅
│       ├── types/             # Types TypeScript ✅
│       ├── utils/             # Helpers (pricing, distance) ✅
│       └── i18n/              # Traductions FR/EN ✅
└── docs/                      # Documentation ✅
    ├── 00-plan-livraison.md
    ├── 01-demarrage-local.md
    ├── 02-deploiement.md
    ├── 03-guide-utilisation.md
    └── 04-troubleshooting.md
```

---

## ⚡ Démarrage rapide (Backend seulement)

### 1. Installation des dépendances

```bash
cd server-vtc
npm install
```

### 2. Configuration

Créez un fichier `.env` dans `server-vtc/` :

```bash
cp .env.example .env
```

Éditez `.env` et configurez :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/romuo_vtc"
# OU pour SQLite (développement) :
# DATABASE_URL="file:./dev.db"

JWT_SECRET="votre-secret-jwt-changez-moi"
JWT_REFRESH_SECRET="votre-secret-refresh-changez-moi"

CORS_ORIGINS="http://localhost:3000,http://localhost:3001,http://localhost:3002"
```

### 3. Base de données

```bash
# Générer le client Prisma
npm run db:generate

# Créer la base de données et les tables
npm run db:migrate

# Insérer les données de test
npm run db:seed
```

### 4. Démarrer le serveur

```bash
npm run dev
```

Le serveur sera accessible sur :
- API REST : http://localhost:4000
- WebSocket : ws://localhost:4000/ws
- Health check : http://localhost:4000/api/health

### 5. Tester l'API

Utilisez les comptes de test créés par le seed :

```
Admin:       admin@romuo-vtc.ch / password123
Chauffeur 1: driver1@romuo-vtc.ch / password123
Chauffeur 2: driver2@romuo-vtc.ch / password123
Passager 1:  rider1@example.com / password123
Passager 2:  rider2@example.com / password123
```

**Exemple de requête (connexion passager)** :

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rider1@example.com",
    "password": "password123"
  }'
```

Réponse :
```json
{
  "user": {
    "id": "...",
    "email": "rider1@example.com",
    "role": "rider",
    "firstName": "Pierre",
    "lastName": "Dubois"
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

---

## 📱 Applications Frontend (À compléter)

Les 3 applications frontend sont **structurées** mais nécessitent le développement des composants UI.

### Structure créée pour chaque app :

```
apps/rider/ (ou driver/ ou admin/)
├── public/
│   ├── icons/                 # Icons PWA
│   └── manifest.json          # PWA manifest
├── src/
│   ├── components/            # Composants React
│   ├── pages/                 # Pages de l'app
│   ├── services/              # API client, WebSocket
│   ├── i18n/                  # Configuration i18n
│   ├── App.tsx                # Composant racine
│   └── main.tsx               # Point d'entrée
├── index.html
├── vite.config.ts             # ✅ Config Vite + PWA
├── tsconfig.json
└── package.json               # ✅ Dépendances
```

### Pour compléter les frontends :

**Option 1 : Développement manuel**

1. Installez les dépendances : `npm install` dans chaque dossier app
2. Créez les composants UI (voir exemples dans `/docs/frontend-examples.md`)
3. Intégrez l'API client et le WebSocket
4. Testez avec `npm run dev`

**Option 2 : Utiliser le site vitrine existant**

Le projet contient déjà un site vitrine dans `/client`. Vous pouvez :
1. L'adapter pour créer l'interface passager
2. Réutiliser les composants UI (boutons, cartes, formulaires)
3. Intégrer l'API backend

---

## 🎯 Fonctionnalités du Backend (100% livrées)

### ✅ Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Profil utilisateur

### ✅ Passager (Rider)
- `POST /api/rides/estimate` - Estimation prix/durée
- `POST /api/rides/request` - Demander une course
- `GET /api/rides/active` - Course active
- `POST /api/rides/:id/cancel` - Annuler
- `GET /api/rides/history` - Historique

### ✅ Chauffeur (Driver)
- `POST /api/driver/online` - Passer en ligne
- `POST /api/driver/offline` - Passer hors ligne
- `POST /api/driver/location` - Mettre à jour position
- `POST /api/driver/offers/:id/accept` - Accepter offre
- `POST /api/driver/offers/:id/reject` - Refuser offre
- `POST /api/driver/rides/:id/status` - Mettre à jour statut
- `GET /api/driver/history` - Historique
- `GET /api/driver/stats` - Statistiques

### ✅ Admin
- `GET /api/admin/rides` - Toutes les courses
- `GET /api/admin/drivers` - Tous les chauffeurs
- `PATCH /api/admin/drivers/:id` - Activer/désactiver chauffeur
- `GET /api/admin/stats` - Statistiques globales
- `GET /api/admin/pricing` - Paramètres tarifs

### ✅ WebSocket (Temps réel)
- Messages `new_ride_offer` → Chauffeur
- Messages `ride_assigned` → Passager
- Messages `ride_status_update` → Passager & Chauffeur
- Messages `driver_location_update` → Passager

### ✅ Services Backend

**AuthService** : Inscription, connexion, JWT
**RideService** : CRUD courses, historique
**DispatchService** : Matching passager ↔ chauffeur (algorithme complet)
**PricingService** : Calcul tarifs (distance + durée)
**DriverService** : Gestion chauffeurs (online/offline, position)
**PaymentService** : Paiement simulé (prêt pour Stripe)
**AdminService** : Dashboard admin

---

## ⚙️ Configuration (Paramètres modifiables)

Tous les paramètres sont dans `/packages/shared/src/config.ts` :

### Tarification
```typescript
BASE_FARE: 3.50 CHF          // Frais de base
PRICE_PER_KM: 2.80 CHF       // Prix au km
PRICE_PER_MINUTE: 0.60 CHF   // Prix à la minute
MIN_FARE: 8.00 CHF           // Course minimale
```

### Dispatch
```typescript
OFFER_TIMEOUT_SECONDS: 15    // Temps pour accepter
MAX_SEARCH_RADIUS_KM: 5      // Rayon de recherche
MAX_DRIVERS_TO_NOTIFY: 5     // Chauffeurs notifiés max
```

### Temps Réel
```typescript
DRIVER_LOCATION_INTERVAL_SECONDS: 5    // Envoi position chauffeur
RIDER_POSITION_UPDATE_INTERVAL_SECONDS: 3  // Refresh position passager
```

### i18n
```typescript
SUPPORTED_LOCALES: ['fr', 'en']
DEFAULT_LOCALE: 'fr'
```

---

## 🗃️ Base de données

### Modèle de données (Prisma)

**Tables principales** :
- `users` : Utilisateurs (rider/driver/admin)
- `driver_profiles` : Profils chauffeurs (isOnline, location, rating)
- `vehicles` : Véhicules
- `rides` : Courses (statuts, prix, timestamps)
- `ride_events` : Audit trail des événements
- `payments` : Paiements (simulés)

### Workflow d'une course

```
requested → offered → accepted → en_route → arrived → in_trip → completed
```

**Dispatch (matching)** :
1. Passager demande course
2. Backend cherche chauffeurs online dans rayon 5km
3. Offre envoyée au plus proche (timeout 15s)
4. Si accepté → course attribuée
5. Sinon → offre au suivant (max 5 chauffeurs)
6. Si aucun → `no_driver_available`

---

## 📖 Documentation

Consultez le dossier `/docs/` :

- **00-plan-livraison.md** : Plan complet + checklist
- **01-demarrage-local.md** : Installation locale
- **02-deploiement.md** : Déploiement production
- **03-guide-utilisation.md** : Scénarios utilisateurs
- **04-troubleshooting.md** : Résolution problèmes

---

## 🔒 Sécurité

- ✅ JWT avec access + refresh tokens
- ✅ Validation inputs (express-validator)
- ✅ Rate limiting (100 req/min)
- ✅ Helmet (headers sécurisés)
- ✅ CORS configuré
- ✅ Logs structurés (Winston)
- ✅ Pas de secrets dans le code

---

## 🚀 Déploiement

### Mode A : Serveur Node.js complet

```bash
# Build le backend
cd server-vtc
npm run build

# Démarrer
npm start
```

### Mode B : Frontends statiques + Backend séparé

```bash
# Build chaque frontend
cd apps/rider && npm run build
cd apps/driver && npm run build
cd apps/admin && npm run build

# Héberger sur Netlify/Vercel/Hostinger
# Backend sur Railway/Render/Heroku
```

Voir `/docs/02-deploiement.md` pour les instructions détaillées.

---

## 🛣️ Roadmap

### ✅ Phase MVP (LIVRÉE)
- [x] Backend API complet
- [x] WebSocket temps réel
- [x] Base de données + migrations
- [x] Auth JWT
- [x] Dispatch/matching
- [x] Pricing
- [x] Paiement simulé
- [x] i18n FR/EN
- [x] Types partagés

### ⏳ Phase 2 (À compléter)
- [ ] Frontends React complets
- [ ] PWA (service workers)
- [ ] Tests unitaires et E2E
- [ ] Déploiement production

### 🔮 Phase 3 (Futur)
- [ ] Stripe/Twint réels
- [ ] Google Maps API
- [ ] Surge pricing
- [ ] Multi-arrêts
- [ ] Chat rider ↔ driver
- [ ] Notations/avis

---

## 📞 Support

Pour toute question :
- Email : contact@romuo-vtc.ch
- Documentation : `/docs/`
- Issues GitHub : (à configurer)

---

## 📄 Licence

MIT © 2026 ROMUO VTC

---

**🎉 Le backend est 100% fonctionnel et prêt à être utilisé !**

Vous pouvez démarrer immédiatement avec les API et développer les frontends à votre rythme.
