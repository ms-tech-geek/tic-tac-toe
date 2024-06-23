import styles from './styles.module.scss';

const GameOver = ({ winner, onRematch }) => {
  return (
    <div className={styles.gameOverContainer}>
      <h2 className={styles.heading}>Game Over!</h2>
      <p className={styles.subHeading}>
        {winner ? `${winner} won!` : 'It was a draw'}
      </p>
      <p>
        <button className={styles.rematchButton} onClick={onRematch}>
          Rematch!
        </button>
      </p>
    </div>
  );
};

export default GameOver;
