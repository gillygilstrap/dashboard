import { useContext } from "react";
import { AppContext } from "../Components/Layout";

import OrdersTable from "../Components/OrdersTable";

const Orders = () => {
  const { orders } = useContext(AppContext);

  return (
    <div className="mt-8">
      <OrdersTable orders={orders} />
    </div>
  );
};

export default Orders;
