export type GameState = {
  // game specific
  rounds: number[];
  currentRound: number;
  isFinished: boolean;
  roundScores: Round[];
  gameStartTime: number | null;

  // round specific - these are reset every round
  movesCounter: number;
  roundStartTime: Date | null;
  roundFinished: boolean;
  timerId?: number;
  lastInteractionTime: number;
  currentTry: [number | null, number | null];
  cardsVisible: boolean[];
  cards: Card[]; // the list of cards in the deck (a set of Xs pairs)
  matches: Card[]; // the list of cards that have been matched in this round
  clicks: number[]; // the index position of every card clicked in this round all clicks in
}

export type Card = string;
export type Game = {
  rounds: Round[];
  date: Date;
}
export type Round = {
  cards: number;
  moves: number;
  time: number;
}
export type GameResult = { 
  score: number, 
  isHighScore: boolean,
  prizeWon?: Prize,
  averageScore: number,
  numMoves: number,
  totalTime: number,
  percentImprovement: number 
}

export type State = {
  version: number;
  scores: Game[];
  prizesWon: [string, Date][];

  isInitialized: boolean,
  currentGame: GameState;
  lastGameResult?: GameResult;
  showModal: 'initial' | 'endgame' | false,
  showPrizeModal: boolean,
  showScoresModal: boolean,
  showStatusBar: boolean,
  showRoundCountdown: boolean,
}
export type PersistedState = {
  version: number;
  scores: Game[];
  prizesWon: [string, string][];
}
// JSON.parse of local storage string
export type ParsedState = {
  version: number;
  scores: {
    rounds: Round[];
    date: string
  }[];
  prizesWon: [string, string][];
}

export type Prize = {
  id: string;
  minGames: number;
  daysSinceLastPrize: number;
  text: string;
  code: string;
}