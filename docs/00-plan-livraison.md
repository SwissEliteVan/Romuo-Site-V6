# PLAN DE LIVRAISON - MVP VTC ROMUO

## OBJECTIF
Livrer un MVP fonctionnel d'application VTC (type Uber) avec :
- App Passager (PWA, FR/EN)
- App Chauffeur (PWA, FR/EN)
- Back-office Admin
- Backend temps réel (WebSocket)
- Cycle complet : demande → acceptation → course → paiement

---

## CHECKLIST DE LIVRAISON

### ✅ PHASE 1 : STRUCTURE & CONFIGURATION
- [ ] Monorepo configuré (workspaces)
- [ ] TypeScript configuré (shared config)
- [ ] Fichier de configuration partagée (tarifs, paramètres)
- [ ] Arborescence complète créée
- [ ] Variables d'environnement (.env.example)

### ✅ PHASE 2 : BASE DE DONNÉES
- [ ] Schéma Prisma défini (users, rides, vehicles, payments)
- [ ] Migrations créées
- [ ] Seeds de données de test (1 admin, 2 chauffeurs, 2 passagers)

### ✅ PHASE 3 : BACKEND
- [ ] API REST (Express + TypeScript)
- [ ] Auth JWT (login/register)
- [ ] WebSocket server (positions + notifications)
- [ ] Endpoints Passager (/rides/estimate, /rides/request, /rides/cancel)
- [ ] Endpoints Chauffeur (/driver/online, /driver/location, /driver/offers/:id/accept)
- [ ] Endpoints Admin (/admin/rides, /admin/drivers, /admin/pricing)
- [ ] Moteur de dispatch (matching + timeout)
- [ ] Moteur de pricing (distance + durée)
- [ ] Rate limiting basique
- [ ] Logs structurés
- [ ] Endpoint /health

### ✅ PHASE 4 : PACKAGES PARTAGÉS
- [ ] Types TypeScript partagés (User, Ride, RideStatus, etc.)
- [ ] Helpers partagés (formatPrice, calculateDistance, etc.)
- [ ] Configuration i18n (FR/EN)
- [ ] Fichiers de traduction (fr.json, en.json)

### ✅ PHASE 5 : APP PASSAGER (PWA)
- [ ] Setup Vite + React + TypeScript
- [ ] PWA configuré (manifest, service worker)
- [ ] i18n intégré (FR/EN + switch langue)
- [ ] Page Login/Register
- [ ] Page Home (carte + saisie trajet)
- [ ] Page Estimation (prix + ETA)
- [ ] Page Course Active (suivi temps réel)
- [ ] Page Historique
- [ ] WebSocket client (positions chauffeur)
- [ ] Gestion offline (fallback screen)
- [ ] Mobile-first responsive

### ✅ PHASE 6 : APP CHAUFFEUR (PWA)
- [ ] Setup Vite + React + TypeScript
- [ ] PWA configuré (manifest, service worker)
- [ ] i18n intégré (FR/EN + switch langue)
- [ ] Page Login
- [ ] Toggle Online/Offline
- [ ] Page Offres (réception + timer)
- [ ] Page Course Active (mise à jour statut)
- [ ] Envoi position GPS périodique
- [ ] Page Historique + gains
- [ ] WebSocket client (offres + notifications)
- [ ] Gestion offline

### ✅ PHASE 7 : BACK-OFFICE ADMIN
- [ ] Setup Vite + React + TypeScript
- [ ] i18n intégré (FR par défaut)
- [ ] Dashboard (courses du jour)
- [ ] Gestion chauffeurs (activer/désactiver)
- [ ] Gestion véhicules
- [ ] Paramètres pricing (base, /km, /min)
- [ ] Tableau de bord temps réel (WebSocket)

