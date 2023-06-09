import { Order } from "../Components/tables/OrdersTable";
import { standardDateFormat } from "../constants";
import userDataJson from "../userData.json";
import moment from "moment";

export const generateOrders = (): Order[] => {
  const users = JSON.parse(JSON.stringify(userDataJson))
    .map((user: any) => {
      return {
        name: `${user.results[0].name.first} ${user.results[0].name.last}`,
        email: user.results[0].email,
      };
      // This just randomizes the array to have different values show on the table on load/refresh
      // for demonstration purposes
    })
    .sort(() => (Math.random() > 0.5 ? 1 : -1));

  const today = moment(Date.now());
  const lastSixtyDays = [today];
  for (let i = 1; i < 60; i++) {
    lastSixtyDays.push(moment(today).subtract(i, `days`));
  }

  const products = [
    {
      productName: `EBook`,
      price: 3.99,
    },
    {
      productName: `Consulting Call`,
      price: 79.99,
    },
    {
      productName: `Budget Template`,
      price: 9.99,
    },
    {
      productName: `Inventory Tracker`,
      price: 7.99,
    },
  ];

  return users.map((user: any) => {
    const product = products[Math.floor(Math.random() * 4)];
    return {
      name: user.name,
      email: user.email,
      product: product.productName,
      date: moment(lastSixtyDays[Math.floor(Math.random() * 60)]).format(
        standardDateFormat
      ),
      total: product.price,
    };
  });
};
