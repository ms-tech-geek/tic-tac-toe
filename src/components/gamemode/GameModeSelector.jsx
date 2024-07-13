const GameModeSelector = ({ onSelectMode }) => {
  return (
    <div className="gameModeContainerWrapper">
      <div className="gameModeContainer">
        <div className="gameModeContentWrapper">
          <h2 className="gameModeHeader">Game Mode</h2>
          <div className="gameModeButtonsContainer">
            <button
              onClick={() => onSelectMode('pvp')}
              className="gameModeButtons"
            >
              Player vs Player
            </button>

            <button
              onClick={() => onSelectMode('pvc')}
              className="gameModeButtons"
            >
              Player vs Computer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModeSelector;
