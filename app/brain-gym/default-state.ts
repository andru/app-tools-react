import type { Game, GameState, Prize, State } from "./types"

export const newGame: GameState = {
  rounds: [6, 12, 16, 20],
  currentRound: 1,
  roundScores: [],
  gameStartTime: null,

  roundStartTime: null,
  roundFinished: false,
  movesCounter: 0,
  timerId: undefined,
  lastInteractionTime: Date.now(),
  isFinished: false,
  currentTry: [null, null],
  cards: [],
  cardsVisible: [],
  clicks: [],
  matches: [],
};

export const defaultState: State = {
  version: 1,
  isInitialized: true,
  currentGame: { ...newGame },
  scores: [],
  prizesWon: [],
  showModal: 'initial',
  showPrizeModal: false,
  showScoresModal: false,
  showStatusBar: false,
  showRoundCountdown: false,
};


export const prizes: Prize[] = [
  {id: 'first', minGames: 3, daysSinceLastPrize: 25, text: 'Get 10% off your next order using this coupon code!', code: 'BRAINTRAIN-GXUN10'},
  {id: 'second', minGames: 9, daysSinceLastPrize: 25, text: 'Get 15% off your next order using this coupon code!', code: 'BRAINTRAIN-TSBM15'},
  {id: 'third', minGames: 18, daysSinceLastPrize: 25, text: 'Get 20% off your next order using this coupon code!', code: 'BRAINTRAIN-NPAD20'}
] 

// just used to render a dummy chart when there's not enough data
export const dummyGames: Game[] = [
  {
    rounds: [
      { cards: 12, moves: 309, time: 4000 },
      { cards: 12, moves: 99, time: 350 },
      { cards: 12, moves: 220, time: 350 },
    ],
    date: new Date('2023-12-10')
  },
  {
    rounds: [
      { cards: 12, moves: 22, time: 50 },
      { cards: 12, moves: 20, time: 50 },
      { cards: 12, moves: 22, time: 50 },
    ],
    date: new Date('2024-01-10')
  },
  {
    rounds: [
      { cards: 12, moves: 19, time: 40 },
      { cards: 12, moves: 20, time: 40 },
      { cards: 12, moves: 20, time: 40 },
    ],
    date: new Date('2025-02-11')
  },
  {
    rounds: [
      { cards: 12, moves: 12, time: 30 },
      { cards: 12, moves: 10, time: 30 },
      { cards: 12, moves: 12, time: 30 },
    ],
    date: new Date('2025-02-18')
  },
  {
    rounds: [
      { cards: 12, moves: 18, time: 30 },
      { cards: 12, moves: 13, time: 30 },
      { cards: 12, moves: 18, time: 30 },
    ],
    date: new Date('2024-03-04')
  },
  {
    rounds: [
      { cards: 12, moves: 9, time: 30 },
      { cards: 16, moves: 12, time: 30 },
      { cards: 20, moves: 15, time: 40 },
    ],
    date: new Date('2024-03-29')
  },
  {
    rounds: [
      { cards: 12, moves: 8, time: 30 },
      { cards: 16, moves: 8, time: 30 },
      { cards: 20, moves: 8, time: 30 },
    ],
    date: new Date('2024-04-15')
  },
  {
    rounds: [
      { cards: 12, moves: 6, time: 10 },
      { cards: 16, moves: 9, time: 22 },
      { cards: 20, moves: 12, time: 30 },
    ],
    date: new Date('2024-06-24')
  },
]