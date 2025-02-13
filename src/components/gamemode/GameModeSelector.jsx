import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setGameMode, setBoardSize } from '../../store/gameSlice';

const GameModeSelector = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(3);

  const handleSelectMode = (mode) => {
    dispatch(setGameMode(mode));
    dispatch(setBoardSize(selectedSize));
    navigate(`/game/${mode}`);
  };

  return (
    <div className="gameModeContainerWrapper">
      <div className="gameModeContainer">
        <div className="gameModeContentWrapper">
          <h2 className="gameModeHeader">Game Mode</h2>
          <div className="gameModeButtonsContainer">
            <div>
              {' '}
              <label>
                {' '}
                <input
                  type="radio"
                  value={3}
                  checked={selectedSize === 3}
                  onChange={() => setSelectedSize(3)}
                />{' '}
                3 x 3{' '}
              </label>{' '}
              <label style={{ marginLeft: '1rem' }}>
                {' '}
                <input
                  type="radio"
                  value={4}
                  checked={selectedSize === 4}
                  onChange={() => setSelectedSize(4)}
                />{' '}
                4 x 4{' '}
              </label>{' '}
            </div>
            <button
              onClick={() => handleSelectMode('pvp')}
              className="gameModeButtons"
            >
              Player vs Player
            </button>

            <button
              onClick={() => handleSelectMode('pvc')}
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
