import React from 'react';

interface Day {
  name: string;
  value: number;
}

interface MeterBoxProps {
  startDate: Date;
  targetDate: Date;
}

export const MeterBox: React.FC<MeterBoxProps> = ({ startDate, targetDate }) => {

  const oneDay = 24 * 60 * 60 * 1000;

  const days: Day[] = [
    { name: "Sunday", value: 0 },
    { name: "Monday", value: 0 },
    { name: "Tuesday", value: 0 },
    { name: "Wednesday", value: 0 },
    { name: "Thursday", value: 0 },
    { name: "Friday", value: 0 },
    { name: "Saturday", value: 0 },
  ];

  for (let d = new Date(startDate); d < targetDate; ) {
    const dayOfWeek = d.getDay();
    let nextDay = new Date(d);
    nextDay.setHours(0, 0, 0, 0);
    nextDay = new Date(nextDay.getTime() + oneDay);

    let percentage = 100;

    if (d.toDateString() === startDate.toDateString()) {
      const remainingTimeFirstDay = nextDay.getTime() - startDate.getTime();
      percentage = (remainingTimeFirstDay / oneDay) * 100;
    }

    if (nextDay > targetDate) {
      const remainingTimeLastDay = targetDate.getTime() - d.getTime();
      percentage = (remainingTimeLastDay / oneDay) * 100;
    }

    days[dayOfWeek].value = Math.min(100, days[dayOfWeek].value + percentage);

    d = nextDay;
  }


  return (
    <div id="meter-box">
      {days.map(({name, value}, i) => {
        return (
          <div key={name} className="meter-container">
            <meter className="meters" value={value / 100}></meter>
            <div className="meter-title">{name.substring(0, 2)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MeterBox;
