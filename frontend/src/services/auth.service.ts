import { SignUpData, SignInData, AuthResponse } from '../types';

const API_URL = 'http://localhost:3001';

export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sign up');
    }

    return response.json();
  },

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sign in');
    }

    return response.json();
  },

  async getUserProfile(): Promise<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // If unauthorized, clear token and user from storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Session expired. Please sign in again.');
      }
      
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get user profile');
    }

    return response.json();
  },
};
