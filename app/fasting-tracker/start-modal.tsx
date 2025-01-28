import { useState } from 'react';

interface TimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (targetDate: Date) => void;
}

export const StartModal: React.FC<TimeModalProps> = ({ isOpen, onClose, onStart }) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [targetDate, setTargetDate] = useState<Date | null>(tomorrow);
  const [countupTimeError, setCountupTimeError] = useState<string>('');

  const handleStart = () => {
    if (targetDate) {
      onStart(targetDate);
    } else {
      setCountupTimeError("Please select a fasting end time");
    }
  }

  const handleSetTargetDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTargetDate = new Date(e.target.value);

    if (newTargetDate <= new Date()) {
      setCountupTimeError("End Fasting Time should be greater than current time");
    } else {
      setTargetDate(newTargetDate);
    }
  }

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} absolute inset-0 p-5 flex items-center justify-center bg-black/40 backdrop-blur-sm`} id="time-modal">
      <div className="modal-dialog modal-dialog-centered p-10 bg-white" role="document">
        <div className="modal-content relative">
          <div className="absolute top-0 right-0 pr-2 pt-1">
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="flex flex-col p-6">
            <div className="mt-5">
              <label htmlFor="countupType">End Fasting Time:</label>
              <div className="flex gap-2.5">
                <input type="datetime-local" className="inline-block w-full p-2.5 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" id="countupTime" onChange={handleSetTargetDate} value={targetDate.toISOString().slice(0,16)} />
              </div>
              <div id="countupTimeError" className="text-red-500 text-sm mt-1">
                {countupTimeError}
              </div>
            </div>
            <div className="mt-5 flex justify-center">
              <button className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600" onClick={handleStart}>Start</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
