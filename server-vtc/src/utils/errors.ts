/**
 * Classes d'erreurs personnalisées pour l'API
 */

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflict') {
    super(message, 409);
  }
}

/**
 * Formatte une erreur pour la réponse API
 */
export function formatErrorResponse(error: any) {
  if (error instanceof AppError) {
    return {
      status: 'error',
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  // Erreurs Prisma
  if (error.code === 'P2002') {
    return {
      status: 'error',
      message: 'A record with this value already exists',
      statusCode: 409,
    };
  }

  if (error.code === 'P2025') {
    return {
      status: 'error',
      message: 'Record not found',
      statusCode: 404,
    };
  }

  // Erreur inconnue
  return {
    status: 'error',
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message,
    statusCode: 500,
  };
}
