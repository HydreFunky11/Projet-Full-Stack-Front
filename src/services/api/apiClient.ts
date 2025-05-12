const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Fonctions utilitaires pour gérer les cookies
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift() || null;
    return cookieValue;
  }
  
  return null;
}

export function setCookie(name: string, value: string, days = 7): void {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  // Modifier les options des cookies pour les rendre plus persistants
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function removeCookie(name: string): void {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
}

type RequestBody = Record<string, unknown> | string | FormData | URLSearchParams | Blob | ArrayBuffer | null;

interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: RequestBody;
  credentials?: RequestCredentials;
  includeAuth?: boolean;
  noCors?: boolean; // Nouvelle option pour activer le mode no-cors
}

export async function apiRequest<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { 
    method = 'GET',
    headers = {},
    body, 
    credentials = 'include',
    includeAuth = true,
    noCors = false // Par défaut, ne pas utiliser no-cors
  } = options;
  
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Ajouter le token d'authentification si nécessaire et si on n'est pas en mode no-cors
  if (includeAuth && !noCors) {
    const token = getCookie('token') || localStorage.getItem('auth_token');
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    credentials,
    ...(body && { body: JSON.stringify(body) }),
    ...(noCors && { mode: 'no-cors' }) // Ajouter mode: 'no-cors' si l'option est activée
  };

  // Debug: URL complète et options
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, requestOptions);
    
    // Si on est en mode no-cors, on ne peut pas accéder à la réponse
    if (noCors) {
      // On retourne un objet factice puisqu'on ne peut pas lire la réponse
      return { success: true } as unknown as T;
    }

    // Vérifier si la réponse est JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Réponse non-JSON reçue:', text.substring(0, 150));
      throw new Error('Le serveur a renvoyé une réponse non-JSON');
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Erreur API:', data);
      throw new Error(data.message || 'Une erreur est survenue');
    }
    
    return data;
  } catch (error) {
    console.error('Erreur de requête API:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Une erreur réseau est survenue');
  }
}