import type { RideStatus } from '../config';

// Types de messages WebSocket

export type WSMessageType =
  | 'driver_location_update'
  | 'ride_status_update'
  | 'new_ride_offer'
  | 'offer_expired'
  | 'ride_assigned'
  | 'ride_canceled';

export interface WSMessage<T = any> {
  type: WSMessageType;
  payload: T;
  timestamp: string;
}

// Driver Location Update
export interface DriverLocationUpdatePayload {
  driverId: string;
  location: {
    lat: number;
    lng: number;
  };
  timestamp: string;
}

// Ride Status Update
export interface RideStatusUpdatePayload {
  rideId: string;
  status: RideStatus;
  driverLocation?: {
    lat: number;
    lng: number;
  };
}

// New Ride Offer (envoyé au chauffeur)
export interface NewRideOfferPayload {
  rideId: string;
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  dropoffAddress: string;
  dropoffLat: number;
  dropoffLng: number;
  estimatedPrice: number;
  estimatedDistanceKm: number;
  estimatedDurationMin: number;
  expiresAt: string;
}

// Offer Expired
export interface OfferExpiredPayload {
  rideId: string;
  reason: 'timeout' | 'rejected' | 'accepted_by_other';
}

// Ride Assigned (envoyé au passager)
export interface RideAssignedPayload {
  rideId: string;
  driver: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    rating: number | null;
    vehicle: {
      make: string;
      model: string;
      color: string;
      licensePlate: string;
    } | null;
  };
  estimatedArrivalMin: number;
}

// Ride Canceled
export interface RideCanceledPayload {
  rideId: string;
  canceledBy: 'rider' | 'driver' | 'system';
  reason: string;
}
