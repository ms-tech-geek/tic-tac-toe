import PlayerCard from './PlayerCard';
import styles from './styles.module.scss';

const DEBUG = false;

const PlayersBoard = ({
  initialPlayers,
  activePlayer,
  handlePlayerNameChange,
}) => {
  DEBUG && console.log('PlayersBoard rendered');
  DEBUG && console.log('initialPlayers:', initialPlayers);
  DEBUG && console.log('activePlayer:', activePlayer);
  DEBUG && console.log('handlePlayerNameChange:', handlePlayerNameChange);

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
