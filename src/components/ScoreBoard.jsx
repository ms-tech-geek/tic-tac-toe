const ScoreBoard = ({ players, scoreBoard }) => {
  return (
    <div id="scoreboard-container">
      <h2>Scoreboard</h2>
      <div id="scoreboard">
        {Object.keys(players).map((playerKey) => (
          <div key={playerKey} className="player-score">
            <div className="player-name">{players[playerKey]}</div>
            <div className="score">{scoreBoard[playerKey]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
