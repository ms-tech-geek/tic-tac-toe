const ScoreBoard = ({ players, scoreBoard }) => {
  return (
    <div id="scoreboard">
      {Object.keys(players).map((playerKey) => (
        <span key={playerKey} className="score-item">
          {players[playerKey]} : {scoreBoard[playerKey]} Wins
        </span>
      ))}
    </div>
  );
};

export default ScoreBoard;
