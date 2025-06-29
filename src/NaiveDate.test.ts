import { test, expect } from "vitest";
import { NaiveTime } from "./NaiveTime";
import { NaiveDate } from "./NaiveDate";

test("constructor", () => {
  let date = new NaiveDate();
  expect(date.day).toBe(new Date().getDate());
  expect(date.month).toBe(new Date().getMonth());
  expect(date.year).toBe(new Date().getFullYear());

  date = new NaiveDate(1905);
  expect(date.year).toBe(1905);
  expect(date.month).toBe(0);
  expect(date.day).toBe(1);

  date = new NaiveDate(2077, 2);
  expect(date.year).toBe(2077);
  expect(date.month).toBe(2);
  expect(date.day).toBe(1);

  date = new NaiveDate(3000, 12, 31);
  expect(date.year).toBe(3000);
  expect(date.month).toBe(12);
  expect(date.day).toBe(31);
});

test("toString", () => {
  expect(new NaiveDate().toString()).toBe(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(new Date().getDate()).padStart(2, "0")}`,
  );
  expect(new NaiveDate(2000).toString()).toBe("2000-01-01");
  expect(String(new NaiveDate(4, 3))).toBe("0004-04-01");
  expect(String(new NaiveDate(4, 3, 4))).toBe("0004-04-04");
});

test("toJSON", () => {
  let date = new NaiveDate();
  expect(date.toJSON()).toBe(date.toString());
  expect(JSON.parse(JSON.stringify(date))).toBe(date.toString());

  date = new NaiveDate(20);
  expect(JSON.stringify(date)).toBe('"0020-01-01"');
  expect(JSON.parse(JSON.stringify(date))).toBe("0020-01-01");

  date = new NaiveDate(9923, 7, 10);
  expect(JSON.stringify(date)).toBe('"9923-08-10"');
  expect(JSON.parse(JSON.stringify(date))).toBe("9923-08-10");
});

test("toLocaleDate", () => {
  const naiveDate = new NaiveDate();
  let date = naiveDate.toLocalDate();
  expect(date.getFullYear()).toBe(naiveDate.year);
  expect(date.getMonth()).toBe(naiveDate.month);
  expect(date.getDate()).toBe(naiveDate.day);
  expect(date.getHours()).toBe(0);
  expect(date.getMinutes()).toBe(0);

  date = naiveDate.toLocalDate(new NaiveTime(9, 45));
  expect(date.getFullYear()).toBe(naiveDate.year);
  expect(date.getMonth()).toBe(naiveDate.month);
  expect(date.getDate()).toBe(naiveDate.day);
  expect(date.getHours()).toBe(9);
  expect(date.getMinutes()).toBe(45);
});
