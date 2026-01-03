import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RideEstimateRequest,
  RideEstimateResponse,
  RideRequestInput,
  Ride,
  RideWithDetails,
} from '@romuo-vtc/shared';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

class ApiClient {
  private accessToken: string | null = null;

  constructor() {
    // Récupérer le token du localStorage
    this.accessToken = localStorage.getItem('accessToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async login(data: LoginRequest): Promise<AuthResponse> {
    const result = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    this.accessToken = result.accessToken;
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    localStorage.setItem('user', JSON.stringify(result.user));

    return result;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const result = await this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    this.accessToken = result.accessToken;
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    localStorage.setItem('user', JSON.stringify(result.user));

    return result;
  }

  logout() {
    this.accessToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  // Rides
  async estimateRide(data: RideEstimateRequest): Promise<RideEstimateResponse> {
    return this.request<RideEstimateResponse>('/api/rides/estimate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async requestRide(data: RideRequestInput): Promise<Ride> {
    return this.request<Ride>('/api/rides/request', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getActiveRide(): Promise<RideWithDetails | null> {
    return this.request<RideWithDetails | null>('/api/rides/active');
  }

  async getRide(rideId: string): Promise<RideWithDetails> {
    return this.request<RideWithDetails>(`/api/rides/${rideId}`);
  }

  async cancelRide(rideId: string, reason: string): Promise<Ride> {
    return this.request<Ride>(`/api/rides/${rideId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async getRideHistory(): Promise<Ride[]> {
    return this.request<Ride[]>('/api/rides/history');
  }
}

export const api = new ApiClient();
