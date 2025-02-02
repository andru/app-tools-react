
import { prizes } from '../default-state';
import { useAppDispatch, useAppState } from '../state-provider';
type Props = {
  onClose: () => void;
}

export const PrizeModal = ({onClose}: Props) => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  
  const result = state.lastGameResult;
  const prize = result?.prizeWon;
  
  if (!result || !prize) {
    // this shouldn't be possible, but just in case
    dispatch({type: 'CLOSE_PRIZE_MODAL'});
    return null;
  }

  return (
    <div className="modal prize modal--show">
      <div className="prize__sunburst"></div>
      <div className="prize__inner">
        <div className="modal__close" onClick={onClose}>Ⓧ</div>
        <div className="prize__header">
          <h1>Winning Score!</h1>
          <p>You <b>beat your high</b> score &amp; <b>won a prize!</b></p>
        </div>
        <div className="prize__code">{prize.code}</div>
        <div className="prize__content">{prize.text}</div>
      </div>
    </div>
  );
};