import styles from './styles.module.scss';

const GameModeSelector = ({ onSelectMode }) => {
  return (
    <>
      <div className={styles.gameModeContainer}>
        <div className={styles.gameModeSelector}>
          <h2>Select Game Mode</h2>
          <div className={styles.buttonContainer}>
            <button
              onClick={() => onSelectMode('pvp')}
              className={styles.button}
            >
              Player vs Player
            </button>

            <button
              onClick={() => onSelectMode('pvc')}
              className={styles.button}
            >
              Player vs Computer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameModeSelector;
