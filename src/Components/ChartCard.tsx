import React from "react";
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";

import { chartTypes } from "../constants";

interface ChartCardProps {
  type: string;
  data: {
    labels: string[];
    datasets: any[];
  };
}

const getTitle = (type: string): string => {
  if (type === chartTypes.LINE) {
    return `Total Website Traffic`;
  }
  if (type === chartTypes.BAR) {
    return `Total Revenue`;
  }
  if (type === chartTypes.PIE) {
    return `Product Sales`;
  }

  return ``;
};

const StatCard: React.FC<ChartCardProps> = (props: ChartCardProps) => {
  const { type, data } = props;
  return (
    <div className="chart-card text-slate-700 p-4 w-full bg-white rounded-md shadow-md hover:shadow-lg hover:cursor-pointer hover:scale-1002 flex flex-col text-center text-4xl tracking-wider">
      <div className={`${type === chartTypes.LINE ? "" : "hidden"}`}>
        <LineChart chartData={data} />
      </div>

      <div className={`${type === chartTypes.BAR ? "" : "hidden"}`}>
        <BarChart chartData={data} />
      </div>

      <div
        className={`${
          type === chartTypes.PIE ? "h-60 flex mx-auto" : "hidden"
        }`}
      >
        <PieChart chartData={data} />
      </div>

      <div className="border-t border-slate-300 mt-6 pt-4">
        {getTitle(type)}
      </div>
    </div>
  );
};

export default StatCard;
