# 04 - Troubleshooting (Résolution de problèmes)

## 🔧 Problèmes courants

### Backend

#### ❌ Erreur "Port 4000 already in use"

**Cause** : Un autre processus utilise le port 4000.

**Solution** :

```bash
# Trouver le processus qui utilise le port
lsof -i :4000

# Tuer le processus
kill -9 <PID>

# OU changer le port dans .env
PORT=4001
```

#### ❌ Erreur "Prisma Client not generated"

**Cause** : Le client Prisma n'a pas été généré.

**Solution** :

```bash
cd server-vtc
npm run db:generate
```

#### ❌ Erreur "Can't connect to database"

**Cause** : PostgreSQL n'est pas démarré ou l'URL de connexion est incorrecte.

**Solutions** :

1. **Vérifier que PostgreSQL est démarré**

```bash
# macOS
brew services list
brew services start postgresql

# Linux
systemctl status postgresql
sudo systemctl start postgresql

# Windows
# Services → PostgreSQL → Démarrer
```

2. **Vérifier l'URL de connexion**

```bash
# Tester la connexion
psql postgresql://user:password@localhost:5432/romuo_vtc

# Vérifier que la DB existe
psql -U postgres -l
```

3. **Recréer la base de données**

```bash
psql -U postgres

DROP DATABASE IF EXISTS romuo_vtc;
CREATE DATABASE romuo_vtc;
\q

cd server-vtc
npm run db:migrate
npm run db:seed
```

#### ❌ Erreur "JWT_SECRET is not defined"

**Cause** : Le fichier `.env` n'existe pas ou est mal configuré.

**Solution** :

```bash
cd server-vtc

# Vérifier que .env existe
ls -la .env

# Si non, le créer
cp .env.example .env

# Éditer .env et ajouter
JWT_SECRET=votre-secret-jwt-super-securise
JWT_REFRESH_SECRET=votre-secret-refresh-super-securise
```

#### ❌ Erreur "CORS policy: No 'Access-Control-Allow-Origin'"

**Cause** : L'origine du frontend n'est pas autorisée.

**Solution** :

Ajouter l'URL du frontend dans `.env` :

```env
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002,https://votredomaine.com
```

Redémarrer le serveur.

#### ❌ Erreur "Module not found"

**Cause** : Les dépendances ne sont pas installées.

**Solution** :

```bash
cd server-vtc
rm -rf node_modules package-lock.json
npm install
```

#### ❌ Les logs ne s'affichent pas

**Cause** : Le dossier `logs/` n'existe pas.

**Solution** :

```bash
cd server-vtc
mkdir -p logs
```

---

### WebSocket

#### ❌ WebSocket ne se connecte pas

**Cause** : Token invalide ou serveur WebSocket non démarré.

**Solutions** :

1. **Vérifier que le serveur est démarré**

```bash
curl http://localhost:4000/api/health
```

2. **Vérifier le token**

```javascript
// Le token doit être un accessToken valide
const ws = new WebSocket(`ws://localhost:4000/ws?token=${validAccessToken}`);
```

3. **Vérifier les logs serveur**

```bash
cd server-vtc
tail -f logs/combined.log
```

#### ❌ WebSocket se déconnecte tout le temps

**Cause** : Pas de keep-alive ou token expiré.

**Solution** :

Le serveur envoie automatiquement des ping toutes les 30s. Vérifiez que le client répond aux pongs.

```javascript
ws.addEventListener('ping', () => {
  ws.pong();
});
```

Si le token expire, reconnectez-vous avec un nouveau token.

---

### Database

#### ❌ Erreur "Migration failed"

**Cause** : Schéma de DB incohérent.

**Solution** :

```bash
cd server-vtc

# Reset complet (⚠️ SUPPRIME TOUTES LES DONNÉES)
npm run db:reset

# OU forcer la migration
npx prisma migrate reset --force
npx prisma migrate dev
```

#### ❌ Erreur "Unique constraint failed"

**Cause** : Tentative de créer un enregistrement avec une valeur unique déjà existante (ex: email).

**Solution** :

Vérifiez que l'email n'existe pas déjà :

```bash
npx prisma studio
# Chercher l'utilisateur dans la table `users`
```

Ou utilisez un autre email.

#### ❌ Prisma Studio ne démarre pas

**Cause** : Port 5555 déjà utilisé.

**Solution** :

```bash
# Tuer le processus
lsof -i :5555
kill -9 <PID>

# Redémarrer Prisma Studio
npm run db:studio
```

---

### Build & Deploy

#### ❌ Erreur "Cannot find module '@romuo-vtc/shared'"

**Cause** : Le package shared n'est pas compilé.

**Solution** :

```bash
cd packages/shared
npm install
npm run build
```

#### ❌ Erreur TypeScript lors du build

**Cause** : Erreurs de types.

**Solution** :

```bash
cd server-vtc
npm run typecheck

