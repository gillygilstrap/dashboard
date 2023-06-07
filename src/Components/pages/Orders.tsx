import { useContext } from "react";
import { AppContext } from "./Layout";

import OrdersTable from "../OrdersTable";

const Orders = () => {
  const { orders } = useContext(AppContext);

  return (
    <div className="mt-8">
      <OrdersTable orders={orders} isMainDashboardInstance={false} />
    </div>
  );
};

export default Orders;
