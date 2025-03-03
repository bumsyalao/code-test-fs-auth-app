import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, SignUpData, SignInData } from '../types';
import { authService } from '../services/auth.service';

interface AuthContextType extends AuthState {
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setState({ isAuthenticated: false, user: null, loading: false, error: null });
        return;
      }

      try {
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          setState({ isAuthenticated: true, user, loading: false, error: null });
        } else {
          // If we have a token but no user data, fetch the user profile
          const userData = await authService.getUserProfile();
          localStorage.setItem('user', JSON.stringify(userData));
          setState({ isAuthenticated: true, user: userData, loading: false, error: null });
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setState({ isAuthenticated: false, user: null, loading: false, error: 'Session expired. Please sign in again.' });
      }
    };

    initializeAuth();
  }, []);

  const signUp = async (data: SignUpData) => {
    setState({ ...state, loading: true, error: null });
    try {
      const response = await authService.signUp(data);
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      setState({
        isAuthenticated: true,
        user: response.user,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
      throw error;
    }
  };

  const signIn = async (data: SignInData) => {
    setState({ ...state, loading: true, error: null });
    try {
      const response = await authService.signIn(data);
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      setState({
        isAuthenticated: true,
        user: response.user,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
