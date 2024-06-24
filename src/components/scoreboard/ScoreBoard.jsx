import React from 'react';
import styles from './styles.module.scss';

const DEBUG = false;

const ScoreBoard = ({ players, scoreBoard }) => {
  DEBUG && console.log('ScoreBoard component rendered');
  DEBUG && console.log('players:', players);
  DEBUG && console.log('scoreBoard:', scoreBoard);

  return (
    <div className={styles.scoreboardContainer}>
      <h2>Score</h2>
      <div className={styles.scoreboard}>
        {Object.keys(players).map((playerKey) => {
          DEBUG && console.log('playerKey:', playerKey);
          DEBUG && console.log('players[playerKey]:', players[playerKey]);
          DEBUG && console.log('scoreBoard[playerKey]:', scoreBoard[playerKey]);
          return (
            <div key={playerKey} className={styles.playerScore}>
              <div className={styles.playerName}>{players[playerKey]}</div>
              <div className={styles.score}>{scoreBoard[playerKey]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBoard;
