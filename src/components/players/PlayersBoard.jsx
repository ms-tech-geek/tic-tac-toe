import Player from './Player';

const PlayersBoard = ({
  initialPlayers,
  activePlayer,
  handlePlayerNameChange,
}) => {
  const { X, O } = initialPlayers;

  return (
    <ol id="players" className="highlight-player">
      <Player
        initialName={X}
        symbol="X"
        isActive={activePlayer === 'X'}
        onChangeName={handlePlayerNameChange}
        playerKey="X"
      />
      <Player
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
