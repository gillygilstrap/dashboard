import { Day } from "./generateStats";
import { timePeriods, standardDateFormat } from "../constants";

import moment from "moment";

export const buildBarChartData = (
  data: Day[],
  timePeriod: string,
  showPreviousDateRange: boolean
) => {
  const currentBlue = `#0EA5E9`;
  const previousOrange = `#f59e0b`;

  // Today
  if (timePeriod === timePeriods.TODAY) {
    const todayData = data[0];
    const yesterdayData = data[1];
    const currentHour = moment(Date.now()).format(`hh:00 A`);

    // Last 24 Hours
    const chartData = {
      labels: Object.keys(todayData.hours)
        .map((_, i) => {
          return moment(currentHour, `hh:00 A`)
            .subtract(i, `hours`)
            .format(`hh:00 A`);
        })
        .reverse(),
      datasets: [
        {
          label: `Last 24 Hours`,
          data: Object.keys(todayData.hours)
            .reverse()
            .map((key) => {
              // @ts-ignore
              return todayData.hours[key].revenue;
            }),
          backgroundColor: currentBlue,
        },
      ],
    };

    // Previous 24 hours
    if (showPreviousDateRange) {
      chartData.datasets.push({
        label: `Previous 24 Hours`,
        data: Object.keys(yesterdayData.hours)
          .reverse()
          .map((key) => {
            // @ts-ignore
            return yesterdayData.hours[key].revenue;
          }),
        backgroundColor: previousOrange,
      });
    }

    return chartData;
  }

  if (timePeriod === timePeriods.WEEK) {
    const filteredData: Day[] = [];
    const previousData: Day[] = [];

    for (let i = 0; i < 7; i++) {
      filteredData.push(data[i]);
      previousData.push(data[i + 7])
    }

    // Last 7 Days
    const chartData =  {
      labels: filteredData
        .map((d) => moment(d.date, standardDateFormat).format(`MMM DD`))
        .reverse(),
      datasets: [
        {
          label: `Last 7 Days`,
          data: filteredData.map((d) => d.products.totalSalesAmount),
          backgroundColor: currentBlue,
        },
      ],
    };

    // Previous 7 days
    if(showPreviousDateRange) {
      chartData.datasets.push({
        label: `Previous 7 Days`,
        data: previousData.map((d) => d.products.totalSalesAmount),
        backgroundColor: previousOrange,
      })
    }

    return chartData;
  }

  if (timePeriod === timePeriods.THIRTY_DAYS) {
    const filteredData: Day[] = [];
    const previousData: Day[] = [];

    for (let i = 0; i < 30; i++) {
      filteredData.push(data[i]);
      previousData.push(data[i + 30]);
    }

    // Last 30 Days
    const chartData = {
      labels: filteredData
        .map((d) => moment(d.date, standardDateFormat).format(`MMM DD`))
        .reverse(),
      datasets: [
        {
          label: `Last 30 Days`,
          data: filteredData.map((d) => d.products.totalSalesAmount),
          backgroundColor: currentBlue,
        },
      ],
    };

    // Previous 30 Days
    if(showPreviousDateRange) {
      chartData.datasets.push({
        label: `Previous 30 Days`,
        data: previousData.map((d) => d.products.totalSalesAmount),
        backgroundColor: previousOrange,
      })
    }

    return chartData;
  }
  if (timePeriod === timePeriods.YEAR) {
    return {
      labels: data
        .map((d) => moment(d.date, standardDateFormat).format(`MMM DD`))
        .reverse(),
      datasets: [
        {
          label: `Last 365 Days`,
          data: data.map((d) => d.products.totalSalesAmount),
        },
      ],
    };
  }
};