# Corriger les erreurs affichées
```

#### ❌ Le serveur ne démarre pas en production

**Cause** : Variables d'environnement manquantes.

**Solution** :

1. **Vérifier que .env existe**

```bash
ls -la .env
```

2. **Vérifier que toutes les variables sont définies**

```bash
cat .env
```

Minimum requis :
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `CORS_ORIGINS`

3. **Vérifier les logs**

```bash
tail -f logs/error.log
```

---

### Performance

#### ❌ Les requêtes sont lentes

**Causes possibles** :
- Base de données non optimisée
- Trop de requêtes simultanées
- Pas d'index sur les colonnes

**Solutions** :

1. **Vérifier les index Prisma**

Le schema Prisma contient déjà les index nécessaires :

```prisma
@@index([riderId, status])
@@index([driverId, status])
```

2. **Analyser les requêtes lentes**

Activer les logs Prisma :

```typescript
// Dans server-vtc/src/services/*.service.ts
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

3. **Augmenter les ressources du serveur**

---

### Dispatch & Matching

#### ❌ Aucun chauffeur ne reçoit l'offre

**Causes possibles** :
- Aucun chauffeur en ligne
- Aucun chauffeur approuvé
- Chauffeurs trop loin (> 5km)

**Solutions** :

1. **Vérifier qu'un chauffeur est en ligne**

```bash
curl -X POST http://localhost:4000/api/driver/online \
  -H "Authorization: Bearer <DRIVER_TOKEN>"
```

2. **Vérifier que le chauffeur est approuvé**

Via Prisma Studio ou :

```bash
curl -X GET http://localhost:4000/api/admin/drivers \
  -H "Authorization: Bearer <ADMIN_TOKEN>"

# Approuver si nécessaire
curl -X PATCH http://localhost:4000/api/admin/drivers/<DRIVER_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  -d '{"isApproved": true}'
```

3. **Mettre à jour la position du chauffeur**

```bash
curl -X POST http://localhost:4000/api/driver/location \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <DRIVER_TOKEN>" \
  -d '{
    "lat": 46.2044,
    "lng": 6.1432
  }'
```

4. **Augmenter le rayon de recherche** (si nécessaire)

Dans `/packages/shared/src/config.ts` :

```typescript
MAX_SEARCH_RADIUS_KM: 10, // Au lieu de 5
```

Rebuild le package et redémarrer.

#### ❌ L'offre expire trop vite

**Cause** : Timeout trop court (15s par défaut).

**Solution** :

Modifier dans `/packages/shared/src/config.ts` :

```typescript
OFFER_TIMEOUT_SECONDS: 30, // Au lieu de 15
```

Rebuild et redémarrer.

---

### Authentification

#### ❌ Token expiré

**Cause** : L'access token a expiré (1h).

**Solution** :

Utiliser le refresh token :

```bash
curl -X POST http://localhost:4000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "<REFRESH_TOKEN>"
  }'
```

#### ❌ "Invalid credentials"

**Causes possibles** :
- Email ou mot de passe incorrect
- Utilisateur n'existe pas

**Solutions** :

1. **Vérifier les comptes de test**

```bash
cd server-vtc
npm run db:seed
```

Comptes créés :
- `admin@romuo-vtc.ch` / `password123`
- `driver1@romuo-vtc.ch` / `password123`
- `rider1@example.com` / `password123`

2. **Créer un nouveau compte**

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "firstName": "New",
    "lastName": "User",
    "phone": "+41761111111",
    "role": "rider",
    "locale": "fr"
  }'
```

---

### i18n

#### ❌ Les traductions ne s'affichent pas

**Cause** : Le package shared n'est pas à jour.

**Solution** :

```bash
cd packages/shared
npm run build
```

Redémarrer le frontend.

#### ❌ Ajouter une nouvelle langue

1. **Créer le fichier de traduction**

```bash
cd packages/shared/src/i18n/locales
cp fr.json de.json
```

2. **Traduire le contenu**

Ouvrir `de.json` et traduire toutes les clés.

3. **Ajouter la locale dans la config**

`/packages/shared/src/config.ts` :

```typescript
SUPPORTED_LOCALES: ['fr', 'en', 'de'],
```

4. **Importer dans i18n/index.ts**

```typescript
import de from './locales/de.json';

export const translations = {
  fr,
  en,
  de,
};
```

5. **Rebuild**

```bash
cd packages/shared
npm run build
```

---

## 📋 Checklist de diagnostic

Quand quelque chose ne fonctionne pas :

- [ ] Le serveur est démarré (`curl http://localhost:4000/api/health`)
- [ ] La base de données est accessible (`psql <DATABASE_URL>`)
- [ ] Les migrations sont appliquées (`npm run db:migrate`)
- [ ] Le package shared est compilé (`cd packages/shared && npm run build`)
- [ ] Les variables d'environnement sont correctes (`cat .env`)
- [ ] Les logs ne montrent pas d'erreurs (`tail -f logs/error.log`)
- [ ] Le token JWT est valide (pas expiré)
- [ ] CORS est configuré correctement

---

## 🆘 Obtenir de l'aide

Si le problème persiste :

1. **Consulter les logs**

```bash
cd server-vtc
tail -f logs/combined.log
tail -f logs/error.log
```

2. **Activer le debug**

`.env` :

```env
LOG_LEVEL=debug
```

3. **Tester avec Postman/Insomnia**

Importer la collection d'API et tester les endpoints.

4. **Reset complet**

```bash
cd server-vtc
npm run db:reset
npm run db:seed
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

**🔧 La plupart des problèmes sont résolus en redémarrant le serveur ou en rebuil dant le package shared !**
