import './styles.css';
import { MeterBox } from './day-bars';
import { StartModal } from './start-modal';
import { useState, useEffect } from 'react';
import { ProgressCircle } from './progress-circle';

type State = {
  startDate?: string;
  targetDate?: string;
}

export function FastingTracker () {

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const msElapsed = startDate ? new Date().getTime() - startDate.getTime() : 0;

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const savedStateJSON = localStorage.getItem("fasting-tracker");
      const savedState = savedStateJSON ? JSON.parse(savedStateJSON) : null;
      if(savedState && savedState.startDate && savedState.targetDate) {
        setStartDate(new Date(savedState.startDate));
        setTargetDate(new Date(savedState.targetDate));
      }
    }
  }, []);

  const saveState = (state: State) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("fasting-tracker", JSON.stringify(state));
    }
  }

  const handleStartNew = () => {
    setShowModal(true);
  };

  const handleReset = () => {
    setStartDate(null);
    setTargetDate(null);
    saveState({});
  };

  const handleStart = (targetDate: Date) => {
    const newStartDate = new Date();
    setStartDate(newStartDate);
    setTargetDate(targetDate);
    setShowModal(false);
    saveState({ startDate: newStartDate?.toISOString(), targetDate: targetDate?.toISOString() });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div className="h-full">
      <div className="back-arrow">
        <a href="/">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="32" height="32" viewBox="0 0 100 100" xmlSpace="preserve">
            <path fillRule="evenodd" fill="#fff" clipRule="evenodd" d="M64.274,27.414L43.2,50l21.074,22.586c1.414,1.451,1.441,3.776,0.027,5.227  c-1.414,1.451-3.681,1.424-5.095-0.027L35.753,52.652c-0.018-0.017-0.038-0.028-0.055-0.046c-0.679-0.696-1.016-1.594-1.037-2.5  c-0.001-0.035-0.009-0.071-0.009-0.106c0-0.036,0.008-0.07,0.009-0.106c0.021-0.906,0.359-1.804,1.037-2.5  c0.017-0.018,0.037-0.029,0.055-0.046l23.452-25.134c1.414-1.451,3.681-1.478,5.095-0.027  C65.715,23.638,65.688,25.963,64.274,27.414z"/>
          </svg>
        </a>
      </div>
      <div className="main">
        <div className="intro">
          <p>Fasting has been practiced for centuries in different civilizations and has many health benefits. After 12 hours, fasting triggers a process called autophagy in the liver, and in other tissues after 24+ hours; where the body cleans out damaged cells and regenerates new ones. Track your hours with our fasting tracker.</p>
        </div>
        <ProgressCircle 
          startDate={startDate}
          targetDate={targetDate} 
          onStartClick={handleStartNew}
          onResetClick={handleReset}
        />
        {startDate && targetDate && (
          <MeterBox startDate={startDate} targetDate={targetDate} />
        )}
        <StartModal isOpen={showModal} onClose={handleCloseModal} onStart={handleStart} />
      </div>
    </div>
  );
};
