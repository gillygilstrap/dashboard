import { Day } from "./generateStats";
import { timePeriods, standardDateFormat } from "../constants";
import moment from "moment";

export const getRange = (
  fullYearArray: Day[],
  currentSelection: string
): Day[] => {
  const today = moment(Date.now()).format(standardDateFormat);

  // Today
  if (currentSelection === timePeriods.TODAY) {
    const todayObj = fullYearArray.find((day) => day.date === today);

    // Typescript being annoying....
    if (todayObj !== undefined) {
      return [todayObj];
    }
  }

  // Week
  if (currentSelection === timePeriods.WEEK) {
    const datesInRange = [today];

    for (let i = 1; i < 7; i++) {
      datesInRange.push(
        moment(Date.now()).subtract(i, `days`).format(standardDateFormat)
      );
    }

    return fullYearArray.filter((day) => {
      return datesInRange.includes(day.date);
    });
  }

  // 30 Days
  if (currentSelection === timePeriods.THIRTY_DAYS) {
    const datesInRange = [today];

    for (let i = 1; i < 30; i++) {
      datesInRange.push(
        moment(Date.now()).subtract(i, `days`).format(standardDateFormat)
      );
    }

    return fullYearArray.filter((day) => {
      return datesInRange.includes(day.date);
    });
  }

  // Year
  if (currentSelection === timePeriods.YEAR) {
    return fullYearArray;
  }

  return [];
};
