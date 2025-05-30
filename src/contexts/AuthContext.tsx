
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_AUTH_KEY = 'fileExplorerMockAuth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem(MOCK_AUTH_KEY);
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (error) {
      // localStorage not available (e.g. SSR or private browsing)
      console.warn('localStorage not available for auth state.');
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((_token: string) => {
    try {
      localStorage.setItem(MOCK_AUTH_KEY, 'true');
    } catch (error) {
      console.warn('localStorage not available for auth state.');
    }
    setIsAuthenticated(true);
    router.push('/dashboard');
  }, [router]);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(MOCK_AUTH_KEY);
    } catch (error) {
      console.warn('localStorage not available for auth state.');
    }
    setIsAuthenticated(false);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
