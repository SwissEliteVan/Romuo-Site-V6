import type { RideStatus } from '../config';

export interface Ride {
  id: string;
  riderId: string;
  driverId: string | null;
  status: RideStatus;

  // Pickup
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;

  // Dropoff
  dropoffAddress: string;
  dropoffLat: number;
  dropoffLng: number;

  // Estimation
  estimatedDistanceKm: number;
  estimatedDurationMin: number;
  estimatedPrice: number;

  // Final
  finalPrice: number | null;

  // Timestamps
  requestedAt: Date;
  acceptedAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;
  canceledAt: Date | null;

  // Cancellation
  cancellationReason: string | null;
  canceledBy: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface RideWithDetails extends Ride {
  rider?: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
  };
  driver?: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    vehicle?: {
      make: string;
      model: string;
      color: string;
      licensePlate: string;
    };
  };
}

export interface RideEvent {
  id: string;
  rideId: string;
  eventType: 'status_changed' | 'driver_assigned' | 'location_updated';
  metadata: Record<string, any>;
  createdAt: Date;
}

export type RideEstimateRequest = {
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
};

export type RideEstimateResponse = {
  distanceKm: number;
  durationMin: number;
  price: number;
  currency: string;
};

export type RideRequestInput = {
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  dropoffAddress: string;
  dropoffLat: number;
  dropoffLng: number;
};

export type RideOffer = {
  rideId: string;
  driverId: string;
  pickupAddress: string;
  dropoffAddress: string;
  estimatedPrice: number;
  estimatedDistanceKm: number;
  expiresAt: Date;
};
