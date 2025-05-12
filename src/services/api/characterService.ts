import { apiRequest } from './apiClient';

export interface Character {
  id: number;
  name: string;
  race: string;
  class: string;
  level: number;
  background?: string;
  inventory?: string;
  stats: string | Record<string, unknown>;
  isAlive: boolean;
  userId: number;
  sessionId?: number | null;
  createdAt: string;
  updatedAt: string;
  session?: {
    id: number;
    title: string;
    status: string;
  };
  user?: {
    id: number;
    username: string;
  };
}

// Interface pour la création d'un personnage
export interface CreateCharacterData {
  name: string;
  race: string;
  class: string;
  level: number;
  background?: string;
  inventory?: string;
  stats: string;
  isAlive: boolean;
  sessionId?: number | null;
}

// Interface pour la mise à jour d'un personnage
export interface UpdateCharacterData {
  name?: string;
  race?: string;
  class?: string;
  level?: number;
  background?: string | null;
  inventory?: string | null;
  stats?: string | Record<string, unknown>;
  isAlive?: boolean;
  sessionId?: number | null;
}

export const characterService = {
  // Créer un nouveau personnage
  async createCharacter(characterData: CreateCharacterData) {
    try {
      return await apiRequest<{success: boolean; character: Character}>('/characters', {
        method: 'POST',
        body: characterData
      });
    } catch (error) {
      console.error('Erreur lors de la création du personnage:', error);
      throw error;
    }
  },

  // Récupérer tous les personnages de l'utilisateur
  async getCharacters() {
    try {
      return await apiRequest<{success: boolean; characters: Character[]}>('/characters');
    } catch (error) {
      console.error('Erreur lors de la récupération des personnages:', error);
      throw error;
    }
  },

  // Récupérer un personnage par son ID
  async getCharacterById(id: number) {
    try {
      return await apiRequest<{success: boolean; character: Character}>(`/characters/${id}`);
    } catch (error) {
      console.error(`Erreur lors de la récupération du personnage ${id}:`, error);
      throw error;
    }
  },

  // Mettre à jour un personnage
  async updateCharacter(id: number, characterData: UpdateCharacterData) {
    try {
      return await apiRequest<{success: boolean; character: Character}>(`/characters/${id}`, {
        method: 'PUT',
        body: characterData
      });
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du personnage ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un personnage
  async deleteCharacter(id: number) {
    try {
      return await apiRequest<{success: boolean}>(`/characters/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(`Erreur lors de la suppression du personnage ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les personnages d'une session
  async getSessionCharacters(sessionId: number) {
    try {
      return await apiRequest<{success: boolean; characters: Character[]}>(`/characters/session/${sessionId}`);
    } catch (error) {
      console.error(`Erreur lors de la récupération des personnages de la session ${sessionId}:`, error);
      throw error;
    }
  },

  // Associer un personnage à une session
  async assignToSession(characterId: number, sessionId: number | null) {
    try {
      return await apiRequest<{success: boolean; character: Character}>(`/characters/${characterId}/assign-session`, {
        method: 'PUT',
        body: { sessionId }
      });
    } catch (error) {
      console.error(`Erreur lors de l'association du personnage ${characterId} à la session:`, error);
      throw error;
    }
  }
};