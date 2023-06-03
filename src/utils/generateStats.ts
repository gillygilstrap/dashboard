import moment from "moment";
import { standardDateFormat } from "../constants";

export interface Day {
  id: number;
  traffic: number;
  registrations: number;
  emailsCollected: number;
  products: {
    salesCount: number;
    totalSalesAmount: number;
  };
  date: string;
}

export const generateStats = () => {
  const yearOfStats: Day[] = [];

  for (let i = 0; i < 365; i++) {
    yearOfStats.push({
      id: i,
      traffic: Math.floor(Math.random() * 200) + 1,
      registrations: Math.floor(Math.random() * 10) + 1,
      emailsCollected: Math.floor(Math.random() * 20) + 1,
      products: {
        salesCount: Math.floor(Math.random() * 4) + 1,
        totalSalesAmount: Number(
          `${Math.floor(Math.random() * 99) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
      },
      date: moment(Date.now()).subtract(i, `days`).format(standardDateFormat),
    });
  }

  return yearOfStats;
};
