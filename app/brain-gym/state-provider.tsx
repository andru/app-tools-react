import { createContext, useContext, useReducer, useEffect } from 'react';
import type { Card, Game, GameResult, GameState, ParsedState, Prize, Round, State } from './types';
import { cardIcons } from './game';
import { defaultState, prizes } from './default-state';
import { reducer, type Action } from './reducer';


const StateContext = createContext<State>(defaultState);
const DispatchContext = createContext<React.Dispatch<Action>>(() => {});

export const useAppState = () => useContext(StateContext);
export const useAppDispatch = () => useContext(DispatchContext);


interface AppStateProviderProps {
  children: React.ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    const loadState = async () => {
      let localState = localStorage.getItem('cardgame');
      if (localState) {
        const parsedState: ParsedState = JSON.parse(localState);
        if (parsedState.version === 1) {
          dispatch({ type: 'LOAD_STATE', payload: defaultState });
        } else if (parsedState.version === 2) {
          const scores = parsedState.scores.map((score) => ({
            ...score,
            date: new Date(score.date),
          }));
          const prizesWon: [string, Date][] = parsedState.prizesWon.map(([id, date]) => [id, new Date(date)]);
          dispatch({ type: 'LOAD_STATE', payload: { ...defaultState, scores, prizesWon } });
        }
      }
    };
    if (!state.isInitialized) {
      loadState();
    }
  }, [state.isInitialized]);


  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {state.isInitialized ? children : null}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

declare const Tapcart: any;

function getTapCart() {
    return typeof Tapcart !== 'undefined' ? Tapcart : null;
}
function getUserId () {
  const tc = getTapCart();
  if (tc && tc.isInitialized) {
    return  Tapcart?.variables?.customer?.id ?? 0;
  }
  return null;
}

