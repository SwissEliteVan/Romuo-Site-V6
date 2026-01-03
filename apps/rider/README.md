# ROMUO VTC - App Passager (PWA)

Application React PWA pour les passagers ROMUO VTC.

## 🚀 Démarrage

```bash
# Installer les dépendances
npm install

# Créer .env
cp .env.example .env

# Démarrer en développement
npm run dev
```

L'app sera sur http://localhost:3000

## 📦 Build

```bash
npm run build
```

Les fichiers seront dans `dist/`

## ✨ Fonctionnalités

- ✅ Login/Register
- ✅ Estimation de prix
- ✅ Demande de course
- ✅ Suivi temps réel (WebSocket)
- ✅ Annulation
- ✅ Historique
- ✅ i18n FR/EN
- ✅ PWA (installable, offline)

## 🔧 Configuration

`.env` :
```
VITE_API_URL=http://localhost:4000
VITE_WS_URL=ws://localhost:4000
```

## 📱 PWA

Service Worker configuré avec vite-plugin-pwa.
L'app est installable et fonctionne hors ligne (shell seulement).
