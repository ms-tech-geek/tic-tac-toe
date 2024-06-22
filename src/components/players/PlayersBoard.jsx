import Player from './Player';

const PlayersBoard = ({
  initialPlayers,
  activePlayer,
  handlePlayerNameChange,
}) => {
  return (
    <ol id="players" className="highlight-player">
      <Player
        initialName={initialPlayers.X}
        symbol="X"
        isActive={activePlayer === 'X'}
        onChangeName={handlePlayerNameChange}
      />
      <Player
        initialName={initialPlayers.O}
        symbol="O"
        isActive={activePlayer === 'O'}
        onChangeName={handlePlayerNameChange}
      />
    </ol>
  );
};

export default PlayersBoard;
