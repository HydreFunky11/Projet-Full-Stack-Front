'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService, User } from '../services/api/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const defaultContextValue: AuthContextType = {
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  isAuthenticated: false
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        setError(null); // Réinitialiser les erreurs précédentes
        
        // Vérifier si un token existe d'abord
        const isLoggedIn = authService.isAuthenticated();
        
        
        if (isLoggedIn) {
          try {
            const userData = await authService.getCurrentUser();
            
            if (userData) {
              setUser(userData);
              setIsAuthenticated(true);
            } else {
              console.warn("Aucune donnée utilisateur retournée malgré un token valide");
              handleAuthError();
            }
          } catch (err) {
            console.error('Erreur lors de la récupération du profil:', err);
            handleAuthError();
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    };
    
    const handleAuthError = (message: string = "Session expirée") => {
      
      // Effacer l'état d'authentification
      setUser(null);
      setIsAuthenticated(false);
      
      // Nettoyer les cookies et le localStorage
      authService.logout().catch(err => {
        console.error("Erreur lors de la déconnexion:", err);
      });
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(email, password);
          
      if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        setError("Réponse de connexion invalide");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
        
      const response = await authService.register(username, email, password);
      
      if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        setError("Réponse d'inscription invalide");
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription:", err);
      setError(err.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      console.log("Tentative de déconnexion");
      
      await authService.logout();
      
      setUser(null);
      setIsAuthenticated(false);
      router.push('/login');
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
      // Même en cas d'erreur, nettoyer l'état d'authentification
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      register, 
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}