import React from "react";

interface StatCardProps {
    title: string,
    count: string,
    percentage: string,
    isPositiveStat: boolean
}


const StatCard: React.FC<StatCardProps> = (props: StatCardProps) => {
    return (
        <div className="stat-card w-full h-full bg-white rounded-md shadow-md flex flex-col text-center justify-around py-4">
            <div className="title text-2xl tracking-wider font-bold text-slate-700">{props.title}</div>
            <div className="count text-xl text-slate-700 font-bold tracking-widest">{props.count}</div>
            <div className="percentage text-lg tracking-wider mx-auto">
                <span className="flex items-center text-green-500">
                    <span className="tracking-wider font-bold mr-1 mb-1">+</span>
                    <span className="tracking-wider">{`${props.percentage}%`}</span>
                </span>
            </div>
        </div>
    )
    
}

export default StatCard;