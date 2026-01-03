import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@romuo-vtc/shared';
import { UnauthorizedError, ConflictError, ValidationError } from '../utils/errors.js';
import logger from '../utils/logger.js';

const prisma = new PrismaClient();

/**
 * Service d'authentification
 */
export class AuthService {
  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // Hash du mot de passe
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        role: data.role,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        locale: data.locale || 'fr',
      },
    });

    // Si c'est un chauffeur, créer le profil chauffeur
    if (data.role === 'driver') {
      await prisma.driverProfile.create({
        data: {
          userId: user.id,
          isOnline: false,
          isApproved: false, // À approuver par l'admin
        },
      });
    }

    logger.info(`New user registered: ${user.email} (${user.role})`);

    // Générer les tokens
    const tokens = this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Connexion
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    logger.info(`User logged in: ${user.email}`);

    // Générer les tokens
    const tokens = this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Refresh token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      // Vérifier le refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as { id: string };

      // Récupérer l'utilisateur
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new UnauthorizedError('Invalid refresh token');
      }

      // Générer de nouveaux tokens
      const tokens = this.generateTokens(user);

      return {
        user: this.sanitizeUser(user),
        ...tokens,
      };
    } catch (error) {
      throw new UnauthorizedError('Invalid refresh token');
    }
  }

  /**
   * Récupérer le profil utilisateur
   */
  async getMe(userId: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    return this.sanitizeUser(user);
  }

  /**
   * Génère les tokens JWT
   */
  private generateTokens(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: '7d',
      }
    );

    return { accessToken, refreshToken };
  }

  /**
   * Supprime le passwordHash de l'objet user
   */
  private sanitizeUser(user: any): User {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }
}

export const authService = new AuthService();
