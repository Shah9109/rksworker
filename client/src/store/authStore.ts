import { create } from 'zustand';

export interface User {
  _id: string;
  phone: string;
  name: string;
  role: 'worker' | 'company' | 'admin';
  photo?: string;
  gender?: string;
  language?: 'hi' | 'en';
  isVerified?: boolean;
}

interface AuthState {
  token: string | null;
  user: User | null;
  profile: any | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User, profile?: any) => void;
  logout: () => void;
}

const tokenFromStorage = localStorage.getItem('wp_token');
const userFromStorage = localStorage.getItem('wp_user');

export const useAuthStore = create<AuthState>((set) => ({
  token: tokenFromStorage,
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  profile: null,
  isAuthenticated: !!tokenFromStorage,
  setAuth: (token, user, profile) => {
    localStorage.setItem('wp_token', token);
    localStorage.setItem('wp_user', JSON.stringify(user));
    set({ token, user, profile, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('wp_token');
    localStorage.removeItem('wp_user');
    set({ token: null, user: null, profile: null, isAuthenticated: false });
  },
}));
