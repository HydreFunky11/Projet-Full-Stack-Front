'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { characterService } from '../../../services/api/characterService';
import { sessionService } from '../../../services/api/sessionService';
import styles from '../../../styles/characterForm.module.scss';

interface Session {
  id: number;
  title: string;
  status: string;
}

export default function CreateCharacter() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    race: '',
    class: '',
    level: 1,
    background: '',
    inventory: '',
    stats: JSON.stringify({
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      hitPoints: 0,
      maxHitPoints: 0
    }, null, 2),
    isAlive: true,
    sessionId: ''
  });

  // Charger les sessions disponibles
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoadingSessions(true);
        const response = await sessionService.getSessions();
        // Filtrer les sessions pour n'inclure que celles où l'utilisateur est participant
        const availableSessions = response.sessions.filter(
          session => session.status !== 'terminée'
        );
        setSessions(availableSessions);
      } catch (err) {
        console.error("Erreur lors du chargement des sessions:", err);
      } finally {
        setLoadingSessions(false);
      }
    };

    fetchSessions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData({ ...formData, [name]: parseInt(value) || 1 });
    } else if (name === 'stats') {
      try {
        // Valider que c'est un JSON valide
        JSON.parse(value);
        setFormData({ ...formData, [name]: value });
      } catch (err) {
        // En cas d'erreur de format JSON, conserver l'ancienne valeur
        console.error("Format JSON invalide", err);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Préparer les données à envoyer
      const characterData = {
        ...formData,
        level: parseInt(formData.level.toString()),
        sessionId: formData.sessionId ? parseInt(formData.sessionId) : null
      };

      // Appeler l'API pour créer le personnage
      const response = await characterService.createCharacter(characterData);
      
      // Rediriger vers la page des détails du personnage
      router.push(`/characters/${response.character.id}`);
    } catch (err) {
      setError((err as Error).message || "Une erreur est survenue lors de la création du personnage");
      console.error("Erreur lors de la création du personnage:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h1>Créer un nouveau personnage</h1>
        <Link href="/characters" className={styles.backButton}>
          &larr; Retour aux personnages
        </Link>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.characterForm}>
        <div className={styles.formSection}>
          <h2>Informations de base</h2>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom du personnage*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="race">Race*</label>
              <input
                type="text"
                id="race"
                name="race"
                value={formData.race}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="class">Classe*</label>
              <input
                type="text"
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="level">Niveau*</label>
              <input
                type="number"
                id="level"
                name="level"
                min="1"
                max="20"
                value={formData.level}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="background">Historique</label>
            <textarea
              id="background"
              name="background"
              value={formData.background}
              onChange={handleChange}
              className={styles.formInput}
              rows={4}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Attributs & Inventaire</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="stats">Statistiques (Format JSON)*</label>
            <textarea
              id="stats"
              name="stats"
              value={formData.stats}
              onChange={handleChange}
              className={styles.formInput}
              rows={10}
              required
            />
            <div className={styles.formHint}>
              <details>
                <summary>Exemple de format</summary>
                <pre>
                  {`{
  "strength": 10,
  "dexterity": 10,
  "constitution": 10,
  "intelligence": 10,
  "wisdom": 10,
  "charisma": 10,
  "hitPoints": 0,
  "maxHitPoints": 0
}`}
                </pre>
              </details>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="inventory">Inventaire</label>
            <textarea
              id="inventory"
              name="inventory"
              value={formData.inventory}
              onChange={handleChange}
              className={styles.formInput}
              rows={4}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Session</h2>
          <div className={styles.formGroup}>
            <label htmlFor="sessionId">Associer à une session</label>
            <select
              id="sessionId"
              name="sessionId"
              value={formData.sessionId}
              onChange={handleChange}
              className={styles.formInput}
            >
              <option value="">Aucune session</option>
              {loadingSessions ? (
                <option disabled>Chargement des sessions...</option>
              ) : (
                sessions.map(session => (
                  <option key={session.id} value={session.id}>
                    {session.title} ({session.status})
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Création en cours...' : 'Créer le personnage'}
          </button>
          <Link href="/characters" className={styles.cancelButton}>
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}