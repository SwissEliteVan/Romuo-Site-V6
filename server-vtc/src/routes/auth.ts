import { Router } from 'express';
import { body } from 'express-validator';
import { authService } from '../services/auth.service.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { strictLimiter } from '../middleware/rateLimit.middleware.js';

const router = Router();

/**
 * POST /api/auth/register
 * Inscription
 */
router.post(
  '/register',
  strictLimiter,
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    body('firstName').notEmpty().withMessage('First name required'),
    body('lastName').notEmpty().withMessage('Last name required'),
    body('role').isIn(['rider', 'driver']).withMessage('Invalid role'),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/auth/login
 * Connexion
 */
router.post(
  '/login',
  strictLimiter,
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const result = await authService.login(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/auth/refresh
 * Refresh token
 */
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/auth/me
 * Profil utilisateur
 */
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user!.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
