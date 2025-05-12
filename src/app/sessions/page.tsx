'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/authContext';
import styles from '../../styles/sessions.module.scss';
import { apiRequest } from '../../services/api/apiClient';

interface Session {
  id: number;
  title: string;
  description: string | null;
  status: string;
  scheduledAt: string | null;
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

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    status: 'planifiée',
    scheduledAt: ''
  });
  
  // Récupérer l'état d'authentification pour afficher ou non les fonctionnalités de création
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Récupérer les sessions indépendamment de l'état d'authentification
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      
      // Requête modifiée pour récupérer les sessions publiques
      // Note: Vous devez modifier votre API pour supporter cette fonctionnalité
      const endpoint = isAuthenticated ? '/sessions' : '/sessions/public';
      
      const response = await apiRequest<{ success: boolean; sessions: Session[] }>(endpoint, {
        // Si l'utilisateur n'est pas authentifié, ne pas envoyer le token
        includeAuth: isAuthenticated
      });
      
      if (response.success) {
        setSessions(response.sessions);
      } else {
        setError('Erreur lors de la récupération des sessions');
      }
    } catch (err) {
      setError('Impossible de récupérer les sessions');
      console.error('Erreur lors de la récupération des sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      router.push('/login?from=/sessions');
      return;
    }
    
    try {
      setLoading(true);
      const response = await apiRequest<{ success: boolean; session: Session }>('/sessions', {
        method: 'POST',
        body: newSession
      });
      
      if (response.success) {
        // Ajouter la nouvelle session à la liste
        setSessions([...sessions, response.session]);
        // Fermer le formulaire et réinitialiser les champs
        setShowCreateForm(false);
        setNewSession({
          title: '',
          description: '',
          status: 'planifiée',
          scheduledAt: ''
        });
      }
    } catch (err) {
      setError('Impossible de créer la session');
      console.error('Erreur lors de la création de la session:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Non programmée';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'planifiée': return styles.planned;
      case 'en_cours': return styles.inProgress;
      case 'terminée': return styles.completed;
      default: return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planifiée': return 'Planifiée';
      case 'en_cours': return 'En cours';
      case 'terminée': return 'Terminée';
      default: return status;
    }
  };

  if (loading && sessions.length === 0) {
    return (
      <div className={styles.sessionsContainer}>
        <h1>Sessions de jeu</h1>
        <div className={styles.loading}>Chargement des sessions...</div>
      </div>
    );
  }

  return (
    <div className={styles.sessionsContainer}>
      <div className={styles.header}>
        <h1>Sessions de jeu</h1>
        {isAuthenticated ? (
          <button 
            className={styles.createButton}
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? 'Annuler' : 'Créer une session'}
          </button>
        ) : (
          <Link href="/login?from=/sessions" className={styles.createButton}>
            Se connecter pour créer
          </Link>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {isAuthenticated && showCreateForm && (
        <div className={styles.createFormContainer}>
          <h2>Nouvelle session</h2>
          <form onSubmit={handleCreateSession} className={styles.createForm}>
            {/* Formulaire inchangé */}
            <div className={styles.formGroup}>
              <label htmlFor="title">Titre *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newSession.title}
                onChange={handleInputChange}
                required
                placeholder="Ex: La quête du dragon d'or"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newSession.description}
                onChange={handleInputChange}
                placeholder="Décrivez votre session..."
                rows={4}
              />
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="status">Statut</label>
                <select
                  id="status"
                  name="status"
                  value={newSession.status}
                  onChange={handleInputChange}
                >
                  <option value="planifiée">Planifiée</option>
                  <option value="en_cours">En cours</option>
                  <option value="terminée">Terminée</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="scheduledAt">Date prévue</label>
                <input
                  type="datetime-local"
                  id="scheduledAt"
                  name="scheduledAt"
                  value={newSession.scheduledAt}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Création en cours...' : 'Créer la session'}
              </button>
            </div>
          </form>
        </div>
      )}

      {!loading && sessions.length === 0 ? (
        <div className={styles.noSessions}>
          <p>Aucune session disponible actuellement.</p>
          {!isAuthenticated && (
            <p>
              <Link href="/login?from=/sessions" className={styles.loginLink}>
                Connectez-vous
              </Link> pour créer votre première session !
            </p>
          )}
        </div>
      ) : (
        <div className={styles.sessionsList}>
          {sessions.map((session) => (
            <Link href={`/sessions/${session.id}`} key={session.id} className={styles.sessionCard}>
              <div className={styles.sessionHeader}>
                <h2>{session.title}</h2>
                <span className={`${styles.status} ${getStatusClass(session.status)}`}>
                  {getStatusText(session.status)}
                </span>
              </div>
              
              <div className={styles.sessionInfo}>
                <p className={styles.description}>
                  {session.description ? (
                    session.description.length > 150 
                      ? `${session.description.substring(0, 150)}...` 
                      : session.description
                  ) : (
                    <span className={styles.noDescription}>Pas de description</span>
                  )}
                </p>
                
                <div className={styles.metadata}>
                  <div className={styles.gmInfo}>
                    <span className={styles.label}>Maître de jeu:</span> {session.gm.username}
                  </div>
                  
                  {session.scheduledAt && (
                    <div className={styles.dateInfo}>
                      <span className={styles.label}>Date:</span> {formatDate(session.scheduledAt)}
                    </div>
                  )}
                  
                  <div className={styles.stats}>
                    <div>
                      <span className={styles.count}>{session.participants?.length || 0}</span> participants
                    </div>
                    <div>
                      <span className={styles.count}>{session._count?.characters || 0}</span> personnages
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}