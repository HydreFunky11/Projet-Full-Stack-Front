'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { sessionService, Session } from '../../services/api/sessionService';
import { characterService, Character } from '../../services/api/characterService';
import Link from 'next/link';
import styles from '../../styles/dashboard.module.scss';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Rediriger si non authentifié
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?from=/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Récupérer les sessions et personnages de l'utilisateur
        const sessionsResponse = await sessionService.getSessions();
        const charactersResponse = await characterService.getCharacters();
        
        setSessions(sessionsResponse.sessions.slice(0, 5)); // Afficher les 5 dernières sessions
        setCharacters(charactersResponse.characters.slice(0, 5)); // Afficher les 5 derniers personnages
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
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (error) {
    return <div className={styles.error}>Erreur: {error}</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1>Tableau de bord</h1>
        <p className={styles.welcome}>Bienvenue, {user?.username}!</p>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h2>Vos dernières sessions</h2>
          {sessions.length > 0 ? (
            <ul className={styles.list}>
              {sessions.map((session) => (
                <li key={session.id} className={styles.listItem}>
                  <Link href={`/sessions/${session.id}`} className={styles.link}>
                    <span className={styles.title}>{session.title} </span>
                    <span className={`${styles.recentStatus} ${getStatusClass(session.status)}`}>
                      {session.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noContent}>Vous n'avez pas encore de sessions.</p>
          )}
          <Link href="/sessions" className={styles.viewAllLink}>
            Voir toutes les sessions
          </Link>
        </div>
        
        <div className={styles.statCard}>
          <h2>Vos personnages</h2>
          {characters.length > 0 ? (
            <ul className={styles.list}>
              {characters.map((character) => (
                <li key={character.id} className={styles.listItem}>
                  <Link href={`/characters/${character.id}`} className={styles.link}>
                    <span className={styles.title}>{character.name}</span>
                    <span className={styles.subtitle}>
                      {character.race} {character.class} (Niv. {character.level})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noContent}>Vous n'avez pas encore de personnages.</p>
          )}
          <Link href="/characters" className={styles.viewAllLink}>
            Voir tous les personnages
          </Link>
        </div>
      </div>
      
      <div className={styles.actions}>
        <Link href="/sessions/create" className={styles.actionButton}>
          Créer une session
        </Link>
        <Link href="/characters/create" className={styles.actionButton}>
          Créer un personnage
        </Link>
      </div>
    </div>
  );
}

// Fonction utilitaire pour obtenir la classe CSS correspondant au statut
function getStatusClass(status: string) {
  switch (status) {
    case 'planifiée': return styles.planned;
    case 'en cours': return styles.active;
    case 'terminée': return styles.completed;
    default: return '';
  }
}