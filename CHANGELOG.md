# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [1.1.0] - 2026-01-02

### Ajouts

#### Page d'accueil
- **Section Flotte de véhicules** : Présentation détaillée de 3 types de véhicules
  - Berline premium (Mercedes Classe E) - 3 passagers
  - Van premium (Mercedes Vito) - 7 passagers
  - Berline luxe (Mercedes Classe S) - 3 passagers
  - Affichage des capacités (passagers, bagages)
  - Liste des équipements (Wi-Fi, climatisation, etc.)
  - Animations au survol

- **Section Témoignages clients** : Affichage de 3 témoignages clients
  - Système de notation par étoiles (5/5)
  - Nom, localisation et date du témoignage
  - Design avec effet de verre (glassmorphism)
  - Citations avec icône

#### Page Contact
- **Formulaire de réservation complet** : Nouveau composant `BookingForm`
  - Sélection du type de service (5 options : transfert, business, longue distance, disposition, autre)
  - Champs itinéraire (départ/arrivée)
  - Sélection date et heure
  - Choix du nombre de passagers (1-8)
  - Choix du nombre de bagages (0-8)
  - Informations de contact avec validation
  - Messages d'erreur et de succès
  - Validation en temps réel
  - Design responsive et accessible

### Améliorations

- **Validation de formulaire** : Validation côté client pour tous les champs
- **Expérience utilisateur** :
  - Animations de hover sur les cartes de véhicules
  - Feedback visuel sur les interactions
  - Messages de succès/erreur clairs
- **Code** :
  - Composant `BookingForm` réutilisable
  - Meilleure organisation du code
  - Types TypeScript stricts

### Technique

- Build réussi sans erreurs
- Compatibilité maintenue avec le système existant
- Pas de breaking changes

## [1.0.0] - 2026-01-01

### Initial Release

- Site vitrine complet avec design Swiss Modernism
- Pages : Accueil, Services, Tarifs, Contact, Mentions légales, Confidentialité, Cookies
- Calculateur de devis basique
- Formulaire de contact
- SEO optimisé (React Helmet + JSON-LD)
- Cookie consent + Google Analytics 4
- Déploiement sur Hostinger
