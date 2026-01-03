# 02 - Déploiement

## 🚀 Options de déploiement

Ce guide couvre le déploiement du backend VTC en production.

---

## Option 1 : Hébergement Node.js complet (Recommandé)

Hébergeurs compatibles :
- **Railway** (Recommandé) - Simple, auto-détecte Node.js
- **Render** - Tier gratuit disponible
- **Heroku** - Classique et fiable
- **DigitalOcean App Platform**
- **AWS Elastic Beanstalk**
- **Google Cloud Run**

### Déploiement sur Railway

1. **Créer un compte** : https://railway.app

2. **Installer Railway CLI** (optionnel)

```bash
npm install -g @railway/cli
railway login
```

3. **Créer un nouveau projet**

Via l'interface web :
- New Project → Deploy from GitHub repo
- Sélectionner votre repo
- Root directory : `server-vtc`

4. **Configurer les variables d'environnement**

Dans Railway Dashboard → Variables :

```env
NODE_ENV=production
PORT=4000
DATABASE_URL=<URL_PostgreSQL_Railway>
JWT_SECRET=<générer_un_secret_fort>
JWT_REFRESH_SECRET=<générer_un_secret_fort>
CORS_ORIGINS=https://votredomaine.com,https://app.votredomaine.com
```

5. **Ajouter PostgreSQL**

- New → Database → PostgreSQL
- Railway fournira automatiquement `DATABASE_URL`

6. **Déployer**

Railway détecte automatiquement `package.json` et exécute :

```bash
npm install
npm run db:migrate:prod
npm run build
npm start
```

7. **Vérifier**

```bash
curl https://votre-app.railway.app/api/health
```

---

### Déploiement sur Render

1. **Créer un compte** : https://render.com

2. **Créer un nouveau Web Service**

- New → Web Service
- Connect GitHub repo
- Root directory : `server-vtc`
- Build command : `npm install && npm run db:generate && npm run build`
- Start command : `npm start`

3. **Ajouter PostgreSQL**

- New → PostgreSQL
- Copier l'URL interne (`DATABASE_URL`)

4. **Variables d'environnement**

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=<URL_PostgreSQL_Render>
JWT_SECRET=<secret>
JWT_REFRESH_SECRET=<secret>
CORS_ORIGINS=https://votredomaine.com
```

5. **Migrations**

Ajouter un "Build Event Hook" :

```bash
npm run db:migrate:prod
```

---

### Déploiement sur Heroku

1. **Installer Heroku CLI**

```bash
# macOS
brew install heroku/brew/heroku

# Autres OS
# https://devcenter.heroku.com/articles/heroku-cli
```

2. **Login**

```bash
heroku login
```

3. **Créer l'app**

```bash
cd server-vtc
heroku create romuo-vtc-api
```

4. **Ajouter PostgreSQL**

```bash
heroku addons:create heroku-postgresql:mini
```

5. **Configurer les variables**

```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=<secret>
heroku config:set JWT_REFRESH_SECRET=<secret>
heroku config:set CORS_ORIGINS=https://votredomaine.com
```

6. **Créer Procfile**

`server-vtc/Procfile` :

```
web: npm start
release: npm run db:migrate:prod
```

7. **Déployer**

```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

8. **Seed (optionnel)**

```bash
heroku run npm run db:seed
```

---

## Option 2 : VPS (Ubuntu/Debian)

Pour un contrôle total, déployer sur un VPS (DigitalOcean, Linode, Hetzner).

### 1. Prérequis sur le serveur

```bash
# SSH sur le serveur
ssh root@votre-ip

# Mettre à jour
apt update && apt upgrade -y

# Installer Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Installer PostgreSQL
apt install -y postgresql postgresql-contrib

# Installer PM2 (process manager)
npm install -g pm2

# Installer Nginx (reverse proxy)
apt install -y nginx
```

### 2. Configurer PostgreSQL

```bash
# Se connecter
sudo -u postgres psql

# Créer la base de données
CREATE DATABASE romuo_vtc;
CREATE USER romuo_user WITH PASSWORD 'mot_de_passe_fort';
GRANT ALL PRIVILEGES ON DATABASE romuo_vtc TO romuo_user;
\q
```

### 3. Cloner le projet

```bash
cd /var/www
git clone https://github.com/SwissEliteVan/Romuo-Site-V6.git
cd Romuo-Site-V6/server-vtc
```

### 4. Installer les dépendances

```bash
npm install --production
```

### 5. Configurer .env

```bash
nano .env
```

