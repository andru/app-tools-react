import { useEffect, useRef, useState } from "react";

type ProgressCircleProps = {
  startDate: Date | null;
  targetDate: Date | null;
  onStartClick: () => void;
  onResetClick: () => void;
};

type Pos = {x: number, y: number};
const msInHour = 3600000;

const formatDate = (date: Date | null): string => {
  if (!date) return "-";
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("en-UK", options);
  return formatter.format(date).replace(/,/g, "");
};

const formatTime = (milliseconds: number): string => {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export function ProgressCircle ({startDate, targetDate, onStartClick, onResetClick}: ProgressCircleProps) {

  const circleRef = useRef<SVGCircleElement>(null);
  const [isActive, setActive] = useState(false);
  const [showAutophagy, setShowAutophagy] = useState(false);
  const [showFire, setShowFire] = useState(false);
  const [fireIconPos, setFireIconPos] = useState<Pos>({x: 0, y: 0});
  const [autophagyIconPos, setAutophagyIconPos] = useState<Pos>({x: 0, y: 0}); 
  const [timeElapsed, setTimeElapsed] = useState(0);
  const phaseText = timeElapsed >= msInHour * 12 && timeElapsed < msInHour * 24 ? "You are in fat burning phase" : timeElapsed >= msInHour * 24 ? "You are in autophagy phase" : "";

  const timeout = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (startDate && targetDate) {

      // update icon positions on mount - these don't animate
      const timeDifference = Math.abs(targetDate.getTime() - startDate.getTime());
      const hoursDifference = timeDifference / (1000 * 60 * 60);

      // update icon visibility and position
      if (hoursDifference < 12) {
        setShowFire(false);
      } else {
        setShowFire(true);
        const percentage = getPercentageDiff(startDate, targetDate, 12);
        setFireIconPos(getMarkPosition(percentage));
      }
      if (hoursDifference < 24) {
        setShowAutophagy(false);
      } else {
        setShowAutophagy(true);
        const percentage = getPercentageDiff(startDate, targetDate, 24);
        setAutophagyIconPos(getMarkPosition(percentage));
      }
    } 
    update();
  }, [startDate, targetDate]);



  const handleStartNew = () => onStartClick();
  const handleReset = () => onResetClick();
  const hideIcons = () => {
    setShowAutophagy(false);
    setShowFire(false);
  }


  // function called by RAF - updates the progress circle, icons and counter
  // some by direct DOM manipulation
  const update = () => {
    if (startDate && targetDate) {
      const timeRemaining = targetDate.getTime() - new Date().getTime();
      const totalTime = targetDate.getTime() - startDate.getTime();

      // update progress circle completion
      if (circleRef.current) {
        const percentage = Math.min(((totalTime - timeRemaining) / totalTime) * 100, 100);
        const progressCircle = circleRef.current;
        const circumference = 2 * Math.PI * progressCircle.r.baseVal.value;
        const dashArray = (circumference * percentage) / 100;
        progressCircle.style.strokeDasharray = `${dashArray} ${circumference}`;
      }

      // update counter
      setTimeElapsed(new Date().getTime() - startDate.getTime());

    } else {
      if (circleRef.current) {
        const progressCircle = circleRef.current;
        const circumference = 2 * Math.PI * progressCircle.r.baseVal.value;
        circleRef.current.style.strokeDasharray = `0 ${circumference}`;
      }
      hideIcons();
      setTimeElapsed(0);
      timeout?.current && clearTimeout(timeout.current);
    }

    if (startDate && targetDate && targetDate.getTime() > new Date().getTime()) {
      console.log('raf', startDate, targetDate);
      timeout.current = setTimeout(update, 1000);
    }
  };



  const getPercentageDiff = (startDate: Date, endDate: Date, targetDiffHours: number): number => {
    const msInOneHour = 3600000;
    const totalDurationMs = endDate.getTime() - startDate.getTime();
    const targetDurationMs = targetDiffHours * msInOneHour;
    const percentage = (targetDurationMs / totalDurationMs) * 100;
    return Math.min(percentage, 100);
  };

  const getMarkPosition = (targetPercentage: number): { x: number; y: number } => {
    if (!circleRef.current) 
      return { x: 0, y: 0 };
    const circle = circleRef.current;
    const radius = circle.r.baseVal.value;
    const targetAngle = (targetPercentage / 100) * 360;
    const x = 150 + radius * Math.cos(targetAngle * (Math.PI / 180));
    const y = 150 + radius * Math.sin(targetAngle * (Math.PI / 180));

    return { x, y };
  };



  return (
    <div className="flex justify-center items-center relative">
      <svg width="300" height="300" className="transform -rotate-90 origin-center">
        <circle stroke="#d6d6d6" strokeWidth="16" fill="none" cx="150" cy="150" r="130" />
        <circle id="progressCircle" ref={circleRef} stroke="#FFA500" strokeWidth="16" strokeDasharray="0 0" strokeLinecap="round" fill="transparent" cx="150" cy="150" r="130" />
        <g id="fire-icon" className={`${showFire ? '' : 'hidden'}`} transform={`translate(${fireIconPos.x-15}, ${fireIconPos.y-15})`}>
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 92.27">
            <g xmlns="http://www.w3.org/2000/svg" transform="matrix(0 1 -1 0 122.88 -0)">
              <style type="text/css">
                {`.st0 { fill-rule: evenodd; clip-rule: evenodd; fill: #EC6F59; }
                  .st1 { fill-rule: evenodd; clip-rule: evenodd; fill: #FAD15C; }`}
              </style>
              <g>
                <path className="st0" d="M18.61,54.89C15.7,28.8,30.94,10.45,59.52,0C42.02,22.71,74.44,47.31,76.23,70.89 c4.19-7.15,6.57-16.69,7.04-29.45c21.43,33.62,3.66,88.57-43.5,80.67c-4.33-0.72-8.5-2.09-12.3-4.13C10.27,108.8,0,88.79,0,69.68 C0,57.5,5.21,46.63,11.95,37.99C12.85,46.45,14.77,52.76,18.61,54.89L18.61,54.89z" />
                <path className="st1" d="M33.87,92.58c-4.86-12.55-4.19-32.82,9.42-39.93c0.1,23.3,23.05,26.27,18.8,51.14 c3.92-4.44,5.9-11.54,6.25-17.15c6.22,14.24,1.34,25.63-7.53,31.43c-26.97,17.64-50.19-18.12-34.75-37.72 C26.53,84.73,31.89,91.49,33.87,92.58L33.87,92.58z" />
              </g>
            </g>
          </svg>
        </g>
        <g id="autophagy-icon" className={`${showAutophagy ? '' : 'hidden'}`} transform={`translate(${autophagyIconPos.x-15}, ${autophagyIconPos.y-15})`}>
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 443.634 443.634">
            <g xmlns="http://www.w3.org/2000/svg" transform="matrix(0 1 -1 0 443.634 -0)">
              <g>
                <path style={{ fill: '#9AD14B' }} d="M332.17,188.526c18.44,35.52,29.43,75.48,29.43,107.82c0,77.2-62.58,139.79-139.78,139.79 s-139.79-62.59-139.79-139.79c0-32.34,10.99-72.3,29.43-107.82c11.16-21.49,20.83-43.7,28.85-66.55 c14.65-41.76,45.64-82.98,81.51-82.98c35.86,0,66.85,41.22,81.51,82.98C311.34,144.826,321.01,167.036,332.17,188.526z M287.25,302.186c0-36.14-29.29-94.04-65.43-94.04s-65.44,57.9-65.44,94.04s29.3,65.44,65.44,65.44S287.25,338.326,287.25,302.186z" />
                <path style={{ fill: '#B27214' }} d="M221.82,208.146c36.14,0,65.43,57.9,65.43,94.04s-29.29,65.44-65.43,65.44s-65.44-29.3-65.44-65.44 S185.68,208.146,221.82,208.146z" />
                <path style={{ fill: '#FFFFFF' }} d="M260.907,326.192c-0.977,0-1.968-0.191-2.923-0.596c-3.813-1.616-5.596-6.018-3.98-9.832 c1.822-4.3,2.746-8.869,2.746-13.578c0-12.426-5.981-30.7-14.545-44.438c-2.512-4.029-5.163-7.59-7.881-10.587 c-2.783-3.068-2.553-7.811,0.516-10.594c3.066-2.782,7.81-2.553,10.594,0.516c3.319,3.659,6.516,7.942,9.5,12.73 c10.216,16.386,16.816,36.944,16.816,52.373c0,6.731-1.323,13.268-3.934,19.43C266.604,324.475,263.828,326.192,260.907,326.192z" />
                <g>
                  <path style={{ fill: '#333333' }} d="M221.817,200.643c-19.066,0-37.76,13.14-52.637,37c-12.522,20.085-20.302,44.816-20.302,64.542 c0,40.218,32.72,72.938,72.938,72.938c40.218,0,72.938-32.72,72.938-72.938c0-19.726-7.779-44.457-20.302-64.542 C259.576,213.783,240.883,200.643,221.817,200.643z M221.817,360.122c-31.947,0-57.938-25.991-57.938-57.938 c0-32.604,27.079-86.542,57.938-86.542c30.858,0,57.938,53.938,57.938,86.542C279.754,334.131,253.764,360.122,221.817,360.122z" />
                  <path style={{ fill: '#333333' }} d="M338.827,185.072c-11.074-21.329-20.639-43.394-28.425-65.583 c-14.396-41.021-44.565-82.387-81.085-87.467V7.5c0-4.142-3.357-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v24.522 c-36.521,5.08-66.69,46.446-81.086,87.467c-7.786,22.188-17.35,44.253-28.424,65.583C85.851,221.58,74.534,263.18,74.534,296.351 c0,81.212,66.071,147.283,147.283,147.283S369.1,377.563,369.1,296.351C369.1,263.182,357.783,221.582,338.827,185.072z M221.817,428.634c-72.941,0-132.283-59.342-132.283-132.283c0-30.878,10.687-69.894,28.586-104.367 c11.399-21.956,21.246-44.676,29.266-67.528c13.176-37.546,42.088-77.957,74.432-77.957c32.343,0,61.255,40.411,74.431,77.957 c8.021,22.854,17.867,45.574,29.267,67.528c17.899,34.475,28.586,73.491,28.586,104.367 C354.1,369.292,294.758,428.634,221.817,428.634z" />
                </g>
                <circle style={{ fill: '#FFFFFF' }} cx="221.869" cy="231.411" r="7.5" />
              </g>
            </g>
          </svg>
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="flex gap-2.5 mb-4">
          <i id="set-timer" className="fa-solid fa-play fa-xl cursor-pointer" onClick={handleStartNew}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="28" height="28"><path fill="#fff" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
          </i>
          <i id="reset-button" className="fa-solid fa-rotate-right fa-xl cursor-pointer blocked" onClick={handleReset}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="28" height="28"><path fill="#fff" d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z"/></svg>
          </i>
        </div>
        <h6 id="info-text">Elapsed</h6>
        <div id="open-modal" className="cursor-pointer">
          <h3 id="timer" className="text-2xl">{formatTime(timeElapsed)}</h3>
        </div>
        {targetDate && (
          <>
            <div id="phase" className="text-center">{phaseText}</div>
            <h6 id="fast-text" className="mt-1">End Time</h6>
            <h6 id="currentTargetDate">{formatDate(targetDate)}</h6>
          </>
        )}
      </div>
    </div>
  )
}