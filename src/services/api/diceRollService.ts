import { apiRequest } from './apiClient';

export interface DiceRoll {
  id: number;
  rollExpression: string;
  result: number;
  userId: number;
  sessionId: number;
  characterId?: number | null;
  timestamp: string;
  metadata?: any;
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
      body: params,
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