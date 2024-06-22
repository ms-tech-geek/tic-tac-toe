import PlayerCard from './PlayerCard';
import styles from './styles.module.scss';

const PlayersBoard = ({
  initialPlayers,
  activePlayer,
  handlePlayerNameChange,
}) => {
  const { X, O } = initialPlayers;

  return (
    <ol className={styles.players}>
      <PlayerCard
        initialName={X}
        symbol="X"
        isActive={activePlayer === 'X'}
        onChangeName={handlePlayerNameChange}
        playerKey="X"
      />
      <PlayerCard
        initialName={O}
        symbol="O"
        isActive={activePlayer === 'O'}
        onChangeName={handlePlayerNameChange}
        playerKey="O"
      />
    </ol>
  );
};

export default PlayersBoard;
