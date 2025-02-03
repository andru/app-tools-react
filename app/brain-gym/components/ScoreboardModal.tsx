import { prizes } from '../default-state';
import { useAppDispatch, useAppState } from '../state-provider';
import Scoreboard from './scoreboard';

type Props = {
  onClose: () => void;
}

export const ScoreboardModal = ({onClose}: Props) => {
  const state = useAppState()
  const dispatch = useAppDispatch()
  const scores = state.scores;
  return (
    <div className="modal full-scoreboard modal--show" onClick={onClose}>
      <div className="modal__inner">
        <div className="modal__header">
          <h1 className="modal__title">Your Scores</h1>
          <p>Come back and play regularly to see how your score changes over time. Win discounts for future purposes!</p>
        </div>
        <div className="modal__content">
          <div className="scoreboard-container">
            <Scoreboard games={scores} />
          </div>
          <div className="scoreboard-prizes">
            <h2>Prizes You've Won</h2>
            {state.prizesWon.map(([id, date], i) => {
              const prize = prizes.find(prize => prize.id === id)
              return prize ? (<div><b>{prize?.code}</b><br />{prize?.text}</div>) : null;
            })}
            {state.prizesWon.length === 0 && <div>You've not won any prizes yet - keep playing to win!</div>}
          </div>
        </div>
      </div>
    </div>
  )
};