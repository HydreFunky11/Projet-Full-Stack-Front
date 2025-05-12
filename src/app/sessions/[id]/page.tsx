'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { sessionService, Session } from '../../../services/api/sessionService';
import { characterService, Character } from '../../../services/api/characterService';
import { useAuth } from '../../../contexts/authContext';
import Link from 'next/link';
import DiceRoller from '../../../components/diceRoller';
import ParticipantManager from '../../../components/participantManager';
import { DiceRoll } from '../../../services/api/diceRollService';
import styles from '../../../styles/sessionDetail.module.scss';

// Interface pour définir la structure des participants retournés par l'API
interface ApiParticipant {
  id: number;
  userId: number;
  role: string;
  user: {
    username: string;
  };
  character?: {
    id: number;
    name: string;
  } | null;
}

// Interface pour les participants dans votre application
interface Participant {
  id: number;
  userId: number;
  sessionId: number;
  characterId?: number | null;
  role: string;
  user: {
    id: number;
    username: string;
    email?: string;
  };
  character?: {
    id: number;
    name: string;
  } | null;
}

// Interface étendue pour Session avec participants
interface DetailedSession extends Omit<Session, 'participants'> {
  participants: Participant[];
  diceRolls?: DiceRoll[];
}

// Interface pour la session retournée par l'API
interface ApiSession extends Session {
  participants: ApiParticipant[];
}

