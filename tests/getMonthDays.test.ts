import getMonthDays from "../src/getMonthDays";

test("getMonthDays", () => {
  let [days, offset] = getMonthDays(2021, 0);
  expect(days.length).toBe(31);
  expect(offset).toBe(4);
  [days, offset] = getMonthDays(2021, 1);
  expect(days.length).toBe(28);
  expect(offset).toBe(0);
  [days, offset] = getMonthDays(2021, 2);
  expect(days.length).toBe(31);
  expect(offset).toBe(0);
  [days, offset] = getMonthDays(2021, 3);
  expect(days.length).toBe(30);
  expect(offset).toBe(3);
  [days, offset] = getMonthDays(2024, 1);
  expect(days.length).toBe(29);
  expect(offset).toBe(3);
});
