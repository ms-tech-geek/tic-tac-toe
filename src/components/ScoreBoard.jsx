const ScoreBoard = ({ players, scoreBoard }) => {
  return (
    <div id="scoreboard">
      {Object.keys(players).map((playerKey) => (
        <span key={playerKey} style={{ margin: '2rem', fontSize: '1.5rem' }}>
          {players[playerKey]} : {scoreBoard[playerKey]} Wins
        </span>
      ))}
    </div>
  );
};

export default ScoreBoard;
