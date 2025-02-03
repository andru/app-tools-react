import { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import type { Card, FirebasePersistedState, Game, GameResult, GameState, ParsedState, Prize, Round, State } from './types';
import { cardIcons } from './game';
import { defaultState, prizes } from './default-state';
import { reducer, type Action } from './reducer';
import { firebaseFunctionsUrl } from '~/constants';


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
    if (!state.isInitialized) {
      loadFromLocalStorage().then((parsedState) => {
        if (parsedState) {
          // save to server
          saveToServer(parsedState).then((res) => {
            localStorage.removeItem('cardgame');
          }).catch((err) => {
            console.error('Failed to save to server');
          });
          dispatch({ type: 'LOAD_STATE', payload: parsedState });
        } else {
          loadFromServer().then((firebaseState) => {
            dispatch({ type: 'LOAD_STATE', payload: {...defaultState, ...firebaseState} });
          }).catch((err) => {
            console.error('Failed to load from server');
          })
        }
        
      });
    }
  }, [state.isInitialized]);

  useEffect(() => {
    // cheking for lastGameResult ensures we only save to state after a game has finished
    if (state.isInitialized && state.lastGameResult) {
      saveToServer(state);
    }
    
  }, [state.isInitialized, state.lastGameResult])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

declare const Tapcart: any;

function getTapCart() {
    return typeof Tapcart !== 'undefined' ? Tapcart : null;
}
export function getUserId (): string | null {
  const tc = getTapCart();
  if (tc && tc.isInitialized) {
    return  Tapcart?.variables?.customer?.id ?? 0;
  } else {
    throw new Error('Tapcart not initialized');
  }
  
  if (process.env.NODE_ENV === 'development') {
    return "123";
  }
  return null;
}


export async function saveToServer (state: State) {
  const userId = getUserId();
  if (!userId) {
    console.error('No user id found');
    return;
  }
  //save to firebase
  const firebaseState: FirebasePersistedState = {
    userId,
    version: 3,
    scores: state.scores.map((score) => ({
      rounds: score.rounds,
      date: score.date.getTime(),
    })),
    prizesWon: state.prizesWon.map(([id, date]) => ({id: id, date: date.getTime()})),
  }
  const response = await fetch(`${firebaseFunctionsUrl}/saveBrainGymData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(firebaseState),
  });
  const result: {error: string} | {message: string} = await response.json();
  if (response.status !== 200) {
    throw new Error('Failed to save to server');
  }
  return result;
}

export async function loadFromServer () {
  const userId = getUserId();
  if (!userId) {
    console.error('No user id found');
    return;
  }
  const response = await fetch(`${firebaseFunctionsUrl}/loadBrainGymData/?userId=${userId}`);
  const data: FirebasePersistedState = await response.json();
  if (response.status !== 200) {
    throw new Error('Failed to load from server');
  }
  return ({
    ...data,
    scores: data.scores.map((score) => ({
      ...score,
      date: new Date(score.date),
    })),
    prizesWon: data.prizesWon.map(({id, date}) => [id, new Date(date)] as [string, Date]),
  })
}

function saveToLocalStorage (state: State) {
  const stringState = JSON.stringify({
    version: 2,
    scores: state.scores.map((score) => ({
      rounds: score.rounds,
      date: score.date.toISOString(),
    })),
    prizesWon: state.prizesWon.map(([id, date]) => [id, date.toISOString()]),
  });
  localStorage.setItem('cardgame', stringState);
}

export async function loadFromLocalStorage (): Promise<State | null> {
  let localState = localStorage.getItem('cardgame');
  if (localState) {
    const parsedState: ParsedState = JSON.parse(localState);
    if (parsedState.version === 1) {
      return {...defaultState};
    } else if (parsedState.version === 2) {
      const scores = parsedState.scores.map((score) => ({
        ...score,
        date: new Date(score.date),
      }));
      const prizesWon: [string, Date][] = parsedState.prizesWon.map(([id, date]) => [id, new Date(date)]);
      return { ...defaultState, scores, prizesWon };
    }
  }
  return null;
}
