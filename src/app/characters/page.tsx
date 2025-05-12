'use client';

import { useEffect, useState } from 'react';
import { characterService, Character } from '../../services/api/characterService';
import Link from 'next/link';
import styles from '../../styles/characters.module.scss';

export default function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await characterService.getCharacters();
      setCharacters(response.characters);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCharacters = characters.filter(
    (char) =>
      char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      char.race.toLowerCase().includes(searchTerm.toLowerCase()) ||
      char.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.charactersContainer}>
      <div className={styles.header}>
        <h1>Vos personnages</h1>
        <Link href="/characters/create" className={styles.createButton}>
          Créer un personnage
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Rechercher un personnage..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {loading ? (
        <div className={styles.loading}>Chargement des personnages...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : filteredCharacters.length === 0 ? (
        <div className={styles.noCharacters}>
          <p>Aucun personnage trouvé.</p>
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className={styles.clearSearch}>
              Effacer la recherche
            </button>
          )}
        </div>
      ) : (
        <div className={styles.charactersList}>
          {filteredCharacters.map((character) => (
            <Link
              key={character.id}
              href={`/characters/${character.id}`}
              className={styles.characterCard}
            >
              <div className={styles.characterHeader}>
                <h2 className={styles.characterName}>{character.name}</h2>
                <span className={styles.characterLevel}>Niveau {character.level}</span>
              </div>
              <div className={styles.characterInfo}>
                <p className={styles.characterRaceClass}>
                  {character.race} {character.class}
                </p>
                {character.session && (
                  <p className={styles.characterSession}>
                    Session: {character.session.title}
                  </p>
                )}
              </div>
              {character.background && (
                <p className={styles.characterBackground}>{character.background}</p>
              )}
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
      )}
    </div>
  );
}