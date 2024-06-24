import styles from './styles.module.scss';

const DEBUG = false;

const GameOver = ({ winner, onRematch }) => {
  DEBUG && console.log('GameOver component rendered');
  DEBUG && console.log('winner:', winner);
  DEBUG && console.log('onRematch function:', onRematch);

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
