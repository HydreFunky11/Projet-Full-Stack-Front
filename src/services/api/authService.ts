import { apiRequest, setCookie, getCookie, removeCookie } from './apiClient';

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt?: string;
}

export const authService = {
  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    const hasToken = !!getCookie('token') || !!localStorage.getItem('auth_token');
    return hasToken;
  },

  // Connexion
async login(email: string, password: string) {
    const response = await apiRequest<{success: boolean; token: string; user: User}>('/users/login', {
      method: 'POST',
      body: { email, password },
      includeAuth: false,
      noCors: true
    });
    
    // Stocker le token après une connexion réussie
    if (response.token) {
      // Double stockage pour plus de fiabilité
      setCookie('token', response.token);
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
},
  
  // Inscription
  async register(username: string, email: string, password: string) {
      const response = await apiRequest<{success: boolean; token: string; user: User}>('/users/register', {
        method: 'POST',
        body: { username, email, password },
        includeAuth: false,
      });
      
      // Stocker le token après une inscription réussie
      if (response.token) {
        // Double stockage pour plus de fiabilité
        setCookie('token', response.token);
        localStorage.setItem('auth_token', response.token);
        
      }
      
      return response;
  },
  
  // Déconnexion
  async logout() {
    try {
      
      try {
        await apiRequest('/users/logout', { 
          method: 'POST' 
        });
      } catch (err) {
        console.warn("Erreur côté serveur lors de la déconnexion, mais on continue la déconnexion côté client");
      }
      
      // Supprimer le token
      removeCookie('token');
      
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      removeCookie('token');
      throw error;
    }
  },
  
  // Récupérer le profil de l'utilisateur connecté
  async getCurrentUser() {
    try {
      console.log('Récupération du profil utilisateur');
      
      // Vérifier si un token existe
      const token = getCookie('token') || localStorage.getItem('auth_token');
      if (!token) {
        console.log('Aucun token trouvé, utilisateur non authentifié');
        return null;
      }
      
      const response = await apiRequest<{success: boolean; user: User}>('/users/me');
      
      if (response && response.success && response.user) {
        return response.user;
      }
      
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      return null;
    }
  }
};