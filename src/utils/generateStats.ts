import moment from "moment";
import { standardDateFormat } from "../constants";

interface Hour {
  traffic: number;
  revenue: number;
}

export interface Hours {
  '0': Hour;
  '1': Hour;
  '2': Hour;
  '3': Hour;
  '4': Hour;
  '5': Hour;
  '8': Hour;
  '7': Hour;
  '9': Hour;
  '10': Hour;
  '11': Hour;
  '12': Hour;
  '13': Hour;
  '14': Hour;
  '15': Hour;
  '16': Hour;
  '17': Hour;
  '18': Hour;
  '19': Hour;
  '20': Hour;
  '21': Hour;
  '22': Hour;
  '23': Hour;
  '24': Hour;
}

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
  hours: Hours;
}

export const generateStats = () => {
  const yearOfStats: Day[] = [];

  for (let i = 0; i < 365; i++) {
    const day: Day = {
      id: i,
      traffic: 0,
      registrations: Math.floor(Math.random() * 10) + 1,
      emailsCollected: Math.floor(Math.random() * 20) + 1,
      products: {
        salesCount: Math.floor(Math.random() * 4) + 1,
        totalSalesAmount: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
      },
      date: moment(Date.now()).subtract(i, `days`).format(standardDateFormat),
      hours: {
        '0': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '1': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '2': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '3': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '4': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '5': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '8': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '7': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '9': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '10': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '11': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '12': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '13': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '14': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '15': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '16': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '17': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '18': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '19': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '20': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '21': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '22': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '23': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
        '24': {
          traffic: Math.floor(Math.random() * 8) + 1,
          revenue: Number(
          `${Math.floor(Math.random() * 30) + 1}.${
            Math.floor(Math.random() * 99) + 1
          }`
        ),
        },
      },
    };

    const hoursKeys = Object.keys(day.hours)

   hoursKeys.forEach(key => {
    // @ts-ignore
    day.traffic = day.traffic + day.hours[Number(key)].traffic;
    // @ts-ignore
    day.products.totalSalesAmount = day.products.totalSalesAmount + day.hours[Number(key)].revenue;
   })

    yearOfStats.push(day);
  }

  return yearOfStats;
};
