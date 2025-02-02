import React, { useEffect, useRef } from 'react';
import { dummyGames } from "../default-state";
import type { Game } from "../types";
import { calculateGameScore } from '../game-logic';

const chartWidth = 400;
const chartHeight = 200;

const Scoreboard: React.FC<{ games: Game[] }> = ({ games }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const showDummyScores = games.length < 3;
  const scores = showDummyScores ? dummyGames : games;

  const drawChart = (games: Game[]) => {
    const chart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chart.setAttribute("width", "100%");
    chart.setAttribute("viewBox", `0 0 ${chartWidth} ${chartHeight}`);

    const scores = games.map(calculateGameScore);
    const chartYScale = scale([Math.min(...scores), Math.max(...scores)], [chartHeight - 5, 5]);
    console.log(scores, scores.map(chartYScale));

    const points = games.map((game, index) => {
      const x = (index / (games.length - 1)) * chartWidth;
      const y = chartYScale(scores[index]);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    });

    const lines = games.map((game, index) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute("x1", ((index / (games.length - 1)) * chartWidth).toFixed(2));
      line.setAttribute("y1", "0");
      line.setAttribute("x2", ((index / (games.length - 1)) * chartWidth).toFixed(2));
      line.setAttribute("y2", chartHeight.toFixed(2));
      return line;
    });
    lines.pop();
    lines.shift();

    const linesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    linesGroup.setAttribute("class", "chart__lines");
    lines.forEach((line) => linesGroup.appendChild(line));

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute("points", points.join(' '));

    chart.appendChild(linesGroup);
    chart.appendChild(line);

    return chart;
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.replaceChildren(drawChart(scores));
    }
  }, [scores]);


  return (
    <div className="previous-scores">
      <div className="previous-scores__inner">
        {showDummyScores && <div className="dummy dummy--show">You need to play for 3 days before we can show your score history - keep playing!</div>}
        <div className="chart" ref={chartRef}></div>
        <div className="scores">
          <div className="scores">
            <div className="scores__row scores__header">
              <div className="scores__date">Date</div>
              <div className="scores__score">Score</div>
            </div>
            {scores.map(game => (
              <div className="scores__row" key={game.date.toISOString()}>
                <div className="scores__date">{game.date.toDateString()}</div>
                <div className="scores__score">{calculateGameScore(game)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export function scale(domain: [number, number], range: [number,  number]){
  var istart = domain[0],
      istop  = domain[1],
      ostart = range[0],
      ostop  = range[1];

  return function scale(value: number) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  }
};
export default Scoreboard;
