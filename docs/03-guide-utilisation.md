# 03 - Guide d'utilisation

## Scénarios d'utilisation de l'API

Ce guide montre comment utiliser l'API backend pour les scénarios principaux.

---

## 🎯 Scénario 1 : Course complète (Rider → Driver → Completed)

### Étape 1 : Connexion passager

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rider1@example.com",
    "password": "password123"
  }'
```

💾 **Sauvegarder** : `accessToken` (utilisé dans les requêtes suivantes)

### Étape 2 : Estimation du prix

```bash
curl -X POST http://localhost:4000/api/rides/estimate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <RIDER_TOKEN>" \
  -d '{
    "pickupLat": 46.2044,
    "pickupLng": 6.1432,
    "dropoffLat": 46.5197,
    "dropoffLng": 6.6323
  }'
```

Réponse :
```json
{
  "distanceKm": 48.3,
  "durationMin": 72,
  "price": 181.90,
  "currency": "CHF"
}
```

### Étape 3 : Demander la course

```bash
curl -X POST http://localhost:4000/api/rides/request \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <RIDER_TOKEN>" \
  -d '{
    "pickupAddress": "Genève Aéroport",
    "pickupLat": 46.2044,
    "pickupLng": 6.1432,
    "dropoffAddress": "Lausanne Gare",
    "dropoffLat": 46.5197,
    "dropoffLng": 6.6323
  }'
```

💾 **Sauvegarder** : `rideId`

Statut : `requested`

### Étape 4 : Chauffeur se connecte et passe en ligne

```bash
# Connexion
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "driver1@romuo-vtc.ch",
    "password": "password123"
  }'

# Passer en ligne
curl -X POST http://localhost:4000/api/driver/online \
  -H "Authorization: Bearer <DRIVER_TOKEN>"

# Mettre à jour la position
curl -X POST http://localhost:4000/api/driver/location \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <DRIVER_TOKEN>" \
  -d '{
    "lat": 46.2044,
    "lng": 6.1432
  }'
```

💾 **Sauvegarder** : `accessToken` du driver

**Note** : Le chauffeur recevra une notification via WebSocket avec l'offre de course.

### Étape 5 : Chauffeur accepte l'offre

```bash
curl -X POST http://localhost:4000/api/driver/offers/<RIDE_ID>/accept \
  -H "Authorization: Bearer <DRIVER_TOKEN>"
```

Statut : `accepted` → Le passager est notifié via WebSocket

### Étape 6 : Chauffeur se dirige vers le pickup

```bash
curl -X POST http://localhost:4000/api/driver/rides/<RIDE_ID>/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <DRIVER_TOKEN>" \
  -d '{"status": "en_route"}'
```

Statut : `en_route`

### Étape 7 : Chauffeur arrive au pickup

```bash
curl -X POST http://localhost:4000/api/driver/rides/<RIDE_ID>/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <DRIVER_TOKEN>" \
  -d '{"status": "arrived"}'
```

Statut : `arrived`

### Étape 8 : Course démarre (passager à bord)

```bash
curl -X POST http://localhost:4000/api/driver/rides/<RIDE_ID>/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <DRIVER_TOKEN>" \
  -d '{"status": "in_trip"}'
```

Statut : `in_trip`

### Étape 9 : Course terminée

```bash
curl -X POST http://localhost:4000/api/driver/rides/<RIDE_ID>/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <DRIVER_TOKEN>" \
  -d '{"status": "completed"}'
```

Statut : `completed` → Le paiement est automatiquement traité (simulé)

### Étape 10 : Vérifier l'historique

```bash
# Passager
curl -X GET http://localhost:4000/api/rides/history \
  -H "Authorization: Bearer <RIDER_TOKEN>"

# Chauffeur
curl -X GET http://localhost:4000/api/driver/history \
  -H "Authorization: Bearer <DRIVER_TOKEN>"
```

---

## 🚫 Scénario 2 : Annulation par le passager

### Demander une course

```bash
curl -X POST http://localhost:4000/api/rides/request \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <RIDER_TOKEN>" \
  -d '{
    "pickupAddress": "Genève Centre",
    "pickupLat": 46.2044,
    "pickupLng": 6.1432,
    "dropoffAddress": "CERN",
    "dropoffLat": 46.2333,
    "dropoffLng": 6.0557
  }'
```

### Annuler la course

```bash
curl -X POST http://localhost:4000/api/rides/<RIDE_ID>/cancel \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <RIDER_TOKEN>" \
  -d '{
    "reason": "Plans changed"
  }'
