'use client';

import { useState, useEffect } from 'react';
import { sessionService } from '../services/api/sessionService';
import { useAuth } from '../contexts/authContext';
import styles from '../styles/participantManager.module.scss';

interface Participant {
  id: number;
  userId: number;
  role: string;
  user: {
    id: number;
    username: string;
  };
  character?: {
    id: number;
    name: string;
  } | null;
}

interface ParticipantManagerProps {
  sessionId: number;
  participants: Participant[];
  isGameMaster: boolean;
  onParticipantsChange: (participants: Participant[]) => void;
}

export default function ParticipantManager({ 
  sessionId, 
  participants,
  isGameMaster, 
  onParticipantsChange 
}: ParticipantManagerProps) {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState('joueur');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Charger la liste des utilisateurs (uniquement pour le GM)
    if (isGameMaster) {
      const fetchUsers = async () => {
        try {
          // Cette API doit être implémentée pour récupérer tous les utilisateurs
          const response = await fetch('/api/users');
          const data = await response.json();
          
          // Filtrer les utilisateurs qui ne sont pas déjà participants
          const existingUserIds = participants.map((p) => p.userId);
          const availableUsers = data.users.filter(
            (u: any) => !existingUserIds.includes(u.id)
          );
          
          setAllUsers(availableUsers);
          
          if (availableUsers.length > 0) {
            setSelectedUserId(availableUsers[0].id);
          }
        } catch (error) {
          console.error('Erreur lors du chargement des utilisateurs:', error);
        }
      };
      
      fetchUsers();
    }
  }, [isGameMaster, participants, sessionId]);

  const handleAddParticipant = async () => {
    if (!selectedUserId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await sessionService.addParticipant(
        sessionId,
        selectedUserId,
        selectedRole
      );
      
      // Mettre à jour la liste des participants
      if (response.success) {
        // Create a new participant with the selected user
        const selectedUser = allUsers.find(u => u.id === selectedUserId);
        const newParticipant: Participant = {
          id: Date.now(), // Temporary ID until refreshed from server
          userId: selectedUserId,
          role: selectedRole,
          user: {
            id: selectedUserId,
            username: selectedUser?.username || 'Unknown'
          }
        };
        onParticipantsChange([...participants, newParticipant]);
      } else {
        throw new Error(response.message);
      }
      
      // Mettre à jour la liste des utilisateurs disponibles
      setAllUsers(allUsers.filter((u) => u.id !== selectedUserId));
      
      // Réinitialiser la sélection
      if (allUsers.length > 1) {
        setSelectedUserId(allUsers.find((u) => u.id !== selectedUserId)?.id || null);
      } else {
        setSelectedUserId(null);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveParticipant = async (participantId: number) => {
    try {
      setLoading(true);
      setError(null);
      
      await sessionService.removeParticipant(sessionId, participantId);
      
      // Trouver le participant supprimé
      const removedParticipant = participants.find((p) => p.id === participantId);
      
      // Mettre à jour la liste des participants
      onParticipantsChange(participants.filter((p) => p.id !== participantId));
      
      // Ajouter l'utilisateur supprimé à la liste des utilisateurs disponibles
      if (removedParticipant && isGameMaster) {
        setAllUsers([...allUsers, removedParticipant.user]);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.participantManager}>
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.participantsList}>
        <h3>Participants</h3>
        
        {participants.length === 0 ? (
          <p className={styles.noParticipants}>Aucun participant</p>
        ) : (
          <ul className={styles.participants}>
            {participants.map((participant) => (
              <li key={participant.id} className={styles.participantItem}>
                <div className={styles.participantInfo}>
                  <span className={styles.username}>{participant.user.username}</span>
                  <span className={styles.role}>{participant.role}</span>
                  {participant.character && (
                    <span className={styles.character}>
                      Personnage: {participant.character.name}
                    </span>
                  )}
                </div>
                
                {(isGameMaster || user?.id === participant.userId) && (
                  <button
                    onClick={() => handleRemoveParticipant(participant.id)}
                    className={styles.removeButton}
                    disabled={loading}
                  >
                    Retirer
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {isGameMaster && allUsers.length > 0 && (
        <div className={styles.addParticipant}>
          <h3>Ajouter un participant</h3>
          
          <div className={styles.addForm}>
            <select
              value={selectedUserId || ''}
              onChange={(e) => setSelectedUserId(Number(e.target.value))}
              className={styles.userSelect}
              disabled={loading || allUsers.length === 0}
            >
              {allUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>
            
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className={styles.roleSelect}
              disabled={loading}
            >
              <option value="joueur">Joueur</option>
              <option value="spectateur">Spectateur</option>
              <option value="admin">Admin</option>
            </select>
            
            <button
              onClick={handleAddParticipant}
              className={styles.addButton}
              disabled={loading || !selectedUserId}
            >
              Ajouter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}