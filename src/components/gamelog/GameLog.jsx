import styles from './styles.module.scss';

const DEBUG = false;

const GameLogItem = ({ turn }) => {
  DEBUG && console.log('Rendering GameLogItem with turn:', turn);
  return (
    <li className={styles.gameLog}>
      {turn.player} selected {turn.square.row},{turn.square.col}
    </li>
  );
};

const GameLog = ({ turns }) => {
  DEBUG && console.log('Rendering GameLog with turns:', turns);
  return (
    <ol className={styles.gameLogContainer}>
      {turns.map((turn) => (
        <GameLogItem
          key={`${turn.square.row}-${turn.square.col}`}
          turn={turn}
        />
      ))}
    </ol>
  );
};

export default GameLog;
