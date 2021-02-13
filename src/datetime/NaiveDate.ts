export default class NaiveDate {
  year: number;
  // 0 through 11
  month: number;
  day: number;

  constructor(year?: number, month = 0, day = 1) {
    if (year) {
      this.year = year;
      this.month = month;
      this.day = day;
    } else {
      const date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.day = date.getDate();
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

  toLocalDate() {
    return new Date(this.toString());
  }
}
