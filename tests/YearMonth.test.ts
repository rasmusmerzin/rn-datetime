import { nextMonth, prevMonth } from "../src/YearMonth";

test("nextMonth", () => {
  let yearMonth = {
    year: 2021,
    month: 0,
  };
  yearMonth = nextMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(1);
  yearMonth = nextMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(2);
  yearMonth = nextMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(3);
  yearMonth = nextMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(4);
  yearMonth = nextMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(5);
  yearMonth = nextMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(6);
  yearMonth = nextMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(7);
  yearMonth = nextMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(8);
  yearMonth = nextMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(9);
  yearMonth = nextMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(10);
  yearMonth = nextMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(11);
  yearMonth = nextMonth(yearMonth);
  expect(yearMonth.year).toBe(2022);
  expect(yearMonth.month).toBe(0);
  yearMonth = nextMonth(yearMonth);
  expect(yearMonth.year).toBe(2022);
  expect(yearMonth.month).toBe(1);
});

test("prevMonth", () => {
  let yearMonth = {
    year: 2021,
    month: 11,
  };
  yearMonth = prevMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(10);
  yearMonth = prevMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(9);
  yearMonth = prevMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(8);
  yearMonth = prevMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(7);
  yearMonth = prevMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(6);
  yearMonth = prevMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(5);
  yearMonth = prevMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(4);
  yearMonth = prevMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(3);
  yearMonth = prevMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(2);
  yearMonth = prevMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(1);
  yearMonth = prevMonth(yearMonth);
  expect(yearMonth.year).toBe(2021);
  expect(yearMonth.month).toBe(0);
  yearMonth = prevMonth(yearMonth);
  expect(yearMonth.year).toBe(2020);
  expect(yearMonth.month).toBe(11);
  yearMonth = prevMonth(yearMonth);
  expect(yearMonth.year).toBe(2020);
  expect(yearMonth.month).toBe(10);
});
