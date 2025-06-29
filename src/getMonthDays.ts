import NaiveDate from "./NaiveDate";
import { nextMonth } from "./YearMonth";

export default (
  year: number,
  month: number,
  startOfWeek: "S" | "M" = "M",
): [number[], number] => {
  const date = new NaiveDate(year, month).toLocalDate();
  const dayCount = (() => {
    const yearMonth = nextMonth({ year, month });
    return (
      (new NaiveDate(yearMonth.year, yearMonth.month).toLocalDate().getTime() -
        date.getTime()) /
      (1000 * 60 * 60 * 24)
    );
  })();
  return [
    Array.from(Array(Math.round(dayCount)), (_, i) => i + 1),
    startOfWeek === "S" ? date.getDay() : (date.getDay() + 6) % 7,
  ];
};
