#!/bin/bash

# Script de pre-commit pour vérifier la qualité du code
# Ajouter ce script dans .git/hooks/pre-commit pour l'automatiser

set -e

echo "🔍 Vérification de la qualité du code..."

# Vérification TypeScript
echo "📝 Type checking..."
npm run type-check

# Vérification ESLint
echo "🔧 Linting..."
npm run lint

# Vérification formatage
echo "✨ Format checking..."
npm run format:check

# Build test
echo "🏗️  Build test..."
npm run build

echo "✅ Toutes les vérifications sont passées!"
echo "Vous pouvez commiter en toute sécurité."