```env
NODE_ENV=production
PORT=4000
DATABASE_URL="postgresql://romuo_user:mot_de_passe_fort@localhost:5432/romuo_vtc"
JWT_SECRET=<générer_secret>
JWT_REFRESH_SECRET=<générer_secret>
CORS_ORIGINS=https://votredomaine.com
```

### 6. Migrations

```bash
npm run db:migrate:prod
npm run db:seed  # Optionnel
```

### 7. Build

```bash
npm run build
```

### 8. Démarrer avec PM2

```bash
pm2 start dist/index.js --name romuo-vtc-api

# Sauvegarder pour redémarrage auto
pm2 save
pm2 startup
```

### 9. Configurer Nginx (reverse proxy)

```bash
nano /etc/nginx/sites-available/romuo-vtc
```

```nginx
server {
    listen 80;
    server_name api.votredomaine.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket
    location /ws {
        proxy_pass http://localhost:4000/ws;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}
```

```bash
# Activer le site
ln -s /etc/nginx/sites-available/romuo-vtc /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 10. SSL avec Certbot

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d api.votredomaine.com
```

### 11. Vérifier

```bash
curl https://api.votredomaine.com/api/health
```

---

## Option 3 : Docker

### 1. Créer Dockerfile

`server-vtc/Dockerfile` :

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm ci --production

# Copier le code
COPY . .

# Build
RUN npm run db:generate
RUN npm run build

# Exposer le port
EXPOSE 4000

# Démarrer
CMD ["npm", "start"]
```

### 2. Créer docker-compose.yml

`server-vtc/docker-compose.yml` :

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "4000:4000"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://postgres:password@db:5432/romuo_vtc
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
    depends_on:
      - db

  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: romuo_vtc
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### 3. Déployer

```bash
docker-compose up -d

# Migrations
docker-compose exec api npm run db:migrate:prod

# Seed
docker-compose exec api npm run db:seed
```

---

## 📋 Checklist pré-déploiement

Avant de déployer en production :

- [ ] Générer des secrets JWT forts (64+ caractères)
- [ ] Configurer `CORS_ORIGINS` avec les vrais domaines
- [ ] Utiliser PostgreSQL (pas SQLite)
- [ ] Activer SSL/HTTPS
- [ ] Configurer les logs en production
- [ ] Tester les migrations
- [ ] Vérifier les variables d'environnement
- [ ] Sauvegarder la base de données
- [ ] Configurer un système de monitoring (Sentry, LogRocket)
- [ ] Tester le WebSocket en WSS (secure)

---

## 🔐 Sécurité en production

### Générer des secrets forts

```bash
# JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# JWT_REFRESH_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Variables d'environnement obligatoires

```env
NODE_ENV=production
DATABASE_URL=<URL_PostgreSQL>
JWT_SECRET=<64_caractères_minimum>
JWT_REFRESH_SECRET=<64_caractères_minimum>
CORS_ORIGINS=https://app.votredomaine.com,https://driver.votredomaine.com
```

### Recommandations

- **Ne jamais** commit `.env` dans Git
- Utiliser un gestionnaire de secrets (AWS Secrets Manager, Vault)
- Activer les backups automatiques de la DB
- Configurer des alertes (uptime monitoring)
- Rate limiting configuré (déjà actif dans le code)
- Logs structurés activés

---

## 📊 Monitoring

### Logs

Railway/Render/Heroku fournissent des logs en temps réel.

Pour un VPS :

```bash
# Logs PM2
pm2 logs romuo-vtc-api

# Logs Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Health Check

Configurer un uptime monitor (UptimeRobot, Pingdom) :

```
URL: https://api.votredomaine.com/api/health
Intervalle: 5 minutes
```

### Performance

Utiliser des outils comme :
- **New Relic** (APM)
- **Datadog** (Monitoring complet)
- **Sentry** (Error tracking)

---

## 🔄 CI/CD (Déploiement automatique)

### GitHub Actions

`.github/workflows/deploy.yml` :

```yaml
name: Deploy to Railway

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install Railway CLI
        run: npm install -g @railway/cli

      - name: Deploy
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 📦 Backup & Restore

### Backup PostgreSQL

```bash
# Via pg_dump
pg_dump -U romuo_user -h localhost romuo_vtc > backup.sql

# Via Heroku
heroku pg:backups:capture
heroku pg:backups:download
```

### Restore

```bash
psql -U romuo_user -h localhost romuo_vtc < backup.sql
```

---

## 🌐 Multi-région (Optionnel)

Pour une meilleure latence globale :

1. Déployer sur plusieurs régions (Europe, US, Asie)
2. Utiliser un load balancer global (Cloudflare, AWS CloudFront)
3. Synchroniser les bases de données (PostgreSQL replication)

---

**🎉 Votre backend est maintenant déployé en production !**
