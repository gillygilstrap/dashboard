import { useContext } from "react";
import { AppContext } from "./Layout";
import { tabs } from "../../constants";
import { isCurrentTab } from "../../utils/isCurrentTab";

import OrdersTable from "../tables/OrdersTable";

const Orders = () => {
  const { orders, currentTab, setCurrentTab } = useContext(AppContext);

  if(!isCurrentTab(currentTab, tabs.ORDERS)) {
    setCurrentTab(tabs.ORDERS)
  }

  return (
    <div className="mt-8">
      <OrdersTable orders={orders} isMainDashboardInstance={false} />
    </div>
  );
};

export default Orders;