```

Statut : `canceled`

---

## 👨‍✈️ Scénario 3 : Chauffeur refuse l'offre

### Le chauffeur reçoit une offre (via WebSocket)

WebSocket message reçu :
```json
{
  "type": "new_ride_offer",
  "payload": {
    "rideId": "clxxx...",
    "pickupAddress": "...",
    "estimatedPrice": 25.50,
    "expiresAt": "2026-01-03T10:15:00.000Z"
  }
}
```

### Le chauffeur refuse

```bash
curl -X POST http://localhost:4000/api/driver/offers/<RIDE_ID>/reject \
  -H "Authorization: Bearer <DRIVER_TOKEN>"
```

→ L'offre est envoyée au prochain chauffeur disponible

---

## 👔 Scénario 4 : Admin gère les chauffeurs

### Connexion admin

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@romuo-vtc.ch",
    "password": "password123"
  }'
```

### Voir tous les chauffeurs

```bash
curl -X GET http://localhost:4000/api/admin/drivers \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```

### Approuver un chauffeur

```bash
curl -X PATCH http://localhost:4000/api/admin/drivers/<DRIVER_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  -d '{
    "isApproved": true
  }'
```

### Désactiver un chauffeur

```bash
curl -X PATCH http://localhost:4000/api/admin/drivers/<DRIVER_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  -d '{
    "isApproved": false
  }'
```

### Voir les statistiques

```bash
curl -X GET http://localhost:4000/api/admin/stats \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```

Réponse :
```json
{
  "totalRides": 150,
  "completedRides": 125,
  "todayRides": 12,
  "activeDrivers": 3,
  "totalRevenue": 3250.50
}
```

### Voir toutes les courses

```bash
curl -X GET http://localhost:4000/api/admin/rides \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```

---

## 🔌 Scénario 5 : Utilisation WebSocket

### Connexion WebSocket (Passager)

```javascript
// Dans votre frontend
const token = '<RIDER_ACCESS_TOKEN>';
const ws = new WebSocket(`ws://localhost:4000/ws?token=${token}`);

ws.onopen = () => {
  console.log('WebSocket connected');
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Message reçu:', message);

  switch (message.type) {
    case 'connection_established':
      console.log('Connecté en tant que:', message.payload.userId);
      break;

    case 'ride_assigned':
      console.log('Chauffeur assigné:', message.payload.driver);
      break;

    case 'ride_status_update':
      console.log('Statut course:', message.payload.status);
      break;
  }
};

ws.onclose = () => {
  console.log('WebSocket disconnected');
};
```

### Connexion WebSocket (Chauffeur)

```javascript
const token = '<DRIVER_ACCESS_TOKEN>';
const ws = new WebSocket(`ws://localhost:4000/ws?token=${token}`);

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);

  switch (message.type) {
    case 'new_ride_offer':
      console.log('Nouvelle offre:', message.payload);
      // Afficher notification au chauffeur
      showOfferNotification(message.payload);
      break;

    case 'offer_expired':
      console.log('Offre expirée:', message.payload);
      break;
  }
};
```

---

## 📊 Scénario 6 : Stats chauffeur

### Voir les stats

```bash
curl -X GET http://localhost:4000/api/driver/stats \
  -H "Authorization: Bearer <DRIVER_TOKEN>"
```

Réponse :
```json
{
  "totalRides": 125,
  "totalEarnings": 2850.50,
  "todayRides": 8,
  "todayEarnings": 185.20
}
```

### Voir l'historique

```bash
curl -X GET http://localhost:4000/api/driver/history \
  -H "Authorization: Bearer <DRIVER_TOKEN>"
```

---

## 🌍 Scénario 7 : Multilingue (i18n)

### Inscription avec locale

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+41761111111",
    "role": "rider",
    "locale": "en"
  }'
```

L'utilisateur recevra les notifications en anglais.

---

## 🔐 Scénario 8 : Refresh Token

### Quand l'access token expire

```bash
curl -X POST http://localhost:4000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "<REFRESH_TOKEN>"
  }'
```

Réponse :
```json
{
  "user": {...},
  "accessToken": "nouveau_token...",
  "refreshToken": "nouveau_refresh_token..."
}
```

---

## 📝 Notes importantes

- Les **accessToken** expirent après **1 heure**
- Les **refreshToken** expirent après **7 jours**
- Les offres de course expirent après **15 secondes**
- Le rayon de recherche des chauffeurs est de **5 km**
- Maximum **5 chauffeurs** sont notifiés séquentiellement

---

## 🛠️ Modifier les paramètres

Tous les paramètres sont dans `/packages/shared/src/config.ts`.

Pour modifier :
1. Ouvrir `/packages/shared/src/config.ts`
2. Modifier les valeurs (ex: `OFFER_TIMEOUT_SECONDS: 30`)
3. Rebuild le package shared : `cd packages/shared && npm run build`
4. Redémarrer le serveur

---

**🎉 Vous savez maintenant utiliser toute l'API !**
