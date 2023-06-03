import { Day } from "./generateStats";
import { timePeriods, standardDateFormat } from "../constants";
import moment from "moment";

interface CountObj {
  val: number;
  day: string;
}

export const getPreviousCount = (
  fullYearStats: Day[],
  timePeriod: string,
  valType: string
): number => {
  const countObjs = mapToCountObjs(fullYearStats, valType);
  let filteredDates: string[] = [];
  let count = 0;

  // Today
  if (timePeriod === timePeriods.TODAY) {
    const yesterday = moment(Date.now())
      .subtract(1, `days`)
      .format(standardDateFormat);
    const todayObj = countObjs.find((countObj) => countObj.day === yesterday);

    // Typescript being annoying....
    if (todayObj !== undefined) {
      return todayObj.val;
    }
  }

  // Week
  if (timePeriod === timePeriods.WEEK) {
    // Find previous week dates
    for (let i = 8; i < 14; i++) {
      filteredDates.push(
        moment(Date.now()).subtract(i, `days`).format(standardDateFormat)
      );
    }

    countObjs.forEach(({ val, day }) => {
      if (filteredDates.includes(day)) {
        count = count + val;
      }
    });
  }

  // 30 Days
  if (timePeriod === timePeriods.THIRTY_DAYS) {
    // Find previous 30 dates
    for (let i = 31; i < 60; i++) {
      filteredDates.push(
        moment(Date.now()).subtract(i, `days`).format(standardDateFormat)
      );
    }

    countObjs.forEach(({ val, day }) => {
      if (filteredDates.includes(day)) {
        count = count + val;
      }
    });
  }
  // Year
  if (timePeriod === timePeriods.YEAR) {
    // For previous year just get random number
    return getRandomValueForPreviousYear(valType);
  }

  return count;
};

const mapToCountObjs = (fullYearStats: Day[], valType: string): CountObj[] => {
  // Traffic
  if (valType === "traffic") {
    return fullYearStats.map((statObj) => {
      return {
        val: statObj.traffic,
        day: statObj.date,
      };
    });
  }
  // Registrations
  if (valType === "registrations") {
    return fullYearStats.map((statObj) => {
      return {
        val: statObj.registrations,
        day: statObj.date,
      };
    });
  }
  // Emails Collected
  if (valType === "emailsCollected") {
    return fullYearStats.map((statObj) => {
      return {
        val: statObj.emailsCollected,
        day: statObj.date,
      };
    });
  }
  // Product Sales Amount
  if (valType === "productSales") {
    return fullYearStats.map((statObj) => {
      return {
        val: statObj.products.salesCount,
        day: statObj.date,
      };
    });
  }
  // Total Sales Amount
  if (valType === "totalSales") {
    return fullYearStats.map((statObj) => {
      return {
        val: statObj.products.totalSalesAmount,
        day: statObj.date,
      };
    });
  }

  return [
    {
      val: 0,
      day: ``,
    },
  ];
};

const getRandomValueForPreviousYear = (valType: string) => {
  if (valType === `traffic`) {
    return Math.floor(Math.random() * 5000) + 33000;
  }
  if (valType === `registrations`) {
    return Math.floor(Math.random() * 300) + 1800;
  }
  if (valType === `emailsCollected`) {
    return Math.floor(Math.random() * 1500) + 2500;
  }
  if (valType === `productSales`) {
    return Math.floor(Math.random() * 150) + 800;
  }
  if (valType === `totalSales`) {
    return Math.floor(Math.random() * 2000) + 17000;
  }

  return 0;
};
