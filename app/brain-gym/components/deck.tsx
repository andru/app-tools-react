import type { State, ParsedState, Card, GameState, Prize } from '../types';
import { useAppDispatch, useAppState } from '../state-provider';
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { cardIcons } from '../game';


// just for a handy ability to `await wait(1000)`
function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const deckClasses = {
  6: 'deck--6',
  12: 'deck--12',
  16: 'deck--16',
  20: 'deck--20',
}


export function Deck () {

  const state = useAppState();
  const dispatch = useAppDispatch();

  const cards = state.currentGame.cards;

  const [showAllCards, setShowAllCards] = useState<boolean>(false);

  const cardsVisible = state.currentGame.cardsVisible;

  const tableRef = useRef<HTMLDivElement>(null);

  // @ts-expect-error
  const deckClass = deckClasses[state.currentGame.rounds[state.currentGame.currentRound - 1]]


  // show all cards when the countdown starts, then hide after 3 seconds
  useEffect(() => {
    if (state.showRoundCountdown) {
      // show all cards after 2 seconds
      setTimeout(() => {
        setShowAllCards(true);
      }, 2000);
      // hide all cards after 3 seconds
      setTimeout(() => {
        setShowAllCards(false);
      }, 5000);
    }
  }, [state.showRoundCountdown]);


  const handleCardClick = useCallback((ev: SyntheticEvent, i: number) => {
    dispatch({type: 'CARD_CLICK', payload: i});
  }, [state.currentGame.currentRound])


  return (
    <main className="table" ref={tableRef}>
      <div className={`deck ${deckClass}`}>
        {cards.map((cardName, i) => (
          <div className={`card ${showAllCards || cardsVisible[i] ? 'show' : ''}`} key={i} onClick={(ev) => handleCardClick(ev, i)}>
            <div className="card__inner">
              <div className="card__back"></div>
              <div className="card__face">
                <img src={`/card-icons/${cardName}.svg`} alt={cardName} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
