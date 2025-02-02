import { calculateGameScore, dummyGames, hideStatusBar, prizes } from "./main";
import { drawChart, drawScoreBoard } from "./scoreboard";

import { state } from './state';
import { Prize } from "./types";


export function initModals () {
  document.querySelectorAll("button.show-scores-button").forEach(el => el.addEventListener('click', () => {
    showScoreboardModal();
  }));
  // document.querySelectorAll('.modal').forEach(el => el.addEventListener('click', (e) => {
  //   if (e.target === el) {
  //   }
  // }));
  // document.querySelector('.modal.prize')?.addEventListener('click', (ev) => {
  //   if (ev.target == document.querySelector('.modal.prize')) {
  //     hidePrizeModal();
  //   }
  // })
  document.querySelector('.modal.prize .modal__close')?.addEventListener('click', () => {
    hidePrizeModal();
  });
}

export function showInitialModal() {
  const modal = document.querySelector(".modal.initial");
  
  if (modal) {
    modal.classList.add("modal--show");
  }

}
export function hideInitialModal() {
  const modal = document.querySelector(".modal.initial");
  if (modal) {
    modal.classList.remove("modal--show");
    
  }
}

export function showWinModal () {
  const modal = document.querySelector(".modal.win");
  if (modal) {
    modal.classList.add("modal--show");
  }
  const score = calculateGameScore({date: new Date(), rounds: state.currentGame.roundScores});
  const averageScore = state.scores.length > 0 ? state.scores.reduce((acc, game) => acc + calculateGameScore(game), 0) / state.scores.length : 10;

  const scoreEl = modal?.querySelector('.score span')
  if (scoreEl) {
    scoreEl.textContent = score.toString();
  }
  
  const numMoves = modal?.querySelector('.num-moves');
  if (numMoves) {
    numMoves.textContent = state.currentGame.roundScores.reduce((acc, round) => acc + round.moves, 0).toString();
  }
  const time = modal?.querySelector('.total-time');
  if (time) {
    time.textContent = state.currentGame.roundScores.reduce((acc, round) => acc + round.time, 0).toString();
  }
  const percent = modal?.querySelector('.percent-improvement');
  if (percent) {
    percent.textContent = Math.round((score / averageScore) * 100).toString();
  }

}
export function hideWinModal () {
  const modal = document.querySelector(".modal.win");
  if (modal) {
    modal.classList.remove("modal--show");
  }
}

export function showLoseModal () {
  const modal = document.querySelector(".modal.lose");
  if (modal) {
    modal.classList.add("modal--show");
  }

  const scoreEl = modal?.querySelector('.score span')
  if (scoreEl) {
    scoreEl.textContent = calculateGameScore({date: new Date(), rounds: state.currentGame.roundScores}).toString();
  }

  const scoreboardContainer = modal?.querySelector('.scoreboard-container');
  scoreboardContainer?.replaceChildren(drawScoreChartPreview());
  
  const numMoves = modal?.querySelector('.num-moves');
  if (numMoves) {
    numMoves.textContent = state.currentGame.roundScores.reduce((acc, round) => acc + round.moves, 0).toString();
  }
  const time = modal?.querySelector('.total-time');
  if (time) {
    time.textContent = state.currentGame.roundScores.reduce((acc, round) => acc + round.time, 0).toString();
  }
}
export function hideLoseModal () {
  const modal = document.querySelector(".modal.lose");
  if (modal) {
    modal.classList.remove("modal--show");
  }
}

export function showScoreboardModal() {
  const modal = document.querySelector(".modal.full-scoreboard");
  modal?.addEventListener('click', hideScoreboardModal);
  if (modal) {
    modal.classList.add("modal--show");
  }
  const scoreboard = drawScoreBoard(state.scores);
  modal?.querySelector('.scoreboard-container')?.replaceChildren(scoreboard);
}

export function hideScoreboardModal() {
  const modal = document.querySelector(".modal.full-scoreboard");
  modal?.removeEventListener('click', hideScoreboardModal);
  if (modal) {
    modal.classList.remove("modal--show");
  }
}

export function drawScoreChartPreview() {

  const scores = state.scores.length > 2 ? state.scores : dummyGames;

  const containerEl = document.createElement('div');
  containerEl.classList.add('scoreboard-container');

  const chartEl = document.createElement('div');
  chartEl.classList.add('chart');
  chartEl?.replaceChildren(drawChart(scores));

  containerEl?.addEventListener('click', () => {
    showScoreboardModal();
  })
  containerEl?.replaceChildren(chartEl);

  return containerEl;
}

export function showPrizeModal(prize: Prize) {
  const modal = document.querySelector(".modal.prize");
  const couponEl = modal?.querySelector('.prize__code');
  const contentEl = modal?.querySelector('.prize__content');

  if (couponEl) {
    couponEl.textContent = prize.code;
  }
  if (contentEl) {
    contentEl.innerHTML = prize.text;
  }
  if (modal) {
    modal.classList.add("modal--show");
  }

}
export function hidePrizeModal() {
  const modal = document.querySelector(".modal.prize");
  if (modal) {
    modal.classList.remove("modal--show");
  }
}