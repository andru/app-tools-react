import { useEffect } from "react"
import { useAppDispatch, useAppState } from "../state-provider";

export default function RoundCountdown () {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const isVisible = state.showRoundCountdown;
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        dispatch({type: "ROUND_COUNTDOWN_COMPLETE"})
      }, 5000);
    }
  }, [isVisible]);

  return (
    <div className={`round-animation ${isVisible ? "round--show" : ""}`}>
      <div className="round-animation__inner">
        <h1>Round <span>{state.currentGame.currentRound}</span></h1>
        3 seconds to memorise!
      </div>
      <div className="round-countdown">
        <div className="round-countdown__number">3</div>
        <div className="round-countdown__number">2</div>
        <div className="round-countdown__number">1</div>
      </div>
    </div>
  )
}