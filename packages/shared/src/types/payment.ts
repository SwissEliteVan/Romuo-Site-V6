export interface Payment {
  id: string;
  rideId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'simulated' | 'stripe' | 'twint' | 'cash';
  transactionId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentRequest = {
  rideId: string;
  amount: number;
  paymentMethod: 'simulated' | 'stripe' | 'twint' | 'cash';
};

export type PaymentResponse = {
  payment: Payment;
  status: 'success' | 'failed';
  message?: string;
};
