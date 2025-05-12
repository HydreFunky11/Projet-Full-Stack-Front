import { apiRequest } from './apiClient';

// Interface pour les métadonnées des lancers de dés
export interface DiceRollMetadata {
  // Définir la structure réelle des métadonnées ici
  // Par exemple:
  advantage?: boolean;
  disadvantage?: boolean;
  modifier?: number;
  critical?: boolean;
  notes?: string;
  // Si la structure est variable ou inconnue, utilisez Record<string, unknown>
  [key: string]: unknown;
}

export interface DiceRoll {
  id: number;
  rollExpression: string;
  result: number;
  userId: number;
  sessionId: number;
  characterId?: number | null;
  timestamp: string;
  metadata?: DiceRollMetadata; // Type spécifique au lieu de any
  user: {
    id: number;
    username: string;
  };
  character?: {
    id: number;
    name: string;
  } | null;
}

export interface DiceRollParams {
  expression: string;
  sessionId: number;
  characterId?: number | null;
  metadata?: DiceRollMetadata; // Ajouté ici aussi pour cohérence
}

export interface DiceRollResponse {
  success: boolean;
  message: string;
  diceRoll: DiceRoll;
}

export interface DiceRollsResponse {
  success: boolean;
  count: number;
  diceRolls: DiceRoll[];
}

export const diceRollService = {
  rollDice: async (params: DiceRollParams): Promise<DiceRollResponse> => {
    return apiRequest<DiceRollResponse>('/dice-rolls', {
      method: 'POST',
      body: params as unknown as Record<string, unknown>,
    });
  },
  
  getDiceRollsBySession: async (sessionId: number, limit?: number): Promise<DiceRollsResponse> => {
    const queryParams = limit ? `?sessionId=${sessionId}&limit=${limit}` : `?sessionId=${sessionId}`;
    return apiRequest<DiceRollsResponse>(`/dice-rolls${queryParams}`);
  },
  
  getDiceRollById: async (id: number): Promise<{ success: boolean; diceRoll: DiceRoll }> => {
    return apiRequest<{ success: boolean; diceRoll: DiceRoll }>(`/dice-rolls/${id}`);
  }
};