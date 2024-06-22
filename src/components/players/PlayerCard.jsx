import { useState } from 'react';
import styles from './styles.module.scss';

const PlayerCard = ({ initialName, symbol, isActive, onChangeName }) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) onChangeName({ symbol, playerName });
  };

  const handleChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleEditClick();
    }
  };

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
