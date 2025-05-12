import { apiRequest } from './apiClient';
import { User } from './authService';

export interface Session {
  id: number;
  title: string;
  description: string | null;
  scheduledAt: string | null;
  status: string;
  gmId: number;
  createdAt: string;
  updatedAt: string;
  gm: {
    id: number;
    username: string;
  };
  participants: {
    id: number;
    userId: number;
    role: string;
    user: {
      username: string;
    };
  }[];
  _count: {
    characters: number;
    diceRolls: number;
  };
}

export interface SessionsResponse {
  success: boolean;
  count: number;
  sessions: Session[];
}

export interface SessionResponse {
  success: boolean;
  session: Session;
}

export const sessionService = {
  getSessions: async (
    filters?: { status?: string; gmId?: number; title?: string }
  ): Promise<SessionsResponse> => {
    let queryParams = '';
    if (filters) {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.gmId) params.append('gmId', filters.gmId.toString());
      if (filters.title) params.append('title', filters.title);
      queryParams = `?${params.toString()}`;
    }
    return apiRequest<SessionsResponse>(`/sessions${queryParams}`);
  },

  getSessionById: async (id: number): Promise<SessionResponse> => {
    return apiRequest<SessionResponse>(`/sessions/${id}`);
  },

  createSession: async (sessionData: {
    title: string;
    description?: string;
    scheduledAt?: string;
    status?: string;
  }): Promise<SessionResponse> => {
    return apiRequest<SessionResponse>('/sessions', {
      method: 'POST',
      body: sessionData,
    });
  },

  updateSession: async (
    id: number,
    sessionData: {
      title?: string;
      description?: string;
      scheduledAt?: string;
      status?: string;
    }
  ): Promise<SessionResponse> => {
    return apiRequest<SessionResponse>(`/sessions/${id}`, {
      method: 'PUT',
      body: sessionData,
    });
  },

  deleteSession: async (id: number): Promise<{ success: boolean; message: string }> => {
    return apiRequest<{ success: boolean; message: string }>(`/sessions/${id}`, {
      method: 'DELETE',
    });
  },

  addParticipant: async (
    sessionId: number,
    userId: number,
    role: string
  ): Promise<{ success: boolean; message: string }> => {
    return apiRequest<{ success: boolean; message: string }>(`/sessions/${sessionId}/participants`, {
      method: 'POST',
      body: { userId, role },
    });
  },
  
  removeParticipant: async (
    sessionId: number,
    participantId: number
  ): Promise<{ success: boolean; message: string }> => {
    return apiRequest<{ success: boolean; message: string }>(
      `/sessions/${sessionId}/participants/${participantId}`,
      {
        method: 'DELETE',
      }
    );
  },
};