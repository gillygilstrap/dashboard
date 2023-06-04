import React from "react";

import { calculateStatPercentage } from "../utils/calculateStatPercentage";
import { previousRange } from "../utils/getPreviousRange";
import { formatMoney } from "../utils/formatMoney";

interface StatCardProps {
  title: string;
  count: number;
  isPositiveStat: boolean;
  previousCount: number;
  isMoneyStat: boolean;
  showPreviousDateRange: boolean;
  previousRange: previousRange;
}

const StatCard: React.FC<StatCardProps> = (props: StatCardProps) => {
  const {
    count,
    previousCount,
    isMoneyStat,
    showPreviousDateRange,
    previousRange,
  } = props;

  const isPositvePercentage = count >= previousCount;

  return (
    <div className="stat-card w-full h-full bg-white rounded-md shadow-md flex flex-col text-center justify-around py-4">
      <div className="title text-2xl tracking-wider font-bold text-slate-700">
        {props.title}
      </div>
      <div className="count text-xl text-slate-700 font-bold tracking-widest">
        {isMoneyStat ? `${formatMoney(count)}` : count}
      </div>
      <div
        className={`previous-stats w-full flex flex-col items-center ${
          showPreviousDateRange ? `` : `hidden`
        }`}
      >
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
        <div className="text-sm text-amber-500 tracking-wider w-full border-t border-slate-300 pt-1">{`${previousRange.min} - ${previousRange.max}`}</div>
        <div className="text-sm text-slate-600 tracking-wider font-bold">
          {isMoneyStat ? `${formatMoney(previousCount)}` : previousCount}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
