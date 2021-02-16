import NaiveDate from "./NaiveDate";
import { nextMonth } from "./YearMonth";

export default (year: number, month: number): [number[], number] => {
  const date = new NaiveDate(year, month).toLocalDate();
  const count = (() => {
    const yearMonth = nextMonth({ year, month });
    return (
      (new NaiveDate(yearMonth.year, yearMonth.month).toLocalDate().getTime() -
        date.getTime()) /
      (1000 * 60 * 60 * 24)
    );
  })();
  return [Array.from(Array(count), (_, i) => i + 1), date.getDay() - 1];
};
