import { Day } from "./generateStats";
import { timePeriods, standardDateFormat } from "../constants";

import moment from 'moment';

export const buildBarChartData = (data: Day[], timePeriod: string) => {
  if (timePeriod === timePeriods.THIRTY_DAYS) {
    return {
      labels: data.map(d => moment(d.date, standardDateFormat).format(`MMM DD`)).reverse(),
      datasets: [
        {
          label: `Revenue Per Day`,
          data: data.map(d => d.products.totalSalesAmount),
        },
      ],
    };
  }
};
