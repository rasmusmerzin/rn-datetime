export default interface YearMonth {
  year: number;
  month: number;
}

export const nextMonth = (yearMonth: YearMonth): YearMonth => {
  const month = (yearMonth.month + 1) % 12;
  return {
    year: yearMonth.year + (month === 0 ? 1 : 0),
    month,
  };
};

export const prevMonth = (yearMonth: YearMonth): YearMonth => {
  const month = (yearMonth.month + 11) % 12;
  return {
    year: yearMonth.year - (month === 11 ? 1 : 0),
    month,
  };
};
