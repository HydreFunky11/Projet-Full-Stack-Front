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

// Interface pour les participants
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
interface DetailedSession extends Session {
  participants: Participant[];
  diceRolls?: DiceRoll[];
}

export default function SessionDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [session, setSession] = useState<DetailedSession | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [diceRolls, setDiceRolls] = useState<DiceRoll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scheduledAt: '',
    status: 'planifiée',
  });
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les détails de la session
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        const response = await sessionService.getSessionById(Number(id));
        
        // Convertir explicitement la session en DetailedSession
        const detailedSession: DetailedSession = {
          ...response.session,
          // Assurez-vous que les participants ont la propriété sessionId
          participants: response.session.participants?.map(participant => ({
            ...participant,
            sessionId: Number(id)  // Ajouter la propriété sessionId manquante
          })) || [],
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
          status: response.session.status,
        });
        
        // Récupérer les personnages de la session
        const charactersResponse = await characterService.getSessionCharacters(Number(id));
        setCharacters(charactersResponse.characters);
        
        // Les jets de dés sont déjà récupérés avec la session dans votre API
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      const response = await sessionService.updateSession(Number(id), formData);
      
      // Convertir la session mise à jour en DetailedSession
      if (session) {
        const updatedDetailedSession: DetailedSession = {
          ...response.session,
          participants: session.participants,  // Conserver les participants existants
          diceRolls: session.diceRolls  // Conserver les jets de dés existants
        };
        setSession(updatedDetailedSession);
      }
      
      setEditMode(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
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
        {isGameMaster && (
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
                  onParticipantsChange={(updatedParticipants) => {
                    setSession({
                      ...session,
                      participants: updatedParticipants
                    });
                  }}
                />
              </div>
            )}
            
            {activeTab === 'characters' && (
              <div className={styles.charactersTab}>
                {characters.length > 0 ? (
                  <div className={styles.charactersList}>
                    {characters.map((character) => (
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
                          Joueur: {character.user.username}
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
                <DiceRoller 
                  sessionId={session.id} 
                  onNewRoll={(newRoll) => {
                    setDiceRolls([newRoll, ...diceRolls]);
                  }}
                />
                
                <div className={styles.diceRollHistory}>
                  <h3>Historique des jets de dés</h3>
                  {diceRolls.length > 0 ? (
                    <ul className={styles.rollsList}>
                      {diceRolls.map((roll) => (
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