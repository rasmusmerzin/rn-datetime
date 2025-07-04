import { test, expect, describe } from "vitest";
import { StartOfWeek, getMonthDays } from "./getMonthDays";

const { Sunday, Monday } = StartOfWeek;

describe("getMonthDays", () => {
  test("Monday", () => {
    let [days, offset] = getMonthDays(2021, 0, Monday);
    expect(days.length).toBe(31);
    expect(offset).toBe(4);
    [days, offset] = getMonthDays(2021, 1, Monday);
    expect(days.length).toBe(28);
    expect(offset).toBe(0);
    [days, offset] = getMonthDays(2021, 2, Monday);
    expect(days.length).toBe(31);
    expect(offset).toBe(0);
    [days, offset] = getMonthDays(2021, 3, Monday);
    expect(days.length).toBe(30);
    expect(offset).toBe(3);
    [days, offset] = getMonthDays(2024, 1, Monday);
    expect(days.length).toBe(29);
    expect(offset).toBe(3);
    [days, offset] = getMonthDays(2025, 5, Monday);
    expect(days.length).toBe(30);
    expect(offset).toBe(6);
  });
  test("Sunday", () => {
    let [days, offset] = getMonthDays(2021, 0, Sunday);
    expect(days.length).toBe(31);
    expect(offset).toBe(5);
    [days, offset] = getMonthDays(2021, 1, Sunday);
    expect(days.length).toBe(28);
    expect(offset).toBe(1);
    [days, offset] = getMonthDays(2021, 2, Sunday);
    expect(days.length).toBe(31);
    expect(offset).toBe(1);
    [days, offset] = getMonthDays(2021, 3, Sunday);
    expect(days.length).toBe(30);
    expect(offset).toBe(4);
    [days, offset] = getMonthDays(2024, 1, Sunday);
    expect(days.length).toBe(29);
    expect(offset).toBe(4);
    [days, offset] = getMonthDays(2025, 5, Sunday);
    expect(days.length).toBe(30);
    expect(offset).toBe(0);
  });
});
