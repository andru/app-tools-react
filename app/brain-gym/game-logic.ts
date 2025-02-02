import { prizes } from "./default-state";
import { cardIcons } from "./game";
import type { Card, Game, GameResult, State } from "./types";


export function calculateGameScore (game: Game) {
  const totalScore = game.rounds.reduce((acc, round) => {
    return acc +  Math.floor((1 / (round.moves / round.cards) + (round.cards / round.time)) * 100);
  }, 0);
  return totalScore + 10; //so that the minimum score is 10
}

export function gameResult(state: State, game: Game): GameResult {
  const score = calculateGameScore(game);
  const today = new Date().toDateString();
  const maxScore = state.scores.reduce((acc, score) => {
    return Math.max(acc, calculateGameScore(score));
  }, 0);

  const averageScore = state.scores.length > 0 ? state.scores.reduce((acc, game) => acc + calculateGameScore(game), 0) / state.scores.length : 10;
  const numMoves = state.currentGame.roundScores.reduce((acc, round) => acc + round.moves, 0);
  const totalTime = state.currentGame.roundScores.reduce((acc, round) => acc + round.time, 0);
  const percentImprovement = Math.round((score / averageScore) * 100);

  if (score > maxScore) {

    // see if the player has won a prize
    // filter out prizes already won
    const remainingPrizes = prizes.filter(prize => !state.prizesWon.find(([pid]) => pid === prize.id));
    // find the last time a prize was won
    const lastPrizeWinTime = state.prizesWon.reduce((acc, [, date]) => Math.max(acc, date.getTime()), 0);
    // check the prize rules to see if the user is currently eligible to win
    const prize = remainingPrizes.find(prize => {
      return (
        // user needs to have played X number of games
        prize.minGames <= state.scores.length 
        // user needs to have not won a prize in the last X days
        && Date.now() - lastPrizeWinTime > prize.daysSinceLastPrize * 24 * 60 * 60 * 60
      )
    });

    return {
      score,
      isHighScore: true,
      prizeWon: prize,
      averageScore,
      numMoves,
      totalTime,
      percentImprovement,
    }
  }

  return {
    score,
    isHighScore: false,
    averageScore,
    numMoves,
    totalTime,
    percentImprovement,
  }
}

// deal a deck of cards
export function dealDeck(numCards: number = 12) {
  if (numCards % 2 !== 0) {
    throw new Error('Number of cards must be even');
  }
  const randomCards = shuffleCards([...cardIcons] as Card[]).slice(0, numCards / 2);
  return shuffleCards(randomCards.concat(randomCards));
}

// shuffle an array of cards
export function shuffleCards(array: Card[]) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}
