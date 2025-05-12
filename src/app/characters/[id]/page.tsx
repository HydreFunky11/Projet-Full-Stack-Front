'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { characterService, Character } from '../../../services/api/characterService';
import { sessionService } from '../../../services/api/sessionService';
import Link from 'next/link';
import styles from '../../../styles/characterDetail.module.scss';

export default function CharacterDetail() {
  const params = useParams();
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [availableSessions, setAvailableSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    race: '',
    class: '',
    level: 1,
    background: '',
    inventory: '',
    isAlive: true,
    sessionId: null as number | null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les détails du personnage
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        const response = await characterService.getCharacterById(Number(id));
        setCharacter(response.character);
        
        // Initialiser le formulaire avec les données du personnage
        setFormData({
          name: response.character.name,
          race: response.character.race,
          class: response.character.class,
          level: response.character.level,
          background: response.character.background || '',
          inventory: response.character.inventory || '',
          isAlive: response.character.isAlive,
          sessionId: response.character.sessionId,
        });
        
        // Récupérer les sessions disponibles
        const sessionsResponse = await sessionService.getSessions();
        setAvailableSessions(sessionsResponse.sessions);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checkbox.checked,
      }));
    } else if (name === 'sessionId') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === '' ? null : Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      const response = await characterService.updateCharacter(Number(id), formData);
      setCharacter(response.character);
      setEditMode(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce personnage ? Cette action est irréversible.')) {
      try {
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        await characterService.deleteCharacter(Number(id));
        router.push('/characters');
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  if (loading) {
    return <div className={styles.loading}>Chargement des détails du personnage...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!character) {
    return <div className={styles.notFound}>Personnage non trouvé</div>;
  }

  return (
    <div className={styles.characterDetail}>
      <div className={styles.header}>
        <Link href="/characters" className={styles.backButton}>
          &larr; Retour aux personnages
        </Link>
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
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <h1>Modifier le personnage</h1>
          
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="race">Race</label>
              <input
                type="text"
                id="race"
                name="race"
                value={formData.race}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="class">Classe</label>
              <input
                type="text"
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="level">Niveau</label>
              <input
                type="number"
                id="level"
                name="level"
                min="1"
                max="20"
                value={formData.level}
                onChange={handleChange}
                required
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
              rows={4}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="inventory">Inventaire</label>
            <textarea
              id="inventory"
              name="inventory"
              value={formData.inventory}
              onChange={handleChange}
              rows={4}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="sessionId">Session</label>
            <select
              id="sessionId"
              name="sessionId"
              value={formData.sessionId === null ? '' : formData.sessionId}
              onChange={handleChange}
            >
              <option value="">Aucune session</option>
              {availableSessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="isAlive"
              name="isAlive"
              checked={formData.isAlive}
              onChange={handleChange}
            />
            <label htmlFor="isAlive">Personnage vivant</label>
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
        <div className={styles.characterInfo}>
          <div className={styles.characterHeader}>
            <h1>{character.name}</h1>
            <span className={`${styles.status} ${character.isAlive ? styles.alive : styles.dead}`}>
              {character.isAlive ? 'Vivant' : 'Décédé'}
            </span>
          </div>
          
          <div className={styles.infoCard}>
            <div className={styles.basicInfo}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Race:</span>
                <span className={styles.value}>{character.race}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Classe:</span>
                <span className={styles.value}>{character.class}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Niveau:</span>
                <span className={styles.value}>{character.level}</span>
              </div>
              {character.session && (
                <div className={styles.infoItem}>
                  <span className={styles.label}>Session:</span>
                  <Link href={`/sessions/${character.session.id}`} className={styles.sessionLink}>
                    {character.session.title}
                  </Link>
                </div>
              )}
            </div>
            
            {character.background && (
              <div className={styles.section}>
                <h2>Historique</h2>
                <p>{character.background}</p>
              </div>
            )}
            
            {character.inventory && (
              <div className={styles.section}>
                <h2>Inventaire</h2>
                <p>{character.inventory}</p>
              </div>
            )}
            {character.stats && (
              <div className={styles.section}>
                <h2>Statistiques</h2>
                <div className={styles.stats}>
                  {Object.entries(
                    typeof character.stats === 'string' 
                      ? JSON.parse(character.stats) 
                      : character.stats
                  ).map(([stat, value]) => (
                    <div key={stat} className={styles.statItem}>
                      <span className={styles.statLabel}>{stat}</span>
                      <span className={styles.statValue}> {String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}