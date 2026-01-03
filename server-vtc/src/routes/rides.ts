import { Router } from 'express';
import { body, param } from 'express-validator';
import { rideService } from '../services/ride.service.js';
import { pricingService } from '../services/pricing.service.js';
import { paymentService } from '../services/payment.service.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = Router();

/**
 * POST /api/rides/estimate
 * Estimation de prix
 */
router.post(
  '/estimate',
  authenticate,
  [
    body('pickupLat').isFloat().withMessage('Invalid pickup latitude'),
    body('pickupLng').isFloat().withMessage('Invalid pickup longitude'),
    body('dropoffLat').isFloat().withMessage('Invalid dropoff latitude'),
    body('dropoffLng').isFloat().withMessage('Invalid dropoff longitude'),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const estimate = await pricingService.estimate(req.body);
      res.json(estimate);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/rides/request
 * Demander une course
 */
router.post(
  '/request',
  authenticate,
  authorize('rider'),
  [
    body('pickupAddress').notEmpty(),
    body('pickupLat').isFloat(),
    body('pickupLng').isFloat(),
    body('dropoffAddress').notEmpty(),
    body('dropoffLat').isFloat(),
    body('dropoffLng').isFloat(),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const ride = await rideService.requestRide(req.user!.id, req.body);
      res.status(201).json(ride);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/rides/active
 * Course active du passager
 */
router.get(
  '/active',
  authenticate,
  authorize('rider'),
  async (req, res, next) => {
    try {
      const ride = await rideService.getActiveRide(req.user!.id);
      res.json(ride);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/rides/:id
 * Détails d'une course
 */
router.get(
  '/:id',
  authenticate,
  param('id').isString(),
  validateRequest,
  async (req, res, next) => {
    try {
      const ride = await rideService.getRide(req.params.id);
      res.json(ride);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/rides/:id/cancel
 * Annuler une course
 */
router.post(
  '/:id/cancel',
  authenticate,
  [
    param('id').isString(),
    body('reason').optional().isString(),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const ride = await rideService.cancelRide(
        req.params.id,
        req.user!.id,
        req.body.reason || 'No reason provided'
      );
      res.json(ride);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/rides/history
 * Historique des courses
 */
router.get(
  '/history',
  authenticate,
  authorize('rider'),
  async (req, res, next) => {
    try {
      const rides = await rideService.getRiderHistory(req.user!.id);
      res.json(rides);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/rides/:id/payment
 * Paiement d'une course
 */
router.get(
  '/:id/payment',
  authenticate,
  param('id').isString(),
  validateRequest,
  async (req, res, next) => {
    try {
      const payment = await paymentService.getPayment(req.params.id);
      res.json(payment);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
