import { useState } from 'react';
import styles from './styles.module.scss';

const DEBUG = false;

const PlayerCard = ({ initialName, symbol, isActive, onChangeName }) => {
  DEBUG && console.log('Rendering PlayerCard component');
  DEBUG && console.log('initialName:', initialName);
  DEBUG && console.log('symbol:', symbol);
  DEBUG && console.log('isActive:', isActive);
  DEBUG && console.log('onChangeName function:', onChangeName);

  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    DEBUG && console.log('handleEditClick called');
    setIsEditing((editing) => !editing);
    if (isEditing) onChangeName({ symbol, playerName });
  };

  const handleChange = (event) => {
    DEBUG && console.log('handleChange called');
    setPlayerName(event.target.value);
  };

  const handleKeyDown = (event) => {
    DEBUG && console.log('handleKeyDown called');
    if (event.key === 'Enter') {
      handleEditClick();
    }
  };

  DEBUG && console.log('playerName:', playerName);
  DEBUG && console.log('isEditing:', isEditing);

  return (
    <li className={`${styles.playerCard}`}>
      <span className={styles.playerNameContainer}>
        {isEditing ? (
          <input
            className={styles.playerNameInputField}
            type="text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
          />
        ) : (
          <span
            className={`${styles.playerName} ${
              isActive ? styles.activePlayer : undefined
            }`}
          >
            {playerName}
          </span>
        )}
        <span
          className={`${styles.playerSymbol} ${
            isActive ? styles.activePlayer : undefined
          }`}
        >
          {symbol}
        </span>
      </span>
      {/* <button className={styles.playerNameEdit} onClick={handleEditClick}>
        {isEditing ? 'Save' : 'Edit'}
      </button> */}
    </li>
  );
};

export default PlayerCard;
