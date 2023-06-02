import React from "react";

interface GraphCardProps {
    // Add when needed
}

const StatCard: React.FC<GraphCardProps> = (props: GraphCardProps) => {
    return (

        <div className="graph-card w-full h-full bg-white rounded-md shadow-md hover:shadow-lg flex flex-col font-bold text-center text-4xl tracking-wider hover:cursor-pointer hover:scale-101">
            <div className="my-auto">Graph Card</div>
        </div>
    )
    
}

export default StatCard;