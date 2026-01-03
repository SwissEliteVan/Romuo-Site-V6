import 'dotenv/config';
import { createServer } from 'http';
import { createApp } from './app.js';
import { wsServer } from './websocket/server.js';
import logger from './utils/logger.js';

const PORT = parseInt(process.env.PORT || '4000');
const HOST = process.env.HOST || '0.0.0.0';

/**
 * Démarrer le serveur
 */
async function start() {
  try {
    // Créer l'app Express
    const app = createApp();

    // Créer le serveur HTTP
    const httpServer = createServer(app);

    // Initialiser le WebSocket
    wsServer.initialize(httpServer);

    // Démarrer le serveur
    httpServer.listen(PORT, HOST, () => {
      logger.info(`🚀 Server started`);
      logger.info(`📍 HTTP: http://${HOST}:${PORT}`);
      logger.info(`🔌 WebSocket: ws://${HOST}:${PORT}/ws`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`📊 Health check: http://${HOST}:${PORT}/api/health`);
    });

    // Gérer les signaux de terminaison
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully');
      httpServer.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT received, shutting down gracefully');
      httpServer.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
