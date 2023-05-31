import { Day } from "./generateStats";
import moment from "moment";

export const getRange = (fullYearArray: Day[], currentSelection: string) => {
  const today = moment(Date.now()).format(`MM/DD/YYYY`);

  if (currentSelection === `Today`) {
    return [fullYearArray.find((day) => day.date === today)];
  }

  if (currentSelection === `Week`) {
    const datesInRange = [today];

    for (let i = 1; i < 7; i++) {
      datesInRange.push(
        moment(Date.now()).subtract(i, `days`).format(`MM/DD/YYYY`)
      );
    }

    return fullYearArray.filter(day => {
        return datesInRange.includes(day.date)
    })
  }
  if (currentSelection === `30 Days`) {
    const datesInRange = [today];

    for (let i = 1; i < 30; i++) {
      datesInRange.push(
        moment(Date.now()).subtract(i, `days`).format(`MM/DD/YYYY`)
      );
    }

    return fullYearArray.filter(day => {
        return datesInRange.includes(day.date)
    })
  }

  if (currentSelection === `Year`) {
    return fullYearArray;
  }

  return [];
};
