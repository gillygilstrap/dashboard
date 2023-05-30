import React from "react";

interface OrdersTableProps {
    // Add when needed
}

const StatCard: React.FC<OrdersTableProps> = (props: OrdersTableProps) => {
    return (

        <div className="orders-table w-full h-full bg-white rounded-md shadow-md flex flex-col font-bold text-center text-6xl tracking-wider">
            <div className="my-auto">Orders Table</div>
        </div>
    )
    
}

export default StatCard;