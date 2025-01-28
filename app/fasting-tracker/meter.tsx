interface Day {
  name: string;
  value: number;
}

interface MeterBoxProps {
  days: Record<number, Day>;
}

const MeterBox: React.FC<MeterBoxProps> = ({ days }) => {
  return (
    <div id="meter-box">
      {Object.keys(days).map(key => {
        const day = days[key as unknown as number];
        return (
          <div key={key} className="meter-container">
            <meter className="meters" value={day.value / 100}></meter>
            <div className="meter-title">{day.name.substring(0, 2)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MeterBox;