export default function SessionDetail() {
  const params = useParams();
  const router = useRouter();
  const { user , isAuthenticated } = useAuth();
  
  // Déclarations des états
  const [session, setSession] = useState<DetailedSession | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [diceRolls, setDiceRolls] = useState<DiceRoll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scheduledAt: '',
    status: 'planifiée'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les détails de la session
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        const sessionId = Number(id);
        const response = await sessionService.getSessionById(sessionId);
        
        // Type assertion pour traiter les participants comme ApiParticipant[]
        const apiParticipants = response.session.participants as ApiParticipant[];

        // Convertir les participants de l'API au format attendu par l'application
        const mappedParticipants: Participant[] = apiParticipants?.map(p => ({
          id: p.id,
          userId: p.userId,
          sessionId: sessionId,
          role: p.role,
          user: {
            id: p.userId, // Utiliser userId comme id utilisateur
            username: p.user.username,
            email: undefined // Email optionnel
          },
          character: p.character || null,
          characterId: p.character?.id || null
        })) || [];
        
        // Créer la session détaillée
        const detailedSession: DetailedSession = {
          ...response.session,
          participants: mappedParticipants,
          diceRolls: ('diceRolls' in response.session) 
            ? (response.session as unknown as { diceRolls: DiceRoll[] }).diceRolls 
            : []
        };
        
        setSession(detailedSession);
        
        // Initialiser le formulaire avec les données de la session
        setFormData({
          title: response.session.title,
          description: response.session.description || '',
          scheduledAt: response.session.scheduledAt 
            ? new Date(response.session.scheduledAt).toISOString().split('T')[0]
            : '',
          status: response.session.status
        });

        // Récupérer les personnages de la session
        const charactersResponse = await characterService.getSessionCharacters(sessionId);
        setCharacters(charactersResponse.characters);
        
        // Récupérer les jets de dés si disponibles
        if ('diceRolls' in response.session) {
          setDiceRolls((response.session as unknown as { diceRolls: DiceRoll[] }).diceRolls || []);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
  if (!loading && !isAuthenticated) {
    router.push(`/login?from=/sessions/${params.id}`);
  }
}, [isAuthenticated, loading, router, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      const response = await sessionService.updateSession(Number(id), formData);
      
      // Conserver les participants et diceRolls existants
      if (session) {
        setSession({
          ...response.session,
          participants: session.participants,
          diceRolls: session.diceRolls
        } as DetailedSession);
      }
      
      setEditMode(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Modifier également le gestionnaire de mise à jour des participants
  const handleParticipantsChange = (updatedParticipants: Participant[]) => {
    if (session) {
      // Convertir les participants mis à jour au format attendu
      const typedParticipants: Participant[] = updatedParticipants.map(p => ({
        id: p.id,
        userId: p.userId,
        sessionId: session.id,
        role: p.role,
        user: {
          id: p.user.id || p.userId, // Utiliser l'id existant ou le userId
          username: p.user.username,
          email: p.user.email
        },
        character: p.character,
        characterId: p.character?.id || null
      }));

      setSession({
        ...session,
        participants: typedParticipants
      });
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette session ? Cette action est irréversible.')) {
      try {
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        await sessionService.deleteSession(Number(id));
        router.push('/sessions');
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

const isGameMaster = user && session && user.id === session.gmId;
const isAdmin = user && session && session.participants.some(
  p => p.userId === user.id && p.role === 'admin'
);
const canModify = isGameMaster || isAdmin;

  if (loading) {
    return <div className={styles.loading}>Chargement des détails de la session...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!session) {
    return <div className={styles.notFound}>Session non trouvée</div>;
  }

  return (
    <div className={styles.sessionDetail}>
      <div className={styles.header}>
        <Link href="/sessions" className={styles.backButton}>
          &larr; Retour aux sessions
        </Link>
        {canModify && (
          <div className={styles.actions}>
            <button 
              onClick={() => setEditMode(!editMode)} 
              className={`${styles.actionButton} ${editMode ? styles.cancel : ''}`}
            >
              {editMode ? 'Annuler' : 'Modifier'}
            </button>
            {!editMode && (
              <button onClick={handleDelete} className={`${styles.actionButton} ${styles.delete}`}>
                Supprimer
              </button>
            )}
          </div>
        )}
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <h1>Modifier la session</h1>
          
          <div className={styles.formGroup}>
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="scheduledAt">Date prévue</label>
              <input
                type="date"
                id="scheduledAt"
                name="scheduledAt"
                value={formData.scheduledAt}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="status">Statut</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="planifiée">Planifiée</option>
                <option value="en cours">En cours</option>
                <option value="terminée">Terminée</option>
              </select>
            </div>
          </div>
          
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              Enregistrer les modifications
            </button>
            <button 
              type="button" 
              onClick={() => setEditMode(false)} 
              className={styles.cancelButton}
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.sessionHeader}>
            <div>
              <h1>{session.title}</h1>
              <div className={styles.sessionMeta}>
                <span className={`${styles.status} ${styles[session.status]}`}>
                  {session.status}
                </span>
                <span className={styles.gamemaster}>
                  MJ: {session.gm.username}
                </span>
                {session.scheduledAt && (
                  <span className={styles.date}>
                    Date: {new Date(session.scheduledAt).toLocaleDateString('fr-FR')}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'info' ? styles.active : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Informations
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'participants' ? styles.active : ''}`}
              onClick={() => setActiveTab('participants')}
            >
              Participants ({session.participants.length})
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'characters' ? styles.active : ''}`}
              onClick={() => setActiveTab('characters')}
            >
              Personnages ({characters.length})
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'diceRolls' ? styles.active : ''}`}
              onClick={() => setActiveTab('diceRolls')}
            >
              Jets de dés
            </button>
          </div>
          
          <div className={styles.tabContent}>
            {activeTab === 'info' && (
              <div className={styles.infoTab}>
                {session.description ? (
                  <div className={styles.description}>
                    <h2>Description</h2>
                    <p>{session.description}</p>
                  </div>
                ) : (
                  <p className={styles.noDescription}>Aucune description disponible</p>
                )}
              </div>
            )}
            
            {activeTab === 'participants' && (
              <div className={styles.participantsTab}>
                <ParticipantManager 
                  sessionId={session.id} 
                  participants={session.participants} 
                  isGameMaster={isGameMaster}
                  onParticipantsChange={handleParticipantsChange}
                />
              </div>
            )}
            
            {activeTab === 'characters' && (
              <div className={styles.charactersTab}>
                {characters.length > 0 ? (
                  <div className={styles.charactersList}>
                    {characters.map((character: Character) => (
                      <Link
                        key={character.id}
                        href={`/characters/${character.id}`}
                        className={styles.characterCard}
                      >
                        <div className={styles.characterHeader}>
                          <h3>{character.name}</h3>
                          <span>Niv. {character.level}</span>
                        </div>
                        <p className={styles.characterMeta}>
                          {character.race} {character.class}
                        </p>
                        <p className={styles.characterOwner}>
                          Joueur: {character.user?.username || 'Inconnu'}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className={styles.noCharacters}>
                    Aucun personnage dans cette session
                  </p>
                )}
              </div>
            )}
            
            {activeTab === 'diceRolls' && (
              <div className={styles.diceRollsTab}>
                Seul le MJ peut effectuer des jets de dés.
                <DiceRoller 
                  sessionId={session.id} 
                  onNewRoll={(newRoll: DiceRoll) => {
                    setDiceRolls([newRoll, ...diceRolls]);
                  }}
                />
                
                <div className={styles.diceRollHistory}>
                  <h3>Historique des jets de dés</h3>
                  {diceRolls.length > 0 ? (
                    <ul className={styles.rollsList}>
                      {diceRolls.map((roll: DiceRoll) => (
                        <li key={roll.id} className={styles.rollItem}>
                          <div className={styles.rollHeader}>
                            <span className={styles.rollExpression}>
                              {roll.rollExpression}
                            </span>
                            <span className={styles.rollResult}>
                              {roll.result}
                            </span>
                          </div>
                          <div className={styles.rollMeta}>
                            <span className={styles.rollUser}>
                              {roll.user.username}
                            </span>
                            {roll.character && (
                              <span className={styles.rollCharacter}>
                                ({roll.character.name})
                              </span>
                            )}
                            <span className={styles.rollTime}>
                              {new Date(roll.timestamp).toLocaleTimeString('fr-FR')}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.noRolls}>Aucun jet de dés effectué</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}