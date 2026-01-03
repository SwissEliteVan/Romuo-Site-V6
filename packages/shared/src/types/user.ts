import type { UserRole } from '../config';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  locale: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DriverProfile {
  id: string;
  userId: string;
  licenseNumber: string | null;
  vehicleId: string | null;
  isOnline: boolean;
  isApproved: boolean;
  lastLocation: {
    lat: number;
    lng: number;
  } | null;
  lastLocationUpdatedAt: Date | null;
  rating: number | null;
  totalTrips: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vehicle {
  id: string;
  driverId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  capacity: number;
  vehicleType: string;
  createdAt: Date;
  updatedAt: Date;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  locale?: string;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
