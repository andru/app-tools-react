"use client"

import './css/main.css';
import './css/deck.css';
import './css/modal.css';
import './css/scoreboard.css';

import type { Card, Game, Prize } from './types';

import { useAppDispatch, useAppState } from './state-provider';
import { use, useCallback, useEffect, useRef, useState } from 'react';
import { Deck } from './components/deck';
import { WinModal } from './components/modal-win';
import { LoseModal } from './components/modal-lose';
import { dummyGames } from './default-state';
import { ScoreboardModal } from './components/ScoreboardModal';
import { PrizeModal } from './components/modal-prize';
import { InitialModal } from './components/modal-initial';
import RoundCountdown from './components/new-round-countdown';

export const cardIcons: Card[] = [
  'acrobatics',
  'adhd',
  'apple',
  'artificial-intelligence',
  'biotech',
  'body-cells',
  'brain-2',
  'brain',
  'caduceus',
  'dna-helix',
  'doctors-bag',
  'erythrocytes',
  'exercise',
  'eye',
  'gymnastics',
  'human-bone',
  'increase',
  'learn-more',
  'life-cycle',
  'lungs',
  'molecule',
  'muscle-flexing',
  'muscle',
  'neural-connections',
  'neuron',
  'pill',
  'psychotherapy',
  'rod-of-asclepius',
  'runner-on-the-start',
  'supplement-bottle',
  'tooth',
  'treadmill',
]


export function MemoryTrainer() { 

  const state = useAppState();
  const dispatch = useAppDispatch();
  const isStatusBarVisible = state.showStatusBar;

  let spaceKeys = 0;
  useEffect(() => {
     // cheat code to skip level with max points
    const listener = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        spaceKeys++;
        if (spaceKeys > 4) {
          // make it look like we've completed this level with a practically perfect score
          spaceKeys = 0;
          dispatch({type: 'DEV_MODE'});
        }
      }
    }
    document.addEventListener('keydown', listener); 
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  const [roundTime, setRoundTime] = useState<number>(0);

  const tick = useCallback(() => {
    if (state.currentGame.roundStartTime) {
      const secondsElapsed = Math.floor((Date.now() - state.currentGame.roundStartTime.getTime()) / 1000)
      setRoundTime(secondsElapsed)
    } else {
      setRoundTime(0);
    }
  }, [state.isInitialized, state.currentGame.currentRound, state.currentGame.roundStartTime, setRoundTime]);


  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => {
    timer.current = setInterval(tick, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    }
  }, [state.isInitialized, state.currentGame.currentRound, state.currentGame.roundStartTime]);

  useEffect(() => {
    const [a, b] = state.currentGame.currentTry;
    if (a !== null && b !== null) {
      if (state.currentGame.cards[a] === state.currentGame.cards[b]) {
        dispatch({type: 'MATCH'});
      } else {
        setTimeout(() => {
          dispatch({type: 'NO_MATCH'});
        }, 500);
      }
    }
  }, [state.currentGame.currentTry[0], state.currentGame.currentTry[1]]);

    // listen out for currentRound changes, and start the round when it does
    useEffect(() => {
      if (state.currentGame.roundFinished) {
        // hide all cards
        setTimeout(() => dispatch({type: 'END_ROUND'}), 300);
        setTimeout(() => dispatch({type: 'START_ROUND'}), 1300);
      }
    }, [state.currentGame.roundFinished])

  return (
    <div className="container">
      <section className={`status-bar ${isStatusBarVisible ? 'status-bar--show' : ''}`}>
        <div className="round">Round no. <span>{state?.currentGame.currentRound}</span></div>
        <span className="moves">Moves: {state.currentGame.movesCounter}</span>
        <span className="timer">{roundTime}s</span>
        <div className="restart" onClick={() => dispatch({type: 'RESTART'})}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px" 
            height="24px"
            viewBox="0 0 36 36"
            version="1.1"
          >
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "#333",
                fillOpacity: 1,
              }}
              d="M 27 5.386719 C 26.789062 5.40625 26.585938 5.511719 26.445312 5.707031 L 24.945312 7.761719 C 22.320312 5.976562 18.996094 5.183594 15.554688 5.867188 C 9.878906 6.992188 5.679688 12.039062 5.625 17.828125 C 5.550781 25.339844 11.976562 31.042969 19.234375 30.3125 C 25.628906 29.671875 30.394531 24.269531 30.375 17.976562 C 30.375 17.320312 29.792969 16.816406 29.136719 16.882812 C 28.546875 16.941406 28.125 17.433594 28.125 18.015625 C 28.125 23.152344 24.230469 27.550781 19.011719 28.074219 C 13.074219 28.671875 7.816406 24.007812 7.875 17.863281 C 7.917969 13.101562 11.40625 8.945312 16.085938 8.054688 C 18.839844 7.53125 21.496094 8.171875 23.613281 9.585938 L 22.066406 11.699219 C 21.6875 12.21875 22.058594 12.953125 22.707031 12.953125 L 28.996094 12.953125 C 29.53125 12.953125 29.910156 12.433594 29.746094 11.921875 L 27.832031 5.929688 C 27.710938 5.546875 27.347656 5.351562 27 5.386719 Z M 27 5.386719 "
            />
          </svg>
        </div>
      </section>
      <RoundCountdown />
      {state.showModal === 'initial' ? <InitialModal onShowScores={() => dispatch({type: 'OPEN_SCORES_MODAL'})} onStartGame={() => dispatch({type: 'START_GAME'})} /> : null}
      {state.showModal === 'endgame' ? state.lastGameResult?.isHighScore 
        ? <WinModal onRestart={() => dispatch({type: 'RESTART'})} onShowScores={() => dispatch({type: 'OPEN_SCORES_MODAL'})} /> 
        : <LoseModal onRestart={() => dispatch({type: 'RESTART'})} onShowScores={() => dispatch({type: 'OPEN_SCORES_MODAL'})} /> 
      : null}
      {state.showScoresModal ? <ScoreboardModal onClose={() => dispatch({type: 'CLOSE_SCORES_MODAL'})} /> : null}
      {state.showPrizeModal ? <PrizeModal onClose={() => dispatch({type: 'CLOSE_PRIZE_MODAL'})} /> : null}
      <Deck />
    </div>
  );
}

export default MemoryTrainer;
