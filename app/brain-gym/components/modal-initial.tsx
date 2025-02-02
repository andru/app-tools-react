interface InitialModalProps {
  onShowScores: () => void;
  onStartGame: () => void;
}

export const InitialModal: React.FC<InitialModalProps> = ({ onShowScores, onStartGame }) => {
  return (
    <div className="modal initial modal--show">
      <div className="back-arrow"><a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 100 100">
          <path fillRule="evenodd" fill="#fff" clipRule="evenodd" d="M64.274,27.414L43.2,50l21.074,22.586c1.414,1.451,1.441,3.776,0.027,5.227  c-1.414,1.451-3.681,1.424-5.095-0.027L35.753,52.652c-0.018-0.017-0.038-0.028-0.055-0.046c-0.679-0.696-1.016-1.594-1.037-2.5  c-0.001-0.035-0.009-0.071-0.009-0.106c0-0.036,0.008-0.07,0.009-0.106c0.021-0.906,0.359-1.804,1.037-2.5  c0.017-0.018,0.037-0.029,0.055-0.046l23.452-25.134c1.414-1.451,3.681-1.478,5.095-0.027  C65.715,23.638,65.688,25.963,64.274,27.414z"/>
        </svg>
      </a></div>
      <div className="modal__inner">
        <div className="modal__header">
          <h1>Welcome to the <span>Brain Gym</span></h1>
        </div>
        <div className="modal__content">
          <ul>
            <li>
              <img src="/icons/brain-icon.png" />
              <div>Test your memory and track improvement over time with this memory game</div>
            </li>
            <li>
              <div>You'll have 3 seconds to memorize where matching pairs of cards are in the deck</div>
              <img src="/icons/pair-icon.png" />
            </li>
            <li>
              <img src="/icons/score-icon.png" />
              <div>
                Reveal the pairs using the
                fewest <b>number of moves</b> in the shortest <b>time</b> for a higher score
              </div>
            </li>
            <li>
              <div>Come back to play regularly and win prizes for improving your score!</div>
              <img src="/icons/prize-icon.png" />
            </li>
          </ul>
        </div>
        <div className="modal__footer">
          <button className="show-scores-button" onClick={onShowScores}><img src="/icons/scores-icon.png" /></button>
          <button className="start-game-button new-game" onClick={onStartGame}>Start the game</button>
        </div>
      </div>
    </div>
  );
}
