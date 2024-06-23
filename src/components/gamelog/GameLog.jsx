import styles from './styles.module.scss';

const GameLogItem = ({ turn }) => (
  <li className={styles.gameLog}>
    {turn.player} selected {turn.square.row},{turn.square.col}
  </li>
);

const GameLog = ({ turns }) => {
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
