// ScoreBoard.jsx
import React from 'react';
import styles from './styles.module.scss';

const ScoreBoard = ({ players, scoreBoard }) => {
  return (
    <div className={styles.scoreboardContainer}>
      <h2>Score</h2>
      <div className={styles.scoreboard}>
        {Object.keys(players).map((playerKey) => (
          <div key={playerKey} className={styles.playerScore}>
            <div className={styles.playerName}>{players[playerKey]}</div>
            <div className={styles.score}>{scoreBoard[playerKey]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
