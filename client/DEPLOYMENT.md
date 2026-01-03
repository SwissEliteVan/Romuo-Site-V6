# Guide de Déploiement - ROMUO VTC

Ce guide explique comment déployer le site vitrine ROMUO VTC sur différentes plateformes d'hébergement.

## 📋 Pré-requis

Avant de déployer, assurez-vous d'avoir :

- [ ] Node.js 18+ installé
- [ ] Clé API TomTom configurée
- [ ] Icônes PWA générées (8 tailles)
- [ ] Informations légales complétées
- [ ] Build testé localement (`npm run build && npm run preview`)

## 🚀 Déploiement sur Netlify (Recommandé)

Netlify offre une intégration parfaite avec les fichiers `_headers` et `_redirects`.

### Option 1 : Déploiement via Git

1. **Connecter le repository GitHub**
   ```bash
   # Si pas déjà fait, pusher sur GitHub
   git remote add origin https://github.com/votre-compte/romuo-site.git
   git push -u origin main
   ```

2. **Configurer sur Netlify**
   - Aller sur [netlify.com](https://netlify.com)
   - "Add new site" > "Import an existing project"
   - Choisir GitHub et sélectionner le repository
   - **Build settings:**
     - Build command: `npm run build`
     - Publish directory: `client/dist`
     - Base directory: `client`

3. **Variables d'environnement**
   - Aller dans "Site settings" > "Environment variables"
   - Ajouter :
     ```
     VITE_TOMTOM_API_KEY=votre_clé_ici
     VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX (optionnel)
     ```

4. **Domaine personnalisé** (optionnel)
   - "Domain settings" > "Add custom domain"
   - Configurer `romuo-vtc.ch` et `www.romuo-vtc.ch`
   - Netlify générera automatiquement le certificat SSL

### Option 2 : Déploiement via CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Build le projet
cd client
npm run build

# Login
netlify login

# Déployer
netlify deploy --prod --dir=dist
```

## 🌐 Déploiement sur Vercel

Vercel utilise le fichier `vercel.json` fourni.

### Via interface web

1. Aller sur [vercel.com](https://vercel.com)
2. "Add New" > "Project"
3. Importer le repository Git
4. **Settings:**
   - Framework Preset: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Environment Variables:**
   ```
   VITE_TOMTOM_API_KEY=votre_clé
   VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX (optionnel)
   ```

### Via CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
cd client
vercel --prod
```

## 🏠 Déploiement sur Hostinger

### Via cPanel (Hébergement partagé)

1. **Build en local**
   ```bash
   cd client
   npm run build
   ```

2. **Upload via FTP**
   - Connecter au FTP Hostinger
   - Uploader le contenu de `dist/` dans `public_html/`

3. **Fichier .htaccess** (créer à la racine)
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     
     # HTTPS redirect
     RewriteCond %{HTTPS} off
     RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
     
     # SPA routing
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>

   # Security headers
   <IfModule mod_headers.c>
     Header set X-Frame-Options "DENY"
     Header set X-Content-Type-Options "nosniff"
     Header set X-XSS-Protection "1; mode=block"
   </IfModule>

   # Cache
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType image/png "access plus 1 year"
     ExpiresByType image/svg+xml "access plus 1 year"
     ExpiresByType text/css "access plus 1 year"
     ExpiresByType application/javascript "access plus 1 year"
   </IfModule>
   ```

4. **Variables d'environnement**
   - Créer `config.js` dans `public_html/`
   ```javascript
   window.ENV = {
     VITE_TOMTOM_API_KEY: 'votre_clé'
   };
   ```
   - Charger avant le script principal dans `index.html`

## 🐳 Déploiement avec Docker

### Créer le Dockerfile

```dockerfile
# client/Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Configuration Nginx

```nginx
# client/nginx.conf
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Build et run

```bash
cd client
docker build -t romuo-vtc .
docker run -p 80:80 romuo-vtc
```

## 📊 Post-Déploiement

### Vérifications essentielles

- [ ] Site accessible sur HTTPS
- [ ] Redirections www → non-www fonctionnent
- [ ] PWA installable (tester sur mobile)
- [ ] Bannière cookies s'affiche
- [ ] Calculateur TomTom fonctionne
- [ ] Toutes les pages se chargent
- [ ] Formulaire de contact envoie (si configuré)

### Tests de performance

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://romuo-vtc.ch --view

# Objectifs :
# Performance: 90+
# Accessibility: 90+
# Best Practices: 90+
# SEO: 90+
```

### Google Search Console

1. Ajouter la propriété sur [search.google.com/search-console](https://search.google.com/search-console)
2. Vérifier la propriété (balise meta ou DNS)
3. Soumettre le sitemap : `https://romuo-vtc.ch/sitemap.xml`

### Google Analytics 4 (optionnel)

Si vous utilisez GA4, vérifier que :
- Le consentement cookies fonctionne
- Les événements sont trackés
- Les pages vues sont enregistrées

## 🔧 Dépannage

### Le site ne se charge pas après déploiement

- Vérifier que `dist/index.html` existe
- Vérifier les chemins des assets (doivent être absolus : `/assets/...`)
- Vérifier les variables d'environnement

### Les routes 404

- Vérifier `_redirects` (Netlify) ou `vercel.json` (Vercel)
- Pour Apache : vérifier `.htaccess`
- Pour Nginx : vérifier `try_files`

### PWA ne s'installe pas

- Vérifier que `manifest.json` est accessible
- Vérifier que les icônes existent (toutes les 8 tailles)
- Tester avec Chrome DevTools > Application > Manifest

### Erreurs TomTom API

- Vérifier que la clé API est bien configurée
- Vérifier les restrictions de domaine sur TomTom Developer
- Tester en mode développement d'abord

## 📞 Support

Pour toute question sur le déploiement :
- Email : contact@romuo-vtc.ch
- Téléphone : 076 084 20 89

---

**Dernière mise à jour :** Janvier 2026  
**Version :** 1.0.0
