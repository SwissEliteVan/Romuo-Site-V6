# Guide de Contribution - ROMUO VTC

Merci de votre intérêt pour contribuer au site vitrine ROMUO VTC ! Ce guide vous aidera à démarrer.

## 🎯 Code de Conduite

En participant à ce projet, vous acceptez de respecter notre code de conduite :
- Soyez respectueux et professionnel
- Accueillez les nouveaux contributeurs
- Acceptez les critiques constructives
- Concentrez-vous sur ce qui est le mieux pour le projet

## 🚀 Comment Démarrer

### Prérequis

- **Node.js** 18.x ou supérieur ([installer Node.js](https://nodejs.org/))
- **npm** 9.x ou supérieur (inclus avec Node.js)
- **Git** ([installer Git](https://git-scm.com/))
- Un éditeur de code (VS Code recommandé)

### Configuration Initiale

1. **Fork** le repository sur GitHub

2. **Clone** votre fork :
```bash
git clone https://github.com/votre-username/Romuo-Site-V6.git
cd Romuo-Site-V6
```

3. **Configurer les remotes** :
```bash
git remote add upstream https://github.com/SwissEliteVan/Romuo-Site-V6.git
```

4. **Installer les dépendances** :
```bash
cd client
npm install
```

5. **Configurer les variables d'environnement** :
```bash
cp .env.example .env
# Éditer .env avec vos clés API
```

6. **Démarrer le serveur de développement** :
```bash
npm run dev
```

## 📝 Workflow de Développement

### 1. Créer une Branche

Créez toujours une nouvelle branche pour vos modifications :

```bash
git checkout -b feature/nom-de-votre-feature
# ou
git checkout -b fix/nom-du-bug
```

**Convention de nommage des branches :**
- `feature/` - Nouvelles fonctionnalités
- `fix/` - Corrections de bugs
- `docs/` - Documentation
- `refactor/` - Refactoring
- `perf/` - Améliorations de performance
- `test/` - Ajout de tests

### 2. Développer

- Écrivez du code propre et lisible
- Suivez les conventions de code existantes
- Commentez le code complexe
- Testez vos modifications

### 3. Vérifier la Qualité

Avant de commit, exécutez les vérifications :

```bash
npm run validate
```

Cela exécute :
- ✅ Type checking (`npm run type-check`)
- ✅ Linting (`npm run lint`)
- ✅ Format checking (`npm run format:check`)

Pour corriger automatiquement les problèmes de formatage :
```bash
npm run format
npm run lint:fix
```

### 4. Commit

Utilisez des messages de commit clairs et descriptifs :

```bash
git add .
git commit -m "feat: Ajouter calculateur de distance TomTom"
```

**Convention de commit (Conventional Commits) :**
- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation
- `style:` - Formatage, points-virgules manquants, etc.
- `refactor:` - Refactoring du code
- `perf:` - Amélioration de performance
- `test:` - Ajout de tests
- `chore:` - Tâches de maintenance

### 5. Push et Pull Request

```bash
git push origin feature/nom-de-votre-feature
```

Ensuite, créez une Pull Request sur GitHub :

1. Allez sur votre fork GitHub
2. Cliquez sur "Compare & pull request"
3. Remplissez le template de PR avec :
   - **Titre** clair et descriptif
   - **Description** des changements
   - **Screenshots** si changements visuels
   - **Tests** effectués
4. Liez les issues concernées (`Fixes #123`)

## 🎨 Standards de Code

### TypeScript

- Utilisez **TypeScript strict mode**
- Typez toutes les variables et fonctions
- Évitez `any`, préférez `unknown` si nécessaire
- Utilisez les path aliases : `@/`, `@components/`, `@pages/`

```typescript
// ✅ Bon
interface User {
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return `Hello, ${user.name}`;
}

// ❌ Mauvais
function greetUser(user: any) {
  return `Hello, ${user.name}`;
}
```

### React

- Utilisez les **function components** avec hooks
- Nommez les composants en **PascalCase**
- Un composant par fichier (sauf petits helpers)
- Décomposez les gros composants

```typescript
// ✅ Bon
export default function UserProfile({ user }: UserProfileProps) {
  const [isLoading, setIsLoading] = useState(false);

  return <div>{user.name}</div>;
}

// ❌ Mauvais
export default function userprofile(props) {
  return <div>{props.user.name}</div>;
}
```

### CSS / Tailwind

- Utilisez **Tailwind CSS** pour le styling
- Classes responsive : mobile-first (`sm:`, `md:`, `lg:`)
- Évitez les styles inline sauf nécessaire
- Utilisez les custom animations de `index.css`

```typescript
// ✅ Bon
<button className="bg-gold-500 hover:bg-gold-600 px-6 py-3 rounded-md text-white transition-colors">
  Réserver
</button>

// ❌ Mauvais
<button style={{ background: '#D4AF37', padding: '12px 24px' }}>
  Réserver
</button>
```

### Accessibilité (a11y)

- Utilisez les balises sémantiques HTML
- Ajoutez `alt` aux images
- Assurez les contrastes WCAG AA (4.5:1)
- Testez la navigation au clavier

## 🧪 Tests

Avant de soumettre une PR, testez :

1. **Build** : `npm run build`
2. **Preview** : `npm run preview`
3. **Lighthouse** : Auditez avec Chrome DevTools
4. **Responsive** : Testez sur mobile, tablette, desktop
5. **Navigateurs** : Chrome, Firefox, Safari

## 📁 Structure du Projet

```
client/
├── public/          # Fichiers statiques
│   ├── icons/       # Icônes PWA
│   ├── manifest.json
│   └── sitemap.xml
├── src/
│   ├── components/  # Composants réutilisables
│   │   ├── ui/      # Composants UI de base
│   │   ├── layout/  # Header, Footer, etc.
│   │   └── booking/ # Composants de réservation
│   ├── pages/       # Pages de l'application
│   ├── hooks/       # Custom hooks
│   ├── lib/         # Utilitaires
│   ├── App.tsx      # Composant racine
│   └── main.tsx     # Point d'entrée
├── scripts/         # Scripts d'automatisation
└── package.json
```

## 🐛 Signaler un Bug

Pour signaler un bug, créez une issue avec :

1. **Titre** clair et descriptif
2. **Description** du problème
3. **Étapes pour reproduire**
4. **Comportement attendu** vs **comportement actuel**
5. **Screenshots** si applicable
6. **Environnement** (OS, navigateur, version)

## 💡 Proposer une Fonctionnalité

Pour proposer une nouvelle fonctionnalité :

1. **Créez une issue** avec le label `enhancement`
2. **Décrivez** la fonctionnalité en détail
3. **Expliquez** pourquoi elle est utile
4. **Proposez** une implémentation si possible

## 🔧 Utilisation de Docker

Pour développer avec Docker :

```bash
# Démarrer l'environnement de développement
docker compose up

# Avec rebuild
docker compose up --build

# En arrière-plan
docker compose up -d

# Arrêter
docker compose down
```

## 📦 Scripts Disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build production
npm run preview      # Preview du build
npm run lint         # ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Formatter avec Prettier
npm run format:check # Vérifier le formatage
npm run type-check   # TypeScript type checking
npm run validate     # Tout vérifier (CI)
npm run audit        # Audit de sécurité
```

## 📚 Ressources Utiles

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TomTom API Docs](https://developer.tomtom.com/)
- [PWA Guide](https://web.dev/progressive-web-apps/)

## ❓ Questions

Si vous avez des questions :
- Créez une **issue** sur GitHub
- Consultez la **documentation** dans `/client/README.md`
- Consultez le **guide de déploiement** dans `/client/DEPLOYMENT.md`

## 📄 Licence

En contribuant, vous acceptez que vos contributions soient sous la même licence que le projet.

---

**Merci pour votre contribution ! 🎉**
