# 01 - Démarrage Local

## Prérequis

- Node.js 18+ ou 20 LTS
- npm ou pnpm
- PostgreSQL 14+ (ou SQLite pour développement)
- Git

---

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/SwissEliteVan/Romuo-Site-V6.git
cd Romuo-Site-V6
```

### 2. Installer les dépendances du backend

```bash
cd server-vtc
npm install
```

### 3. Installer le package shared

```bash
cd ../packages/shared
npm install
npm run build
```

---

## Configuration de la base de données

### Option A : PostgreSQL (Recommandé pour production)

1. **Installer PostgreSQL** (si pas déjà installé)

```bash
# macOS (Homebrew)
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Télécharger depuis https://www.postgresql.org/download/windows/
```

2. **Créer la base de données**

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE romuo_vtc;

# Créer un utilisateur (optionnel)
CREATE USER romuo_user WITH PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE romuo_vtc TO romuo_user;

# Quitter
\q
```

3. **Configurer l'URL de connexion**

Créez `.env` dans `server-vtc/` :

```env
DATABASE_URL="postgresql://romuo_user:votre_mot_de_passe@localhost:5432/romuo_vtc?schema=public"
```

### Option B : SQLite (Développement rapide)

1. **Configurer l'URL de connexion**

Créez `.env` dans `server-vtc/` :

```env
DATABASE_URL="file:./dev.db"
```

SQLite ne nécessite aucune installation supplémentaire.

---

## Configuration du serveur

### 1. Créer le fichier .env

```bash
cd server-vtc
cp .env.example .env
```

### 2. Éditer le fichier .env

```env
# Node Environment
NODE_ENV=development

# Server
PORT=4000
HOST=0.0.0.0

# Database
DATABASE_URL="postgresql://romuo_user:password@localhost:5432/romuo_vtc"
# OU SQLite :
# DATABASE_URL="file:./dev.db"

# JWT Secret (CHANGEZ CES VALEURS !)
JWT_SECRET=super-secret-jwt-key-changez-moi-123456
JWT_REFRESH_SECRET=super-secret-refresh-key-changez-moi-789012

# CORS (URLs des frontends)
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002

# Frontend URLs
RIDER_APP_URL=http://localhost:3000
DRIVER_APP_URL=http://localhost:3001
ADMIN_APP_URL=http://localhost:3002

# Logging
LOG_LEVEL=info
```

⚠️ **IMPORTANT** : Générez des secrets JWT forts pour la production !

```bash
# Générer un secret aléatoire
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## Initialiser la base de données

```bash
cd server-vtc

# 1. Générer le client Prisma
npm run db:generate

# 2. Créer les tables (migration)
npm run db:migrate

# 3. Insérer les données de test
npm run db:seed
```

Vous devriez voir :

```
✅ Admin créé: admin@romuo-vtc.ch
✅ Chauffeur 1 créé: driver1@romuo-vtc.ch - Véhicule: GE-123456
✅ Chauffeur 2 créé: driver2@romuo-vtc.ch - Véhicule: VD-654321
✅ Passager 1 créé: rider1@example.com
✅ Passager 2 créé: rider2@example.com
✅ Course complétée créée (historique)
🎉 Seeding terminé !

📝 Comptes de test :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Admin:      admin@romuo-vtc.ch / password123
Chauffeur 1: driver1@romuo-vtc.ch / password123
Chauffeur 2: driver2@romuo-vtc.ch / password123
Passager 1:  rider1@example.com / password123
Passager 2:  rider2@example.com / password123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Démarrer le serveur

```bash
cd server-vtc
npm run dev
```

Vous devriez voir :

```
🚀 Server started
📍 HTTP: http://0.0.0.0:4000
🔌 WebSocket: ws://0.0.0.0:4000/ws
🌍 Environment: development
📊 Health check: http://0.0.0.0:4000/api/health
```

---

## Tester l'API

### 1. Health check

```bash
curl http://localhost:4000/api/health
```

Réponse attendue :

```json
{
  "status": "ok",
  "timestamp": "2026-01-03T10:00:00.000Z",
  "version": "1.0.0",
  "uptime": 15.234
}
```

### 2. Connexion passager

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rider1@example.com",
    "password": "password123"
  }'
```

Réponse attendue :

```json
{
  "user": {
    "id": "clxxx...",
    "email": "rider1@example.com",
    "role": "rider",
    "firstName": "Pierre",
    "lastName": "Dubois",
    "phone": "+41761234570",
    "locale": "fr"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Demander une estimation de prix

```bash
# Remplacez <TOKEN> par l'accessToken reçu ci-dessus
curl -X POST http://localhost:4000/api/rides/estimate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "pickupLat": 46.2044,
    "pickupLng": 6.1432,
    "dropoffLat": 46.5197,
    "dropoffLng": 6.6323
  }'
```

Réponse attendue :

```json
{
  "distanceKm": 48.3,
  "durationMin": 72,
  "price": 181.90,
  "currency": "CHF"
}
```

---

## Outils utiles

### Prisma Studio (Interface DB graphique)

```bash
cd server-vtc
npm run db:studio
```

Ouvre une interface web sur http://localhost:5555 pour explorer la base de données.

### Logs en direct

```bash
cd server-vtc
tail -f logs/combined.log
```

### Reset de la base de données

```bash
cd server-vtc
npm run db:reset
```

⚠️ **Attention** : Cela supprime TOUTES les données et recrée la DB.

---

## Résolution de problèmes

### Erreur "Port 4000 already in use"

Un autre processus utilise le port 4000.

```bash
# Trouver le processus
lsof -i :4000

# Tuer le processus
kill -9 <PID>

# OU changer le port dans .env
PORT=4001
```

### Erreur "Prisma Client not generated"

```bash
cd server-vtc
npm run db:generate
```

### Erreur "Can't connect to database"

Vérifiez :
1. PostgreSQL est démarré : `brew services list` (macOS) ou `systemctl status postgresql` (Linux)
2. L'URL de connexion est correcte dans `.env`
3. La base de données existe : `psql -U postgres -l`

### Erreur "JWT_SECRET is not defined"

Vérifiez que le fichier `.env` existe dans `server-vtc/` et contient `JWT_SECRET`.

---

## Commandes utiles

```bash
# Backend
cd server-vtc

npm run dev          # Démarrer en mode développement
npm run build        # Build production
npm start            # Démarrer en mode production

npm run db:migrate   # Créer/appliquer les migrations
npm run db:seed      # Insérer les données de test
npm run db:studio    # Ouvrir Prisma Studio
npm run db:reset     # Reset complet de la DB

npm run typecheck    # Vérifier les types TypeScript

# Package shared
cd packages/shared

npm run build        # Compiler le package
npm run typecheck    # Vérifier les types
```

---

## Prochaines étapes

✅ Backend démarré et fonctionnel
➡️ Lire `/docs/03-guide-utilisation.md` pour les scénarios d'utilisation
➡️ Développer les frontends (voir `/VTC-MVP-README.md`)
➡️ Déployer en production (voir `/docs/02-deploiement.md`)

---

**🎉 Votre serveur backend est maintenant prêt !**
