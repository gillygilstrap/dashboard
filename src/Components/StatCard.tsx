import React from "react";

import { calculateStatPercentage } from "../utils/calculateStatPercentage";

interface StatCardProps {
  title: string;
  count: number;
  percentage: string;
  isPositiveStat: boolean;
  previousCount: number;
  isMoneyStat: boolean;
  minDateInRange: string;
  maxDateInRange: string;
}

const StatCard: React.FC<StatCardProps> = (props: StatCardProps) => {
  const { count, previousCount, isMoneyStat, minDateInRange, maxDateInRange } = props;

  console.log(`minDateInRange, maxDateInRange`, minDateInRange, maxDateInRange)

  const isPositvePercentage = count >= previousCount;

  return (
    <div className="stat-card w-full h-full bg-white rounded-md shadow-md hover:shadow-lg flex flex-col text-center justify-around py-4 hover:cursor-pointer hover:scale-101">
      <div className="title text-2xl tracking-wider font-bold text-slate-700">
        {props.title}
      </div>
      <div className="count text-xl text-slate-700 font-bold tracking-widest">
        {isMoneyStat ? `$${count.toFixed(2)}` : count}
      </div>
      <div className="percentage text-lg tracking-wider mx-auto">
        <span
          className={`flex items-center ${
            isPositvePercentage ? `text-green-500` : `text-red-600`
          }`}
        >
          <span className="tracking-wider font-bold mr-1 mb-1">
            {isPositvePercentage ? `+` : `-`}
          </span>
          <span className="tracking-wider">{`${calculateStatPercentage(
            count,
            previousCount
          )}%`}</span>
        </span>
      </div>
      <hr/>
      <div className="text-sm text-slate-400 tracking-wider mt-2">{`${minDateInRange} - ${maxDateInRange}`}</div>
      <div className="text-sm text-slate-600 tracking-wider">{previousCount}</div>
    </div>
  );
};

export default StatCard;
