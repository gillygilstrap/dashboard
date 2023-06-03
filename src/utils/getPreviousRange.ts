import { Day } from "./generateStats";
import { timePeriods, standardDateFormat } from "../constants";
import moment from "moment";

export interface previousRange {
  min: string;
  max: string;
}

export const getPreviousRange = (timePeriod: string): previousRange => {
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
    for (let i = 7; i < 14; i++) {
      filteredDates.push(
        moment(Date.now()).subtract(i, `days`).format(standardDateFormat)
      );
    }
  }

  // 30 Days
  if (timePeriod === timePeriods.THIRTY_DAYS) {
    // Find previous 30 dates
    for (let i = 30; i < 60; i++) {
      filteredDates.push(
        moment(Date.now()).subtract(i, `days`).format(standardDateFormat)
      );
    }
  }
  // Year
  if (timePeriod === timePeriods.YEAR) {
    console.log(`Does this get hit???`);
    for (let i = 365; i < 730; i++) {
      filteredDates.push(
        moment(Date.now()).subtract(i, `days`).format(standardDateFormat)
      );
    }
  }

  if (filteredDates.length) {
    return {
      min: moment
        .min(filteredDates.map((day) => moment(day, standardDateFormat)))
        .format(standardDateFormat),
      max: moment
        .max(filteredDates.map((day) => moment(day, standardDateFormat)))
        .format(standardDateFormat),
    };
  }

  // Default for TypeScript
  else {
    return {
      min: ``,
      max: ``,
    };
  }
};
