# Politique de Sécurité

## Versions supportées

Seule la version la plus récente du site vitrine ROMUO VTC est activement maintenue et reçoit des mises à jour de sécurité.

| Version | Supportée          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Signaler une vulnérabilité

Nous prenons la sécurité de notre site web très au sérieux. Si vous découvrez une vulnérabilité de sécurité, nous vous remercions de nous aider à protéger nos utilisateurs.

### Comment signaler

**NE PAS** créer d'issue publique pour les vulnérabilités de sécurité.

À la place, veuillez nous contacter directement :

- **Email de sécurité :** contact@romuo-vtc.ch
- **Téléphone :** 076 084 20 89
- **Sujet :** [SECURITY] Description brève de la vulnérabilité

### Informations à inclure

Pour nous aider à traiter votre rapport rapidement, veuillez inclure :

1. **Description de la vulnérabilité**
   - Type de vulnérabilité (XSS, CSRF, injection SQL, etc.)
   - Impact potentiel
   
2. **Étapes pour reproduire**
   - URL affectée
   - Payload ou code d'exploitation (si applicable)
   - Captures d'écran ou vidéo de démonstration

3. **Environnement**
   - Navigateur et version
   - Système d'exploitation
   - Configuration particulière

4. **Suggestions de correction** (optionnel)

### Ce que nous nous engageons à faire

- Accuser réception de votre rapport sous **48 heures**
- Vous tenir informé de la progression de la correction
- Créditer votre contribution (si vous le souhaitez) une fois le problème résolu
- Déployer un correctif dans les **7 jours** pour les vulnérabilités critiques

### Vulnérabilités hors scope

Les éléments suivants ne sont **pas** considérés comme des vulnérabilités :

- Clickjacking sur les pages sans informations sensibles
- Absence de headers DNSSEC/CAA
- Absence de rate limiting sur les formulaires publics
- SPF/DMARC/DKIM non configurés (hors de notre contrôle)
- Vulnérabilités dans les navigateurs obsolètes (IE11, etc.)
- Attaques nécessitant un accès physique à l'appareil

### Divulgation responsable

Nous demandons que vous :

- Ne divulguiez pas publiquement la vulnérabilité avant que nous ayons déployé un correctif
- N'exploitiez pas la vulnérabilité au-delà de ce qui est nécessaire pour la démonstration
- Ne testiez pas sur des données de production ou des comptes réels

## Mesures de sécurité en place

Notre site vitrine implémente les mesures de sécurité suivantes :

### Headers de sécurité

- ✅ Content-Security-Policy (CSP)
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy

### HTTPS & Transport

- ✅ HTTPS forcé (redirections HTTP → HTTPS)
- ✅ Certificat SSL/TLS valide
- ✅ HSTS recommandé (configuré par l'hébergeur)

### Données & Cookies

- ✅ Pas de stockage de données sensibles côté client
- ✅ Cookies sécurisés (SameSite, Secure en production)
- ✅ localStorage utilisé uniquement pour préférences non sensibles
- ✅ Consentement RGPD/LPD pour analytics

### Code & Dépendances

- ✅ Dépendances à jour (npm audit)
- ✅ TypeScript strict mode
- ✅ ESLint avec règles de sécurité
- ✅ Pas de secrets dans le code source
- ✅ Variables d'environnement pour clés API

### APIs externes

- ✅ Clés API TomTom avec restrictions de domaine
- ✅ Pas d'appels API depuis le backend (frontend uniquement)
- ✅ Rate limiting géré par TomTom

## Mises à jour de sécurité

Nous surveillons activement :

- Vulnérabilités npm (via `npm audit`)
- CVE dans nos dépendances React, Vite, etc.
- Alertes GitHub Dependabot
- Mises à jour de sécurité des hébergeurs

## Conformité

- ✅ **RGPD** : Consentement cookies, droit à l'oubli
- ✅ **LPD Suisse** : Conformité loi fédérale protection des données
- ✅ **WCAG 2.1** : Accessibilité niveau AA
- ✅ **OWASP Top 10** : Protections contre les vulnérabilités communes

## Contact

Pour toute question sur notre politique de sécurité :

**Email :** contact@romuo-vtc.ch  
**Téléphone :** 076 084 20 89

---

**Dernière mise à jour :** Janvier 2026  
**Version :** 1.0.0
