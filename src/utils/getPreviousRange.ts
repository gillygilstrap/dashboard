import { Day } from "./generateStats";
import { timePeriods, standardDateFormat } from "../constants";
import moment from "moment";

interface previousRange {
  min: string;
  max: string;
}

export const getPreviousRange = (
  fullYearStats: Day[],
  timePeriod: string
): previousRange => {

    let filteredDates: string[] = [];

  // Today
  if (timePeriod === timePeriods.TODAY) {
    const yesterday = moment(Date.now())
      .subtract(1, `days`)
      .format(standardDateFormat);

    return {
      min: yesterday,
      max: yesterday,
    };
  }

  // Week
  if (timePeriod === timePeriods.WEEK) {
    // Find previous week dates
    for (let i = 8; i < 14; i++) {
      filteredDates.push(
        moment(Date.now()).subtract(i, `days`).format(standardDateFormat)
      );
    }

    return {
        min: moment
        .min(
          filteredDates.map((day) => moment(day, standardDateFormat))
        )
        .format(standardDateFormat),
        max: moment
        .max(
          filteredDates.map((day) => moment(day, standardDateFormat))
        )
        .format(standardDateFormat)
    }
  }

  return {
    min: ``,
    max: ``
  }
};
