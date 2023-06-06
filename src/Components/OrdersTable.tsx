import React from "react";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";

export interface Order {
  name: string;
  email: string;
  product: string;
  date: string;
  total: number;
}

interface OrdersTableProps {
  orders: Order[];
  isMainDashboardInstance: boolean;
}

const OrdersTable: React.FC<OrdersTableProps> = (props: OrdersTableProps) => {
  const { orders, isMainDashboardInstance } = props;
  const navigate = useNavigate();

  const handleTableClickOnMainDashboard = () => {
    if(isMainDashboardInstance) {
      navigate(`/orders`)

      // Scroll to top of page
      window.scrollTo(0, 0);
    }
  }

  let sortedOrders = orders.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  // Time the rows down to 10 for the MainDashboard Screen
  if (isMainDashboardInstance) {
    sortedOrders = sortedOrders.slice(0, 9);
  }
  return (
    <div
      className={`orders-table w-full  pb-6 bg-white rounded-md shadow-md flex flex-col text-center text-6xl ${
        isMainDashboardInstance ? "hover:cursor-pointer hover:scale-1002" : ""
      }`}
      onClick={() => handleTableClickOnMainDashboard()}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="-mx-4 mt-6 sm:-mx-0">
          <div className="text-4xl md:text-6xl md:text-left tracking wide text-slate-700 mb-6 tracking-wider text-center">
            Orders Table
          </div>
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-slate-700 sm:pl-0"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-center text-sm font-semibold text-slate-700 lg:table-cell"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-center text-sm font-semibold text-slate-700 sm:table-cell"
                >
                  Order Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-center text-sm font-semibold text-slate-700"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-center text-sm font-semibold text-slate-700"
                >
                  Sale Price
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sortedOrders.map((order) => (
                <tr key={order.email}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-slate-700 sm:w-auto sm:max-w-none sm:pl-0">
                    {order.name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Title</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {order.date}
                      </dd>
                      <dt className="sr-only sm:hidden">Email</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {order.email}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {order.email}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {order.date}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {order.product}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {formatMoney(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
