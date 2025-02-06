import { Link } from 'react-router';
import { useAppDispatch, useAppState } from '../state-provider';

type Props = {
  onRestart: () => void;
  onShowScores: () => void;
}

export const LoseModal = ({onRestart, onShowScores}: Props) => {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const result = state.lastGameResult;

  if (!result) {
    // this shouldn't be possible, but just in case
    dispatch({type: 'CLOSE_ENDGAME_MODAL'});
    return null;
  }

  const score = result.score;
  const averageScore = result.averageScore;
  const numMoves = result.numMoves;
  const totalTime = result.totalTime;
  
  return (<div className="modal complete lose modal--show">
    <div className="back-arrow"><Link to="/">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 100 100">
        <path fillRule="evenodd" fill="#fff" clipRule="evenodd" d="M64.274,27.414L43.2,50l21.074,22.586c1.414,1.451,1.441,3.776,0.027,5.227  c-1.414,1.451-3.681,1.424-5.095-0.027L35.753,52.652c-0.018-0.017-0.038-0.028-0.055-0.046c-0.679-0.696-1.016-1.594-1.037-2.5  c-0.001-0.035-0.009-0.071-0.009-0.106c0-0.036,0.008-0.07,0.009-0.106c0.021-0.906,0.359-1.804,1.037-2.5  c0.017-0.018,0.037-0.029,0.055-0.046l23.452-25.134c1.414-1.451,3.681-1.478,5.095-0.027  C65.715,23.638,65.688,25.963,64.274,27.414z"/>
      </svg>
    </Link></div>
    <div className="modal__inner">
      <div className="modal__header">
        <h1 className="modal__title">You scored</h1>
        <div className="score"><span>{score}</span></div>
      </div>
      <div className="modal__content">
        <div><span className="num-moves">{numMoves}</span> moves in <span className="total-time">{totalTime}</span> seconds</div>
        <div><br />Want to try again? We'll record your highest score of the day.</div>
      </div>
      <div className="modal__footer">
        <button className="show-scores-button" onClick={onShowScores}><img src="/icons/scores-icon.png" /></button>
        <button className="start-game-button restart-game" onClick={onRestart}>Try Again!</button>
      </div>
    </div>
  </div>
  );
}
