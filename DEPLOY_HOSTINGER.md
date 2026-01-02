# Déploiement Hostinger (ROMUO VTC) — Méthode robuste « 3 fichiers »

Ce guide aligne le projet avec les contraintes Hostinger (Node.js + hPanel) et évite les erreurs fréquentes : page blanche, port forcé, build absent, scripts `pnpm` non supportés côté serveur.

## 1) La règle des 3 fichiers

Dans `public_html` du domaine (ou du sous-domaine) Hostinger, vous devez avoir exactement :

1) `package.json` (dépendances serveur uniquement)
2) `server.js` (startup file Hostinger)
3) `dist/` (le site généré + le serveur compilé)

Concrètement, le serveur doit pouvoir trouver :
- `public_html/dist/public/index.html`
- `public_html/dist/server/index.js`

## 2) Préparation locale (sur votre PC)

Dans le dossier du projet :

1. Installer les dépendances (dev uniquement, sur votre PC)
   - `npm install`
2. Générer le build (crée `dist/public` et `dist/server`)
   - `npm run build`
3. Générer un dossier prêt à uploader sur Hostinger (crée `hostinger/public_html`)
   - `npm run prepare:hostinger`

À la fin, vous obtenez :

```
hostinger/
  public_html/
    package.json
    server.js
    dist/
      public/
      server/
    README_HOSTINGER.txt
```

## 3) Upload sur Hostinger

1. Ouvrez le gestionnaire de fichiers Hostinger ou FTP.
2. Allez dans `public_html/` (ou le répertoire racine configuré pour le domaine).
3. Supprimez les fichiers par défaut (si besoin).
4. Uploadez le contenu de `hostinger/public_html/` (les 3 éléments ci-dessus).

Important : `package.json` et `server.js` doivent être **directement** dans `public_html`.

## 4) Configuration Node.js dans hPanel

Dans **Site Web → Node.js** :

- **Application root** : `public_html`
- **Application startup file** : `server.js`
- **Node.js version** : 18+ (idéalement 20 LTS)

Ensuite :

1. Cliquez sur **NPM Install** (cela installe uniquement `express`)
2. Cliquez sur **Restart**

## 5) Vérifications (anti “page blanche”)

1. Visitez le site : votre domaine doit afficher l’application.
2. Visitez `/health` : doit retourner un JSON `{"status":"ok"...}`.
3. Ouvrez la console navigateur (F12) : pas de 404 sur `/assets/...`.
4. Logs Hostinger : si `dist/public/index.html` est absent, le serveur loguera une erreur explicite.

## 6) Dépannage rapide

### A) “Page blanche”
- 90 % du temps : `dist/public` n’est pas uploadé.
- Vérifiez : `public_html/dist/public/index.html` existe.

### B) Erreur de port / application ne démarre pas
- Le serveur écoute sur `process.env.PORT` (Hostinger) et utilise 3000 uniquement en fallback local.
- Vérifiez que l’app Node.js hPanel est bien activée et redémarrée.

### C) NPM Install échoue
- Vérifiez que `package.json` dans `public_html` est le **runtime minimal** (celui généré par `prepare:hostinger`).
- S’il contient des dépendances React/Vite : vous avez uploadé le mauvais `package.json`.

### D) Routing SPA (refresh sur une URL interne renvoie 404)
- Normalement géré (fallback `*` vers `index.html`).
- Si 404 persiste : vérifiez que Node.js sert bien le domaine (et que ce n’est pas Apache en mode statique).
