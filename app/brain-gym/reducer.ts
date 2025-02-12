import { defaultState, dummyGames, newGame, prizes } from './default-state';
import { cardIcons } from './game';
import { calculateGameScore, dealDeck, gameResult } from './game-logic';
import type { Card, Game, GameResult, GameState, ParsedState, Prize, Round, State } from './types';

export type Action = 
  | {type: 'UNAUTHENTICATED'}
  | {type: 'AUTHENTICATED', payload: {userId: string}}
  | {type: 'INITIALIZED'} 
  | {type: 'RESET'}
  | {type: 'LOAD_STATE', payload: State} 
  | {type: 'SAVE_STATE', payload: State} 
  | {type: 'RESTART'} 
  | {type: 'START_GAME'} 
  | {type: 'CARD_CLICK', payload: number} 
  | {type: 'END_ROUND'}
  | {type: 'START_ROUND'}
  | {type: 'MATCH'}
  | {type: 'NO_MATCH'}
  | {type: 'OPEN_ENDGAME_MODAL', payload: {game: Game}}
  | {type: 'CLOSE_ENDGAME_MODAL'}
  | {type: 'OPEN_PRIZE_MODAL'}
  | {type: 'CLOSE_PRIZE_MODAL'} 
  | {type: 'OPEN_SCORES_MODAL'}
  | {type: 'CLOSE_SCORES_MODAL'}
  | {type: 'START_ROUND_COUNTDOWN'}
  | {type: 'ROUND_COUNTDOWN_COMPLETE'}
  | {type: 'DEV_MODE'}
  | {type: 'SKIP_ROUND'}
  | {type: 'CHEAT_WIN'}
  | {type: 'CHEAT_PRIZE'}
  | {type: 'CHEAT_LOSE'}
  | {type: 'DEV_DEMO'}

