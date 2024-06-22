const ScoreBoard = ({ players, scoreBoard }) => {
  return (
    <div id="scoreboard">
      <span style={{ margin: '2rem', fontSize: '1.5rem' }}>
        {players.X} : {scoreBoard.X} Wins
      </span>
      <span style={{ margin: '2rem', fontSize: '1.5rem' }}>
        {players.O} : {scoreBoard.O} Wins
      </span>
    </div>
  );
};

export default ScoreBoard;
