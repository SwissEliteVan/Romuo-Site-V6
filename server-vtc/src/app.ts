import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { generalLimiter } from './middleware/rateLimit.middleware.js';
import { formatErrorResponse } from './utils/errors.js';
import logger from './utils/logger.js';

// Routes
import authRoutes from './routes/auth.js';
import ridesRoutes from './routes/rides.js';
import driverRoutes from './routes/driver.js';
import adminRoutes from './routes/admin.js';

/**
 * Créer l'application Express
 */
export function createApp() {
  const app = express();

  // ==========================================================================
  // MIDDLEWARES
  // ==========================================================================

  // Sécurité
  app.use(helmet());

  // CORS
  const corsOrigins = process.env.CORS_ORIGINS?.split(',') || [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
  ];

  app.use(
    cors({
      origin: corsOrigins,
      credentials: true,
    })
  );

  // Body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Cookie parser
  app.use(cookieParser());

  // Rate limiting
  app.use(generalLimiter);

  // Logging des requêtes
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`, {
      ip: req.ip,
      userAgent: req.get('user-agent'),
    });
    next();
  });

  // ==========================================================================
  // ROUTES
  // ==========================================================================

  app.use('/api/auth', authRoutes);
  app.use('/api/rides', ridesRoutes);
  app.use('/api/driver', driverRoutes);
  app.use('/api/admin', adminRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      uptime: process.uptime(),
    });
  });

  // Route de test
  app.get('/api', (req, res) => {
    res.json({
      message: 'ROMUO VTC API',
      version: '1.0.0',
      docs: '/api/docs',
    });
  });

  // ==========================================================================
  // ERROR HANDLING
  // ==========================================================================

  // 404
  app.use((req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'Route not found',
      path: req.path,
    });
  });

  // Error handler global
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    logger.error('Error:', {
      message: error.message,
      stack: error.stack,
      path: req.path,
    });

    const formattedError = formatErrorResponse(error);
    res.status(formattedError.statusCode).json(formattedError);
  });

  return app;
}