export const reducer = (state: State, action: Action): State => {
  console.info(action, state);
  const nextState = {...state};
  const nextGame = {...state.currentGame};
  switch (action.type) {
    case 'UNAUTHENTICATED':
      return { ...state, userId: null, isAuthed: false };
    case 'AUTHENTICATED':
      return { ...state, userId: action.payload.userId, isAuthed: true };
    case 'INITIALIZED':
      return { ...state, isInitialized: true };
    case 'RESET':
      // emergency exit hatch for error states
      return { ...defaultState };
    case 'LOAD_STATE':
      return { ...state, ...action.payload, isInitialized: true };
    case 'SAVE_STATE':
        const saveState = async () => {
          const stringState = JSON.stringify({
            version: 2,
            scores: state.scores.map((score) => ({
              rounds: score.rounds,
              date: score.date.toISOString(),
            })),
            prizesWon: state.prizesWon.map(([id, date]) => [id, date.toISOString()]),
          });
          localStorage.setItem('cardgame', stringState);
        };
        saveState();

      return { ...state, ...action.payload };
    case 'RESTART':
      return { 
        ...state, 
        currentGame: {...newGame},
        showModal: 'initial',
        showStatusBar: false,
        showRoundCountdown: false,
        showPrizeModal: false,
        showScoresModal: false
       };
    case 'START_GAME':
      return { 
        ...state, 
        currentGame: { 
          ...newGame, 
          cards: dealDeck(newGame.rounds[0]),
          cardsVisible: new Array(newGame.rounds[0]).fill(false),
          gameStartTime: Date.now(),
        },
        showModal: false,
        showStatusBar: true,
        showRoundCountdown: true,
        showPrizeModal: false,
        showScoresModal: false
       };
    case 'START_ROUND_COUNTDOWN':
      return { ...state, showRoundCountdown: true };
    case 'ROUND_COUNTDOWN_COMPLETE':
      return { 
        ...nextState,
        showRoundCountdown: false,
        currentGame: { ...nextGame, roundStartTime: new Date() }
      };
    case 'CARD_CLICK':
      nextGame.clicks.push(action.payload);
      if (nextGame.currentTry.every((i) => i !== null)) {
        // temporarily block further clicks when two cards are already selected
        // the currentTry list will be cleared by a NO_MATCH action
        // is this stupid? yes, but we can't fire actions from a reducer, and I don't have time
        // to refactor this to use a saga or thunk
        // rather, a useEffect in the game component will dispatch a NO_MATCH action after a short delay
        // return nextState;
      }

      if (nextGame.matches.indexOf(nextGame.cards[action.payload]) > -1) {
        // card has already been matched
        return {...nextState, currentGame: {...nextGame, currentTry: [...nextGame.currentTry]}};
      }
      if (nextGame.currentTry.indexOf(action.payload) > -1) {
        // click on the same card
        return {...nextState, currentGame: {...nextGame, currentTry: [...nextGame.currentTry]}};
      }
      if (nextGame.currentTry[0] === null) {
        nextGame.currentTry = [action.payload, null];
      }
      // second card selected
      if (nextGame.currentTry[0] !== null && nextGame.currentTry[0] !== action.payload && nextGame.currentTry[1] === null ) {
        nextGame.currentTry = [nextGame.currentTry[0], action.payload];
      }
      console.log('currentTry', nextGame.currentTry, nextGame.currentTry.map((i) => i ? nextGame.cards[i] : null));
      // if both cards have been selected, check for a match
      if (nextGame.currentTry[0] !== null && nextGame.currentTry[1] !== null) {
        nextGame.movesCounter = state.currentGame.movesCounter + 1;
      }
      nextGame.cardsVisible = nextGame.cards.map((icon, i) => nextGame.matches.indexOf(icon) > -1 || nextGame.currentTry.indexOf(i) > -1);

      return {...nextState, currentGame: nextGame };
    case 'MATCH':
      if (nextGame.matches.indexOf(nextGame.cards[nextGame.currentTry[0]!]) === -1) {
        nextGame.matches = [...nextGame.matches, nextGame.cards[nextGame.currentTry[0]!] ];
      }
      // if all matches have been made, move to the next round
      // a useEffect in the game component will dispatch END_ROUND and START_ROUND actions
      // this should really be a saga or thunk, but there's no time to refactor...
      if (nextGame.matches.length === nextGame.cards.length / 2) {
        nextGame.roundFinished = true;
      }
      nextGame.cardsVisible = nextGame.cards.map((icon, i) => nextGame.matches.indexOf(icon) > -1);
     
      return {...nextState, currentGame: {...nextGame, currentTry: [null, null]}};
    case 'NO_MATCH':
      nextGame.cardsVisible = nextGame.cards.map((icon, i) => nextGame.matches.indexOf(icon) > -1);
      return {...nextState, currentGame: {...nextGame, currentTry: [null, null]}}; 
    case 'END_ROUND':
      nextGame.cardsVisible = new Array(nextGame.rounds[nextGame.currentRound - 1]).fill(false);
      return { ...nextState, currentGame: nextGame };
    case 'START_ROUND':
      // add score for the round which just finished
      nextGame.roundScores = [...state.currentGame.roundScores, {
        cards: state.currentGame.cards.length,
        moves: state.currentGame.movesCounter,
        time: Math.floor((Date.now() - state.currentGame.roundStartTime!.getTime()) / 1000),
      }];

      if (state.currentGame.currentRound + 1 > state.currentGame.rounds.length) {
        // game is finished
        nextGame.isFinished = true;
        nextState.showModal = 'endgame';
        nextState.showStatusBar = false;

        // calculate win/lose
        const result = gameResult(state, {rounds: nextGame.roundScores, date: new Date()});
        console.log('Game finished');
        console.log('Result', result);
        console.log('Round Scores', nextGame.roundScores);
        nextState.lastGameResult = result;

        // allow the user to play multiple games in a day, and keep the best score
        const today = new Date().toDateString();
        const existingScore = state.scores.findIndex((score) => score.date.toDateString() === today);

        // if no score exists for today, add the game just played to state
        if (existingScore === -1) {
          nextState.scores = [...state.scores, {
            rounds: [...nextGame.roundScores],
            date: new Date()
          }];
        } else {
          // if a score already exists for today, only update it if the new score is better
          if (calculateGameScore(state.scores[existingScore]) < result.score) {
            nextState.scores = state.scores.map((score, index) => index === existingScore ? {...score, rounds: [...nextGame.roundScores]} : {...score});
          }
        }

        if (result.prizeWon) {
          nextState.showPrizeModal = true;
          nextState.prizesWon = [...state.prizesWon, [result.prizeWon.id, new Date()]];
        }

      } else {
        // new round
        // this state should all be moved into a currentRound object to make this easier
        nextGame.currentRound = state.currentGame.currentRound + 1;
        nextGame.roundFinished = false;
        nextGame.cards = dealDeck(nextGame.rounds[nextGame.currentRound - 1]);
        nextGame.clicks = [];
        nextGame.movesCounter = 0;
        nextGame.cardsVisible = new Array(nextGame.rounds[nextGame.currentRound - 1]).fill(false);
        nextGame.roundStartTime = null;
        nextGame.currentTry = [null, null];
        nextGame.matches = [];
        nextState.showRoundCountdown = true;
      }
      return { ...nextState, currentGame: nextGame};
    case 'SKIP_ROUND':
      // make it look like we've completed this level with a practically perfect score
      nextGame.movesCounter = nextGame.rounds[nextGame.currentRound - 1] / 2;
      nextGame.roundStartTime = new Date();
      nextGame.roundFinished = true;
      return { ...nextState, currentGame: nextGame };
    case 'OPEN_ENDGAME_MODAL':
      const game = action.payload.game;
      const result = gameResult(state, game);
      return { ...state, lastGameResult: result, showModal: 'endgame', showStatusBar: false };
    case 'CLOSE_ENDGAME_MODAL':
      return { ...state, showModal: false };
    case 'OPEN_SCORES_MODAL':
      return { ...state, showScoresModal: true };
    case 'CLOSE_SCORES_MODAL':
      return { ...state, showScoresModal: false };
    case 'OPEN_PRIZE_MODAL':
      return { ...state, showPrizeModal: true };
    case 'CLOSE_PRIZE_MODAL':
      return { ...state, showPrizeModal: false };
    case 'DEV_MODE':
      return { ...state, devMode: true };
    case 'DEV_DEMO':
      return { ...state, scores: [...dummyGames]};
    case 'CHEAT_WIN':
      return { ...state, scores: [...dummyGames], lastGameResult: { score: 999, isHighScore: true, averageScore: 100, numMoves: 20, totalTime: 20, percentImprovement: 99 }, showModal: 'endgame', showStatusBar: false };
    case 'CHEAT_PRIZE':
      return { ...state, scores: [...dummyGames], prizesWon: [[prizes[0].id, new Date()]], lastGameResult: { score: 999, isHighScore: true, averageScore: 100, numMoves: 20, totalTime: 20, percentImprovement: 99, prizeWon: prizes[0] }, showModal: 'endgame', showPrizeModal: true, showStatusBar: false };
    case 'CHEAT_LOSE':
      return { ...state, scores: [...dummyGames], lastGameResult: { score: 10, isHighScore: false, averageScore: 100, numMoves: 200, totalTime: 200, percentImprovement: 0 }, showModal: 'endgame', showStatusBar: false };
    default:
      return state;
  }
};