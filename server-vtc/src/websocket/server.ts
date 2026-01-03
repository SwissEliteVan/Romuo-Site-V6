import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';
import type { WSMessage } from '@romuo-vtc/shared';

interface AuthenticatedWebSocket extends WebSocket {
  userId?: string;
  userRole?: string;
}

/**
 * Serveur WebSocket pour le temps réel
 */
class WSServerManager {
  private wss: WebSocketServer | null = null;
  private clients: Map<string, AuthenticatedWebSocket> = new Map();

  /**
   * Initialise le serveur WebSocket
   */
  initialize(httpServer: Server) {
    this.wss = new WebSocketServer({ server: httpServer, path: '/ws' });

    this.wss.on('connection', this.handleConnection.bind(this));

    logger.info('WebSocket server initialized');
  }

  /**
   * Gère une nouvelle connexion
   */
  private handleConnection(ws: AuthenticatedWebSocket, req: any) {
    logger.info('New WebSocket connection');

    // Authentifier la connexion via le token dans l'URL
    const urlParams = new URLSearchParams(req.url.replace('/ws?', ''));
    const token = urlParams.get('token');

    if (!token) {
      logger.warn('WebSocket connection without token, closing');
      ws.close(4001, 'No token provided');
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        role: string;
      };

      ws.userId = decoded.id;
      ws.userRole = decoded.role;

      // Ajouter le client à la map
      this.clients.set(decoded.id, ws);

      logger.info(`WebSocket authenticated: ${decoded.id} (${decoded.role})`);

      // Envoyer un message de confirmation
      this.send(ws, {
        type: 'connection_established' as any,
        payload: { userId: decoded.id },
        timestamp: new Date().toISOString(),
      });

      // Gérer la déconnexion
      ws.on('close', () => {
        this.clients.delete(decoded.id);
        logger.info(`WebSocket disconnected: ${decoded.id}`);
      });

      // Gérer les erreurs
      ws.on('error', (error) => {
        logger.error(`WebSocket error for ${decoded.id}:`, error);
      });

      // Gérer les messages entrants
      ws.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString());
          this.handleMessage(ws, message);
        } catch (error) {
          logger.error('Invalid WebSocket message:', error);
        }
      });

      // Ping/pong pour maintenir la connexion
      const interval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.ping();
        } else {
          clearInterval(interval);
        }
      }, 30000); // Toutes les 30s
    } catch (error: any) {
      logger.warn('Invalid WebSocket token, closing connection');
      ws.close(4001, 'Invalid token');
    }
  }

  /**
   * Gère les messages entrants
   */
  private handleMessage(ws: AuthenticatedWebSocket, message: any) {
    logger.debug(`WebSocket message from ${ws.userId}:`, message);
    // Gérer les messages spécifiques si nécessaire
  }

  /**
   * Envoie un message à un client spécifique
   */
  private send(ws: WebSocket, message: WSMessage) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  /**
   * Envoie un message à un passager
   */
  sendToRider(riderId: string, message: WSMessage) {
    const ws = this.clients.get(riderId);
    if (ws) {
      this.send(ws, message);
      logger.debug(`Message sent to rider ${riderId}:`, message.type);
    } else {
      logger.warn(`Rider ${riderId} not connected to WebSocket`);
    }
  }

  /**
   * Envoie un message à un chauffeur
   */
  sendToDriver(driverId: string, message: WSMessage) {
    const ws = this.clients.get(driverId);
    if (ws) {
      this.send(ws, message);
      logger.debug(`Message sent to driver ${driverId}:`, message.type);
    } else {
      logger.warn(`Driver ${driverId} not connected to WebSocket`);
    }
  }

  /**
   * Broadcast à tous les clients connectés
   */
  broadcast(message: WSMessage) {
    this.clients.forEach((ws) => {
      this.send(ws, message);
    });
    logger.debug(`Broadcast message to ${this.clients.size} clients:`, message.type);
  }

  /**
   * Broadcast à tous les chauffeurs
   */
  broadcastToDrivers(message: WSMessage) {
    this.clients.forEach((ws) => {
      if (ws.userRole === 'driver') {
        this.send(ws, message);
      }
    });
  }

  /**
   * Récupère le nombre de clients connectés
   */
  getConnectedClients() {
    return this.clients.size;
  }
}

export const wsServer = new WSServerManager();
