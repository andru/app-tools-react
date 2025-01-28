import { useState, useEffect } from "react";
import { NavLink } from "react-router";

declare global {
  var Tapcart: any;
}

interface StoredDocument {
  userId: string;
  records: Record[];
}

interface Record {
  day: number;
  answers: number[];
}

const daysList = [0, 30, 60, 90, 180];

const devDoc: StoredDocument = {
  userId: "123",
  records: Array.from({ length: 2 }, (_, i) => ({
    day: daysList[i],
    answers: Array.from({length: 8}).map(() => i+1),
  }))
};

async function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function Questionnaire() {
  const fetchUrl = "https://us-central1-nmnbio-app-108c5.cloudfunctions.net/getUserQuestionnaire";
  const saveUrl = "https://us-central1-nmnbio-app-108c5.cloudfunctions.net/saveUserQuestionnaire";
  const [userId, setUserId] = useState<number>(0);
  const [allRecords, setAllRecords] = useState<Record[]>([]);
  const [currentRecord, setCurrentRecord] = useState<Record | null>(null);
  const [questions] = useState<string[]>([
    "On a scale of 1-5, How would you rate your ability to recover after working out? 5 is extremely easy, 1 is muscle soreness for 2-3 days and feeling tired after a workout.",
    "How would you rate your ability to remember daily details? 5 is you always know where your car keys are, 1 is you are looking for things like keys, your phone etc daily.",
    "How easy it is to focus on mental tasks for over 20 minutes on average?",
    "How would you rate your average, daily energy levels?",
    "How satisfied are you with your ability to fall asleep?",
    "How satisfied are you with your ability to stay asleep?",
    "How badly do you crave dessert/carbs daily? 5 is impossible to fight and you have dessert every day, 1 is you never want dessert.",
    "How would you rate your sex drive? 5 is extremely potent, and 1 is non-existent.",
  ]);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedRatings, setSelectedRatings] = useState<(number | null)[]>(Array(8).fill(null));
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>('');

  useEffect(() => {
    // DEV
    window.Tapcart = {variables: {customer: {id: '123'}}};
    const userId = typeof Tapcart !== 'undefined' ? Tapcart?.variables?.customer?.id ?? null : null;
    if (!userId) {
      setError(true);
      setPopupMessage('Failed to fetch user data! Please make sure you are logged in.');
      setPopupVisible(true);
    } else {
      setUserId(userId);
      fetchRecords(userId);
    }
  }, []);

  useEffect(() => {
    setCurrentRecord(allRecords.find(record => record.day === selectedDay) ?? allRecords[0]);
    setSelectedRatings(allRecords.find(record => record.day === selectedDay)?.answers ?? Array(8).fill(null));
  }, [selectedDay]);


  async function fetchRecords(userId: string) {
    setLoading(true);
    try {
      const response = await fetch(`${fetchUrl}?userId=${userId}`);
      const data: StoredDocument = await response.json();
      if (data && Array.isArray(data.records)) {
        setAllRecords(data.records);
        setSelectedDay(data.records.length < daysList.length ? daysList[data.records.length] : daysList[0]);
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setPopupMessage('Failed to fetch records!');
      setPopupVisible(true);
    } finally {
      setLoading(false);
    }
  }


  function selectDay(day: number) {
    if (allRecords.some(record => record.day === day) || day === daysList[allRecords.length] ) {
      setSelectedDay(day); 
    }
  }


  function rateQuestion(index: number, rating: number) {
    // if (allRecords.find(record => record.day === selectedDay)) {
    //   return;
    // }
    setSelectedRatings(prev => {
      const newRatings = [...prev];
      newRatings[index] = rating;
      return newRatings;
    });
  }

  async function submitForm(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    let records = [...allRecords]
    if (records.some(record => record.day === selectedDay)) {
      records = records.map(record => record.day === selectedDay ? { day: selectedDay, answers: selectedRatings } as Record : record);
    } else {
      records.push({ day: selectedDay, answers: selectedRatings } as Record);
    }
    records = records.sort((a, b) => a.day - b.day);
    const payload: StoredDocument = { 
      userId: userId.toString(),
      records: records
    };
    console.log(payload);
    try {
      const response = await fetch(saveUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.status === 200) {
        setPopupMessage("Your answers have been saved.");
        setAllRecords(records);
        await timeout(1000);
        setPopupVisible(false);
      } else {
        setPopupMessage("There was an error saving your answers.");
      }
    } catch (error) {
      console.error(error);
      setPopupMessage("There was an error saving your answers.");
    } finally {
      setPopupVisible(true);
      await timeout(3000);
      setPopupVisible(false);
      setLoading(false);
    }
  }

  return (
    <div className={`flex flex-col w-full items-center justify-center pt-2.5 bg-gray-100`}>
      <h3 className="heading flex items-center w-full pb-2.5">
        <div className="back-arrow">
          <NavLink to="/">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 100 100">
              <path fillRule="evenodd" fill="#444" clipRule="evenodd" d="M64.274,27.414L43.2,50l21.074,22.586c1.414,1.451,1.441,3.776,0.027,5.227  c-1.414,1.451-3.681,1.424-5.095-0.027L35.753,52.652c-0.018-0.017-0.038-0.028-0.055-0.046c-0.679-0.696-1.016-1.594-1.037-2.5  c-0.001-0.035-0.009-0.071-0.009-0.106c0-0.036,0.008-0.07,0.009-0.106c0.021-0.906,0.359-1.804,1.037-2.5  c0.017-0.018,0.037-0.029,0.055-0.046l23.452-25.134c1.414-1.451,3.681-1.478,5.095-0.027  C65.715,23.638,65.688,25.963,64.274,27.414z"/>
            </svg>
          </NavLink>
        </div>
        <span>Keep up with your well being</span>
      </h3>
      <div className={`button-box flex flex-wrap justify-evenly w-full  ${isLoading ? 'animate-pulse' : ''}`} style={{ opacity: isLoading ? 0.3 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}>
        {daysList.map((day, i) => (
            <button key={day} 
            className={`${day === selectedDay ? 'bg-orange-500' : allRecords.some(record => record.day === day) || day === daysList[allRecords.length] ? 'bg-purple-800': 'bg-gray-400'} text-white uppercase py-1.5 px-2.5 rounded-full text-xs border-none mb-1.5`}
            onClick={() => selectDay(day)}>
            Day {day}
            {allRecords.some(record => record.day === day) && (
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
              </svg>
            )}
            </button>
        ))}
      </div>

      <form id="user-form" className={`form-design m-1.5  ${isLoading ? 'animate-pulse' : ''}`} onSubmit={submitForm} style={{ opacity: isLoading ? 0.3 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}>
        {questions.map((question, index) => (
          <div className="card p-2.5 border border-purple-200 rounded shadow-md my-2.5 text-sm leading-6 tracking-wide text-gray-700 bg-purple-100" key={index}>
            <p>Q{index + 1}: {question}</p>
            <div className="rating-box flex justify-around w-full my-3.5">
              <ul className="ratings flex justify-around w-full font-bold">
                {[1, 2, 3, 4, 5].map(rating => (
                  <li key={rating} className="inline-block">
                    <label className={`circle ${selectedRatings[index] === rating ? 'bg-orange-500' : 'bg-purple-800'} text-white cursor-pointer w-10 h-10 rounded-full grid place-items-center`} onClick={() => rateQuestion(index, rating)}>
                      {rating}
                    </label>
                    <input type="radio" name={`question${index + 1}`} value={rating} checked={selectedRatings[index] === rating} onChange={() => rateQuestion(index, rating)} className="hidden" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <input type="submit" className="submit-btn bg-purple-800 border-none text-white uppercase py-2.5 px-5 rounded cursor-pointer font-semibold w-full hover:bg-orange-500 disabled:bg-gray-300" disabled={isLoading} value="submit" />
      </form>
      {popupVisible && <div id="popup" className="popup fixed top-2.5 left-2.5 right-2.5   p-5 bg-gray-200 font-semibold border border-gray-300 rounded shadow-lg z-50 text-center">{popupMessage}</div>}
    </div>
  );
}

