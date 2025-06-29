import { NaiveTime } from "./NaiveTime";

export class NaiveDate {
  year: number;
  // 0 through 11
  month: number;
  day: number;

  constructor(year?: number, month = 0, day = 1) {
    if (year === undefined) {
      const date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.day = date.getDate();
    } else {
      this.year = year;
      this.month = month;
      this.day = day;
    }
  }

  toString() {
    return (
      String(this.year).padStart(4, "0") +
      "-" +
      String(this.month + 1).padStart(2, "0") +
      "-" +
      String(this.day).padStart(2, "0")
    );
  }

  toJSON() {
    return this.toString();
  }

  toLocalDate(time?: NaiveTime) {
    return time
      ? new Date(this.year, this.month, this.day, time.hour, time.minute)
      : new Date(this.year, this.month, this.day);
  }
}
