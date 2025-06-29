export interface YearMonth {
  year: number;
  month: number;
}

export function nextMonth(yearMonth: YearMonth): YearMonth {
  const month = (yearMonth.month + 1) % 12;
  return {
    year: yearMonth.year + (month === 0 ? 1 : 0),
    month,
  };
}

export function prevMonth(yearMonth: YearMonth): YearMonth {
  const month = (yearMonth.month + 11) % 12;
  return {
    year: yearMonth.year - (month === 11 ? 1 : 0),
    month,
  };
}
