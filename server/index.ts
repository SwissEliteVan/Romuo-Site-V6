import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware JSON
app.use(express.json());

// Headers de sécurité
app.use((req: Request, res: Response, next: NextFunction) => {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Permissions-Policy',
    'geolocation=(self), microphone=(), camera=()'
  );

  // CSP basique (à ajuster selon vos besoins Google Maps/Mapbox)
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://maps.googleapis.com https://www.google-analytics.com;"
  );

  next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'production',
  });
});

// Servir les fichiers statiques buildés avec cache optimal
const publicPath = path.resolve(__dirname, '../public');

app.use(
  express.static(publicPath, {
    maxAge: '1y',
    etag: true,
    lastModified: true,
    setHeaders: (res: Response, filePath: string) => {
      // Cache agressif pour les assets hashés
      if (filePath.match(/\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|webp|gif|ico)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      // Pas de cache pour index.html
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    },
  })
);

// Fallback SPA : toutes les routes renvoient index.html
app.get('*', (req: Request, res: Response) => {
  const indexPath = path.join(publicPath, 'index.html');

  // Vérification de l'existence du fichier
  if (!fs.existsSync(indexPath)) {
    console.error(`❌ ERREUR CRITIQUE : ${indexPath} introuvable.`);
    console.error('Vérifiez que le build a bien été exécuté et uploadé sur Hostinger.');
    return res.status(500).send(
      'Erreur serveur : fichiers statiques manquants. Contactez l\'administrateur.'
    );
  }

  res.sendFile(indexPath);
});

// Gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({
    error: 'Erreur interne du serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur ROMUO VTC démarré sur le port ${PORT}`);
  console.log(`📂 Dossier public : ${publicPath}`);
  console.log(`🌍 Environnement : ${process.env.NODE_ENV || 'production'}`);
  console.log(`💚 Health check : http://localhost:${PORT}/health`);
});
