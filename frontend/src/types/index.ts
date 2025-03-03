export interface User {
    _id: string;
    email: string;
    name: string;
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface SignUpData {
    email: string;
    name: string;
    password: string;
  }
  
  export interface SignInData {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: User;
    accessToken: string;
  }