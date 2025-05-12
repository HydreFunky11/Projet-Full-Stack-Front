'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { characterService } from '../services/api/characterService';
import { diceRollService } from '../services/api/diceRollService';
import styles from '../styles/diceRoller.module.scss';

interface DiceRollerProps {
  sessionId: number;
  onNewRoll: (roll: any) => void;
}

export default function DiceRoller({ sessionId, onNewRoll }: DiceRollerProps) {
  const { user } = useAuth();
  const [expression, setExpression] = useState('1d20');
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [characterLoading, setCharacterLoading] = useState(true);

  // Charger les personnages de l'utilisateur dans cette session
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setCharacterLoading(true);
        const response = await characterService.getCharacters();
        
        // Filtrer les personnages qui sont dans cette session
        const sessionCharacters = response.characters.filter(
          character => character.sessionId === sessionId
        );
        
        setCharacters(sessionCharacters);
        
        // Sélectionner automatiquement le premier personnage s'il y en a un
        if (sessionCharacters.length > 0) {
          setSelectedCharacterId(sessionCharacters[0].id);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des personnages:', error);
      } finally {
        setCharacterLoading(false);
      }
    };
    
    if (user && sessionId) {
      fetchCharacters();
    }
  }, [user, sessionId]);

  // Fonction pour gérer les préréglages de dés
  const handlePresetDice = (preset: string) => {
    setExpression(preset);
  };

  // Fonction pour lancer les dés
  const handleRollDice = async () => {
    try {
      setLoading(true);
      
      const roll = await diceRollService.rollDice({
        expression,
        sessionId,
        characterId: selectedCharacterId
      });
      
      // Notifier le parent du nouveau jet de dés
      onNewRoll(roll.diceRoll);
      
    } catch (error) {
      console.error('Erreur lors du lancer de dés:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.diceRoller}>
      <h3>Lancer de dés</h3>
      
      <div className={styles.diceForm}>
        <div className={styles.presets}>
          <button 
            type="button" 
            onClick={() => handlePresetDice('1d4')}
            className={styles.presetButton}
          >
            d4
          </button>
          <button 
            type="button" 
            onClick={() => handlePresetDice('1d6')}
            className={styles.presetButton}
          >
            d6
          </button>
          <button 
            type="button" 
            onClick={() => handlePresetDice('1d8')}
            className={styles.presetButton}
          >
            d8
          </button>
          <button 
            type="button" 
            onClick={() => handlePresetDice('1d10')}
            className={styles.presetButton}
          >
            d10
          </button>
          <button 
            type="button" 
            onClick={() => handlePresetDice('1d12')}
            className={styles.presetButton}
          >
            d12
          </button>
          <button 
            type="button" 
            onClick={() => handlePresetDice('1d20')}
            className={styles.presetButton}
          >
            d20
          </button>
          <button 
            type="button" 
            onClick={() => handlePresetDice('1d100')}
            className={styles.presetButton}
          >
            d100
          </button>
        </div>
        
        <div className={styles.inputRow}>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="ex: 2d6+3"
            className={styles.expressionInput}
          />
          
          {!characterLoading && characters.length > 0 && (
            <select
              value={selectedCharacterId || ''}
              onChange={(e) => setSelectedCharacterId(e.target.value ? Number(e.target.value) : null)}
              className={styles.characterSelect}
            >
              <option value="">Sans personnage</option>
              {characters.map((character) => (
                <option key={character.id} value={character.id}>
                  {character.name}
                </option>
              ))}
            </select>
          )}
          
          <button
            onClick={handleRollDice}
            disabled={loading || !expression}
            className={styles.rollButton}
          >
            {loading ? 'Lancement...' : 'Lancer'}
          </button>
        </div>
      </div>
      
      <div className={styles.diceHelp}>
        <p>Format: XdY+Z (ex: 2d6+3)</p>
        <p>X = nombre de dés, Y = faces par dé, Z = modificateur</p>
      </div>
    </div>
  );
}