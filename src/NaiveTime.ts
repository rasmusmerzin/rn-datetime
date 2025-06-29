export class NaiveTime {
  hour: number;
  minute: number;

  constructor(hour?: number, minute = 0) {
    if (hour === undefined) {
      const date = new Date();
      this.hour = date.getHours();
      this.minute = date.getMinutes();
    } else {
      this.hour = hour;
      this.minute = minute;
    }
  }

  toString() {
    return (
      String(this.hour).padStart(2, "0") +
      ":" +
      String(this.minute).padStart(2, "0")
    );
  }

  toJSON() {
    return this.toString();
  }

  toMinutes() {
    return this.hour * 60 + this.minute;
  }
}
