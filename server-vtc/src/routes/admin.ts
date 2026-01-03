import { Router } from 'express';
import { param, body } from 'express-validator';
import { adminService } from '../services/admin.service.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = Router();

// Toutes les routes admin nécessitent l'authentification et le rôle admin
router.use(authenticate, authorize('admin'));

/**
 * GET /api/admin/rides
 * Toutes les courses
 */
router.get('/rides', async (req, res, next) => {
  try {
    const rides = await adminService.getAllRides();
    res.json(rides);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/drivers
 * Tous les chauffeurs
 */
router.get('/drivers', async (req, res, next) => {
  try {
    const drivers = await adminService.getAllDrivers();
    res.json(drivers);
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/admin/drivers/:id
 * Activer/désactiver un chauffeur
 */
router.patch(
  '/drivers/:id',
  [
    param('id').isString(),
    body('isApproved').isBoolean(),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const driver = await adminService.toggleDriverStatus(
        req.params.id,
        req.body.isApproved
      );
      res.json(driver);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/admin/stats
 * Statistiques globales
 */
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await adminService.getStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/pricing
 * Paramètres de tarification
 */
router.get('/pricing', async (req, res, next) => {
  try {
    const pricing = adminService.getPricingSettings();
    res.json(pricing);
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/admin/pricing
 * Mettre à jour les paramètres de tarification
 */
router.patch('/pricing', async (req, res, next) => {
  try {
    const pricing = await adminService.updatePricingSettings(req.body);
    res.json(pricing);
  } catch (error) {
    next(error);
  }
});

export default router;