### ✅ PHASE 8 : DOCUMENTATION
- [ ] docs/01-demarrage-local.md (commandes copier/coller)
- [ ] docs/02-deploiement.md (static + Node server)
- [ ] docs/03-guide-utilisation.md (scénarios utilisateurs)
- [ ] docs/04-troubleshooting.md (offline, WS, DB, build, 403)
- [ ] docs/05-api-spec.md (tous les endpoints)
- [ ] README.md racine (vue d'ensemble)

### ✅ PHASE 9 : TESTS & VALIDATION
- [ ] Test manuel : Passager demande course
- [ ] Test manuel : Chauffeur accepte course
- [ ] Test manuel : Course en_route → arrived → in_trip → completed
- [ ] Test manuel : Annulation
- [ ] Test manuel : Switch langue FR/EN
- [ ] Test manuel : Mode offline
- [ ] Tests unitaires : moteur pricing
- [ ] Tests unitaires : dispatch logic

### ✅ PHASE 10 : DÉPLOIEMENT
- [ ] Build production (tous les frontends)
- [ ] Configuration déploiement static
- [ ] Configuration déploiement Node
- [ ] Vérification variables d'environnement
- [ ] Checklist pré-déploiement

---

## HYPOTHÈSES CONFIGURABLES

Tous les paramètres ci-dessous sont configurables via `/packages/shared/src/config.ts` :

### PRICING (Tarification)
- `BASE_FARE` : 3.50 CHF (frais de base)
- `PRICE_PER_KM` : 2.80 CHF/km
- `PRICE_PER_MINUTE` : 0.60 CHF/min
- `MIN_FARE` : 8.00 CHF (course minimale)

### DISPATCH (Matching)
- `OFFER_TIMEOUT` : 15 secondes (temps pour accepter une offre)
- `MAX_SEARCH_RADIUS` : 5 km (rayon de recherche chauffeurs)
- `MAX_DRIVERS_TO_NOTIFY` : 5 (nombre max de chauffeurs notifiés séquentiellement)

### TEMPS RÉEL
- `DRIVER_LOCATION_INTERVAL` : 5 secondes (fréquence envoi position)
- `RIDER_POSITION_UPDATE_INTERVAL` : 3 secondes (fréquence refresh position chauffeur côté passager)

### i18n (Langues)
- Langues supportées : `['fr', 'en']`
- Langue par défaut : `fr`
- Détection : navigateur → fallback `fr`
- Extensible : ajouter `de.json`, `it.json` plus tard

### PAIEMENT
- Mode : `SIMULATED` (MVP)
- PSP ready : structure prête pour Stripe/Adyen
- Pas de stockage carte bancaire

### SÉCURITÉ
- JWT expiration : 1h (access) / 7 jours (refresh)
- Rate limiting : 100 requêtes/min par IP
- CORS : configuré pour les 3 frontends

---

## ARBORESCENCE PROJET

```
romuo-vtc-mvp/
├── apps/
│   ├── rider/                  # App Passager (PWA)
│   │   ├── public/
│   │   │   ├── icons/         # PWA icons
│   │   │   └── manifest.json
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   ├── services/      # API client, WebSocket
│   │   │   ├── i18n/          # i18n config
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   └── sw.ts          # Service Worker
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── driver/                # App Chauffeur (PWA)
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── i18n/
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   └── sw.ts
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── admin/                 # Back-office Admin
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── services/
│       │   ├── i18n/
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── index.html
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── package.json
│
├── server/                    # Backend API + WebSocket
│   ├── src/
│   │   ├── routes/           # Routes Express
│   │   │   ├── auth.ts
│   │   │   ├── rides.ts
│   │   │   ├── driver.ts
│   │   │   └── admin.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── ride.service.ts
│   │   │   ├── dispatch.service.ts
│   │   │   ├── pricing.service.ts
│   │   │   └── payment.service.ts
│   │   ├── websocket/
│   │   │   ├── server.ts
│   │   │   └── handlers.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   └── rateLimit.middleware.ts
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   └── errors.ts
│   │   ├── index.ts
│   │   └── app.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
├── packages/
│   └── shared/               # Types et helpers partagés
│       ├── src/
│       │   ├── types/
│       │   │   ├── user.ts
│       │   │   ├── ride.ts
│       │   │   ├── vehicle.ts
│       │   │   └── index.ts
│       │   ├── config.ts     # ⭐ PARAMÈTRES CONFIGURABLES
│       │   ├── constants.ts
│       │   ├── utils/
│       │   │   ├── pricing.ts
│       │   │   ├── distance.ts
│       │   │   └── validation.ts
│       │   └── i18n/
│       │       ├── locales/
│       │       │   ├── fr.json
│       │       │   └── en.json
│       │       └── index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── docs/                     # Documentation
│   ├── 00-plan-livraison.md (ce fichier)
│   ├── 01-demarrage-local.md
│   ├── 02-deploiement.md
│   ├── 03-guide-utilisation.md
│   ├── 04-troubleshooting.md
│   └── 05-api-spec.md
│
├── .gitignore
├── package.json              # Racine (workspaces)
├── tsconfig.json             # Config TS partagée
└── README.md
```

---

## MODÈLE DE DONNÉES (Prisma)

### Tables principales

**users**
- id, email, password_hash, role (rider/driver/admin)
- first_name, last_name, phone, locale (fr/en)
- created_at, updated_at

**driver_profiles**
- id, user_id (FK)
- license_number, vehicle_id (FK)
- is_online, is_approved
- last_location (lat, lng), last_location_updated_at
- rating, total_trips

**vehicles**
- id, driver_id (FK)
- make, model, year, color, license_plate
- capacity, vehicle_type (standard/premium)

**rides**
- id, rider_id (FK), driver_id (FK nullable)
- status (requested/offered/accepted/en_route/arrived/in_trip/completed/canceled)
- pickup_address, pickup_lat, pickup_lng
- dropoff_address, dropoff_lat, dropoff_lng
- estimated_distance_km, estimated_duration_min
- estimated_price, final_price
- requested_at, accepted_at, started_at, completed_at, canceled_at
- cancellation_reason

**ride_events** (audit trail)
- id, ride_id (FK)
- event_type (status_changed/driver_assigned/location_updated)
- metadata (JSON)
- created_at

**payments**
- id, ride_id (FK)
- amount, currency (CHF)
- status (pending/completed/failed)
- payment_method (simulated/stripe)
- transaction_id
- created_at

---

## API ENDPOINTS (Résumé)

### Auth
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion (retourne JWT)
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Profil utilisateur

### Rider
- `POST /api/rides/estimate` - Estimation prix/durée
- `POST /api/rides/request` - Demander une course
- `GET /api/rides/active` - Course active
- `POST /api/rides/:id/cancel` - Annuler
- `GET /api/rides/history` - Historique

### Driver
- `POST /api/driver/online` - Passer en ligne
- `POST /api/driver/offline` - Passer hors ligne
- `POST /api/driver/location` - Mettre à jour position
- `GET /api/driver/offers` - Offres en attente
- `POST /api/driver/offers/:id/accept` - Accepter offre
- `POST /api/driver/offers/:id/reject` - Refuser offre
- `POST /api/rides/:id/status` - Mettre à jour statut course
- `GET /api/driver/history` - Historique + gains

### Admin
- `GET /api/admin/rides` - Toutes les courses
- `GET /api/admin/drivers` - Tous les chauffeurs
- `PATCH /api/admin/drivers/:id` - Activer/désactiver chauffeur
- `GET /api/admin/pricing` - Paramètres tarifs
- `PATCH /api/admin/pricing` - Mettre à jour tarifs
- `GET /api/admin/stats` - Statistiques

### Health
- `GET /api/health` - État du serveur

---

## WORKFLOW DISPATCH (Matching)

```
1. Rider demande course
   ↓
2. Backend calcule estimation (prix, durée)
   ↓
3. Création ride (status: requested)
   ↓
4. Recherche chauffeurs online dans rayon MAX_SEARCH_RADIUS
   ↓
5. Tri par distance (Haversine)
   ↓
6. Envoi offre au chauffeur #1 via WebSocket
   ↓
7. Timer OFFER_TIMEOUT (15s)
   ↓
   ├─ Accepté → ride.status = accepted
   │            → Notifier rider via WS
   │            → FIN
   │
   └─ Timeout/Refusé → Offre au chauffeur #2
                      → Répéter jusqu'à MAX_DRIVERS_TO_NOTIFY
                      → Si aucun accepte → ride.status = no_driver_available
```

---

## CYCLE DE VIE D'UNE COURSE

```
requested → offered → accepted → en_route → arrived → in_trip → completed
                                                              └→ canceled
```

**Actions par statut :**
- `requested` : Rider vient de demander
- `offered` : Offre envoyée à un chauffeur (en attente)
- `accepted` : Chauffeur a accepté
- `en_route` : Chauffeur se dirige vers pickup
- `arrived` : Chauffeur arrivé au pickup
- `in_trip` : Course en cours (passager à bord)
- `completed` : Course terminée (paiement effectué)
- `canceled` : Annulée (par rider ou driver)

---

## SÉCURITÉ MINIMALE

✅ **Auth** : JWT (httpOnly cookies ou Authorization header)
✅ **Validation** : Joi/Zod pour tous les inputs
✅ **Rate Limiting** : express-rate-limit (100 req/min)
✅ **Logs** : Winston (structuré JSON)
✅ **Secrets** : `.env` (jamais committé)
✅ **CORS** : Whitelist frontends
✅ **SQL Injection** : Prisma (ORM sécurisé)

---

## DÉPLOIEMENT

### MODE A : Static Build
- Build des 3 frontends en static
- Héberger sur Hostinger/Netlify/Vercel
- Backend séparé (Railway/Render/Heroku)

### MODE B : Node Server
- Backend serve les frontends statiques
- 1 seul serveur Node.js
- Nécessite Node.js sur l'hébergeur

**Checklist déploiement :**
- [ ] Variables d'env configurées
- [ ] DB migrée
- [ ] Seeds exécutés (users de test)
- [ ] CORS configuré (domaines prod)
- [ ] WebSocket configuré (wss://)
- [ ] Health check OK

---

## TESTS MANUELS (Scénario)

### Scénario 1 : Course complète
1. **Rider** : Inscription → Login
2. **Rider** : Saisir départ/arrivée → Voir estimation
3. **Rider** : Demander course
4. **Driver** : Login → Passer en ligne
5. **Driver** : Recevoir offre (notification WS)
6. **Driver** : Accepter offre
7. **Rider** : Voir chauffeur assigné + position temps réel
8. **Driver** : Statut "en route" → "arrivé" → "en course"
9. **Driver** : Terminer course
10. **Rider** : Voir reçu + paiement simulé

### Scénario 2 : Annulation
1. **Rider** : Demander course
2. **Rider** : Annuler avant acceptation
3. **Vérifier** : ride.status = canceled

### Scénario 3 : Multilingue
1. **Rider** : Switch FR → EN
2. **Vérifier** : Tous les textes changent
3. **Vérifier** : Langue persistée (rechargement page)

---

## PHASE 2 (Hors scope MVP)

- Surge pricing dynamique
- Multi-arrêts
- Matching ML/scoring avancé
- Payouts chauffeurs (Stripe Connect)
- KYC/vérification documents
- Chat rider ↔ driver
- Notations/avis
- Promo codes
- Support client intégré

---

**FIN DU PLAN DE LIVRAISON**
