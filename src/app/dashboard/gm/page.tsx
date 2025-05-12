'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/authContext';
import { sessionService } from '../../../services/api/sessionService';
import { characterService } from '../../../services/api/characterService';
import Link from 'next/link';
import styles from '../../../styles/gmDashboard.module.scss';

export default function GMDashboard() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('sessions');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les sessions où l'utilisateur est GM
        const sessionsResponse = await sessionService.getSessions({ gmId: user?.id });
        setSessions(sessionsResponse.sessions);
        
        // Récupérer tous les personnages dans ces sessions
        const charactersPromises = sessionsResponse.sessions.map(async (session: any) => {
          const response = await characterService.getSessionCharacters(session.id);
          return response.characters;
        });
        
        const allCharacters = (await Promise.all(charactersPromises)).flat();
        setCharacters(allCharacters);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return <div className={styles.loading}>Chargement du tableau de bord MJ...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // Vérifier si l'utilisateur est GM d'au moins une session
  if (sessions.length === 0) {
    return (
      <div className={styles.noSessions}>
        <h1>Tableau de bord MJ</h1>
        <p>Vous n'êtes maître du jeu d'aucune session.</p>
        <Link href="/sessions/create" className={styles.createButton}>
          Créer une nouvelle session
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.gmDashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Tableau de bord MJ</h1>
        <Link href="/sessions/create" className={styles.createButton}>
          Créer une nouvelle session
        </Link>
      </div>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'sessions' ? styles.active : ''}`}
          onClick={() => setActiveTab('sessions')}
        >
          Mes sessions ({sessions.length})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'characters' ? styles.active : ''}`}
          onClick={() => setActiveTab('characters')}
        >
          Personnages ({characters.length})
        </button>
      </div>
      
      <div className={styles.tabContent}>
        {activeTab === 'sessions' && (
          <div className={styles.sessionsTab}>
            {sessions.map((session) => (
              <div key={session.id} className={styles.sessionCard}>
                <div className={styles.sessionHeader}>
                  <h2 className={styles.sessionTitle}>
                    <Link href={`/sessions/${session.id}`}>
                      {session.title}
                    </Link>
                  </h2>
                  <span className={`${styles.status} ${styles[session.status]}`}>
                    {session.status}
                  </span>
                </div>
                
                <div className={styles.sessionStats}>
                  <div className={styles.statItem}>
                    <span className={styles.label}>Participants</span>
                    <span className={styles.value}>{session.participants?.length || 0}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.label}>Personnages</span>
                    <span className={styles.value}>{session._count?.characters || 0}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.label}>Jets de dés</span>
                    <span className={styles.value}>{session._count?.diceRolls || 0}</span>
                  </div>
                </div>
                
                {session.scheduledAt && (
                  <div className={styles.sessionDate}>
                    <span className={styles.label}>Date prévue</span>
                    <span className={styles.value}>
                      {new Date(session.scheduledAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                )}
                
                <div className={styles.sessionActions}>
                  <Link href={`/sessions/${session.id}`} className={styles.viewButton}>
                    Voir la session
                  </Link>
                  <Link 
                    href={`/sessions/${session.id}?tab=participants`} 
                    className={styles.manageButton}
                  >
                    Gérer les participants
                  </Link>
                </div>
              </div>
            ))}
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
                      <h3 className={styles.characterName}>{character.name}</h3>
                      <span className={styles.characterLevel}>Niv. {character.level}</span>
                    </div>
                    <div className={styles.characterInfo}>
                      <p className={styles.characterRaceClass}>
                        {character.race} {character.class}
                      </p>
                      <p className={styles.characterOwner}>
                        Joueur: {character.user.username}
                      </p>
                      {character.session && (
                        <p className={styles.characterSession}>
                          Session: {character.session.title}
                        </p>
                      )}
                    </div>
                    <div className={styles.characterStatus}>
                      <span
                        className={`${styles.statusIndicator} ${
                          character.isAlive ? styles.alive : styles.dead
                        }`}
                      >
                        {character.isAlive ? 'Vivant' : 'Décédé'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className={styles.noCharacters}>
                Aucun personnage dans vos sessions
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}