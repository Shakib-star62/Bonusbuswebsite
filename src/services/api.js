// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Mock API responses for development
const MOCK_DELAY = 1000;

const mockFetch = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ok: true, json: () => Promise.resolve(data) });
    }, MOCK_DELAY);
  });
};

export const api = {
  // Auth endpoints
  auth: {
    login: async (credentials) => {
      // Simulate API call
      return mockFetch({
        success: true,
        user: {
          id: 1,
          name: 'Shakib',
          email: credentials.email,
          token: 'mock-jwt-token'
        }
      });
    },
    
    signup: async (userData) => {
      return mockFetch({
        success: true,
        user: {
          id: Date.now(),
          ...userData,
          token: 'mock-jwt-token'
        }
      });
    }
  },

  // Bus routes
  routes: {
    getAll: async () => {
      return mockFetch({
        routes: [
          { id: 1, from: 'Visakhapatnam', to: 'Vijayawada', price: 850, duration: '6h 30m' },
          { id: 2, from: 'Vijayawada', to: 'Tirupati', price: 650, duration: '8h 15m' },
          // ... more routes
        ]
      });
    },
    
    search: async (from, to, date) => {
      return mockFetch({
        buses: [
          { id: 'EV101', time: '06:00 AM', availableSeats: 18, price: 850 },
          // ... more buses
        ]
      });
    }
  },

  // Bookings
  bookings: {
    getCurrent: async () => {
      return mockFetch({
        bookings: [
          {
            id: 'EV123456',
            busNo: 'EV-101',
            route: 'Visakhapatnam → Vijayawada',
            status: 'ongoing',
            // ... more details
          }
        ]
      });
    },
    
    create: async (bookingData) => {
      return mockFetch({
        success: true,
        bookingId: 'EV' + Date.now()
      });
    }
  },

  // Wallet
  wallet: {
    getBalance: async () => {
      return mockFetch({ balance: 2450.75 });
    },
    
    addMoney: async (amount, method) => {
      return mockFetch({ success: true, newBalance: 2450.75 + amount });
    },
    
    withdraw: async (amount) => {
      return mockFetch({ success: true, newBalance: 2450.75 - amount });
    }
  },

  // User profile
  user: {
    getProfile: async () => {
      return mockFetch({
        name: 'Shakib',
        email: 'shakib@example.com',
        phone: '+91 9390629750',
        totalTrips: 12,
        greenPoints: 1250
      });
    },
    
    updateProfile: async (profileData) => {
      return mockFetch({ success: true, ...profileData });
    }
  }
};

export default api;