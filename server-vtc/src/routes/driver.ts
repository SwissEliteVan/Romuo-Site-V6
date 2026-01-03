import { Router } from 'express';
import { body, param } from 'express-validator';
import { driverService } from '../services/driver.service.js';
import { rideService } from '../services/ride.service.js';
import { dispatchService } from '../services/dispatch.service.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = Router();

/**
 * POST /api/driver/online
 * Passer en ligne
 */
router.post(
  '/online',
  authenticate,
  authorize('driver'),
  async (req, res, next) => {
    try {
      const profile = await driverService.goOnline(req.user!.id);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/driver/offline
 * Passer hors ligne
 */
router.post(
  '/offline',
  authenticate,
  authorize('driver'),
  async (req, res, next) => {
    try {
      const profile = await driverService.goOffline(req.user!.id);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/driver/location
 * Mettre à jour la position
 */
router.post(
  '/location',
  authenticate,
  authorize('driver'),
  [
    body('lat').isFloat().withMessage('Invalid latitude'),
    body('lng').isFloat().withMessage('Invalid longitude'),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { lat, lng } = req.body;
      const profile = await driverService.updateLocation(req.user!.id, lat, lng);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/driver/offers/:id/accept
 * Accepter une offre de course
 */
router.post(
  '/offers/:id/accept',
  authenticate,
  authorize('driver'),
  param('id').isString(),
  validateRequest,
  async (req, res, next) => {
    try {
      await dispatchService.acceptOffer(req.params.id, req.user!.id);
      const ride = await rideService.getRide(req.params.id);
      res.json(ride);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/driver/offers/:id/reject
 * Refuser une offre de course
 */
router.post(
  '/offers/:id/reject',
  authenticate,
  authorize('driver'),
  param('id').isString(),
  validateRequest,
  async (req, res, next) => {
    try {
      await dispatchService.rejectOffer(req.params.id, req.user!.id);
      res.json({ message: 'Offer rejected' });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/driver/rides/:id/status
 * Mettre à jour le statut d'une course
 */
router.post(
  '/rides/:id/status',
  authenticate,
  authorize('driver'),
  [
    param('id').isString(),
    body('status')
      .isIn(['en_route', 'arrived', 'in_trip', 'completed'])
      .withMessage('Invalid status'),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const ride = await rideService.updateRideStatus(
        req.params.id,
        req.user!.id,
        req.body.status
      );
      res.json(ride);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/driver/history
 * Historique des courses
 */
router.get(
  '/history',
  authenticate,
  authorize('driver'),
  async (req, res, next) => {
    try {
      const rides = await rideService.getDriverHistory(req.user!.id);
      res.json(rides);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/driver/stats
 * Statistiques du chauffeur
 */
router.get(
  '/stats',
  authenticate,
  authorize('driver'),
  async (req, res, next) => {
    try {
      const stats = await driverService.getStats(req.user!.id);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/driver/profile
 * Profil du chauffeur
 */
router.get(
  '/profile',
  authenticate,
  authorize('driver'),
  async (req, res, next) => {
    try {
      const profile = await driverService.getProfile(req.user!.id);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
