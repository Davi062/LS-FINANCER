"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = () => {
      try {
        const userData = localStorage.getItem('@linkCallendar:user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = useCallback((userData: User) => {
    try {
      localStorage.setItem('@linkCallendar:user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('@linkCallendar:user');
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }, [router]);

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
