import { test, expect } from "vitest";
import NaiveTime from "./NaiveTime";

test("constructor", () => {
  let time = new NaiveTime();
  expect(time.minute).toBe(new Date().getMinutes());
  expect(time.hour).toBe(new Date().getHours());

  time = new NaiveTime(20);
  expect(time.hour).toBe(20);
  expect(time.minute).toBe(0);

  time = new NaiveTime(0);
  expect(time.hour).toBe(0);
  expect(time.minute).toBe(0);

  time = new NaiveTime(0, 10);
  expect(time.hour).toBe(0);
  expect(time.minute).toBe(10);
});

test("toString", () => {
  expect(new NaiveTime().toString()).toBe(
    `${String(new Date().getHours()).padStart(2, "0")}:${String(
      new Date().getMinutes(),
    ).padStart(2, "0")}`,
  );
  expect(new NaiveTime(0).toString()).toBe("00:00");
  expect(String(new NaiveTime(4, 20))).toBe("04:20");
});

test("toJSON", () => {
  let time = new NaiveTime();
  expect(time.toJSON()).toBe(time.toString());
  expect(JSON.parse(JSON.stringify(time))).toBe(time.toString());

  time = new NaiveTime(0);
  expect(JSON.stringify(time)).toBe('"00:00"');
  expect(JSON.parse(JSON.stringify(time))).toBe("00:00");

  time = new NaiveTime(23, 59);
  expect(JSON.stringify(time)).toBe('"23:59"');
  expect(JSON.parse(JSON.stringify(time))).toBe("23:59");
});

test("toMinutes", () => {
  expect(new NaiveTime().toMinutes()).toBe(
    new Date().getHours() * 60 + new Date().getMinutes(),
  );
  expect(new NaiveTime(0).toMinutes()).toBe(0);
  expect(new NaiveTime(23, 59).toMinutes()).toBe(1439);
});
