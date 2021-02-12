import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const UNIT = 44;
const COLORS = {
  primary: "#4af",
};

export class NaiveDate {
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

interface Props {
  value?: NaiveDate;
  onSubmit(date: NaiveDate): void;
  onCancel(): void;
}

const getMonthWeeks = (year: number, month: number): number[][] => {
  const date = new NaiveDate(year, month).toLocalDate();
  const weeks: number[][] = [[]];
  for (let i = 1; i < date.getDay(); i++) weeks[0]?.push(0);
  for (let i = 0; i < 31; i++) {
    let lastWeek = weeks[weeks.length - 1];
    if (!lastWeek || lastWeek.length >= 7) weeks.push([]);
    lastWeek = weeks[weeks.length - 1];
    const day = date.getDate();
    lastWeek?.push(day);
    date.setDate(day + 1);
    if (date.getMonth() !== month) break;
  }
  const lastWeek = weeks[weeks.length - 1];
  if (lastWeek) {
    while (lastWeek.length < 7) lastWeek.push(0);
  }
  return weeks;
};

export default ({ value, onSubmit, onCancel }: Props) => {
  const [date, setDate] = useState(value || new NaiveDate());
  const [focused, setFocused] = useState({
    year: date.year,
    month: date.month,
  });
  const weeks = getMonthWeeks(focused.year, focused.month);

  const isSelected = (day: number) =>
    date.year === focused.year &&
    date.month === focused.month &&
    date.day === day;

  const monthBackward = () => {
    focused.month = (focused.month + 11) % 12;
    if (focused.month === 11) focused.year--;
    setFocused({ ...focused });
  };

  const monthForward = () => {
    focused.month = (focused.month + 1) % 12;
    if (focused.month === 0) focused.year++;
    setFocused({ ...focused });
  };

  return (
    <View style={style.background}>
      <View style={style.window}>
        <Text>{date.year}</Text>
        <Text style={style.titleDate}>
          {date.toLocalDate().toDateString().substring(0, 10)}
        </Text>

        <View style={style.monthPicker}>
          <Text style={style.monthPickerLeft} onPress={monthBackward}>
            {"‹"}
          </Text>
          <Text style={style.monthPickerTitle}>
            {MONTHS[focused.month]} {focused.year}
          </Text>
          <Text style={style.monthPickerRight} onPress={monthForward}>
            {"›"}
          </Text>
        </View>

        <View style={style.table}>
          <View style={style.row}>
            {WEEKDAYS.map((day, i) => (
              <Text key={i} style={[style.rowItemText, style.grayedText]}>
                {day}
              </Text>
            ))}
          </View>
          {weeks.map((week, i) => (
            <View key={i} style={style.row}>
              {week.map((day, j) => (
                <View key={j} style={style.rowItem}>
                  {day ? (
                    <View
                      style={[
                        style.circle,
                        isSelected(day) && style.selectedCircle,
                      ]}
                    >
                      <Text
                        style={[
                          style.rowItemText,
                          isSelected(day) && style.selectedText,
                        ]}
                        onPress={() =>
                          setDate(
                            new NaiveDate(focused.year, focused.month, day)
                          )
                        }
                      >
                        {day}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={style.submitRow}>
          <Text style={style.submitRowItem} onPress={() => onSubmit(date)}>
            OK
          </Text>
          <Text style={style.submitRowItem} onPress={onCancel}>
            Cancel
          </Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  titleDate: {
    fontSize: 32,
    fontWeight: "700",
    height: UNIT * 2,
  },
  monthPicker: {
    flexDirection: "row",
    height: UNIT * 1.2,
  },
  monthPickerTitle: {
    flex: 5,
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  monthPickerLeft: {
    flex: 1,
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 10,
  },
  monthPickerRight: {
    flex: 1,
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    height: UNIT,
  },
  rowItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rowItemText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 12,
    color: "#000",
  },
  grayedText: {
    color: "#888",
  },
  selectedText: {
    color: "#fff",
  },
  submitRow: {
    flexDirection: "row-reverse",
  },
  submitRowItem: {
    color: COLORS.primary,
    paddingHorizontal: 15,
  },
  circle: {
    width: UNIT * 0.9,
    height: UNIT * 0.9,
  },
  selectedCircle: {
    backgroundColor: COLORS.primary,
    borderRadius: UNIT,
  },
  table: {
    height: UNIT * 7,
  },
  background: {
    position: "absolute",
    backgroundColor: "#0004",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  window: {
    width: UNIT * 7,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
});
