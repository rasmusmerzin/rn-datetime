import React, { useState, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import NaiveDate from "./NaiveDate";
import { nextMonth, prevMonth } from "./YearMonth";
import { WEEKDAYS, MONTHS, UNIT, COLORS, DAY_MS } from "./constant";

const getMonthWeeks = (year: number, month: number): number[][] => {
  const date = new NaiveDate(year, month).toLocalDate();
  const days = (() => {
    const yearMonth = nextMonth({ year, month });
    return (
      (new NaiveDate(yearMonth.year, yearMonth.month).toLocalDate().getTime() -
        date.getTime()) /
      DAY_MS
    );
  })();
  const weeks: number[][] = [[]];
  // @ts-ignore
  for (let i = 1; i < date.getDay(); i++) weeks[0].push(0);
  for (let day = 1; day <= days; day++) {
    let lastWeek = weeks[weeks.length - 1];
    // @ts-ignore
    if (lastWeek.length >= 7) weeks.push([]);
    lastWeek = weeks[weeks.length - 1];
    lastWeek?.push(day);
  }
  const lastWeek = weeks[weeks.length - 1];
  // @ts-ignore
  while (lastWeek.length < 7) lastWeek.push(0);
  return weeks;
};

interface Props {
  value?: NaiveDate;
  onSubmit(date: NaiveDate): void;
  onCancel(): void;
}

export default ({ value, onSubmit, onCancel }: Props) => {
  const [date, setDate] = useState(value || new NaiveDate());
  const [focused, setFocused] = useState({
    year: date.year,
    month: date.month,
  });
  const weeks = useMemo(() => getMonthWeeks(focused.year, focused.month), [
    focused,
  ]);

  const isSelected = (day: number) =>
    date.year === focused.year &&
    date.month === focused.month &&
    date.day === day;

  return (
    <View style={style.background}>
      <View style={style.window}>
        <Text style={style.titleYear}>{date.year}</Text>
        <Text style={style.titleDate}>
          {date.toLocalDate().toDateString().substring(0, 10)}
        </Text>

        <View style={style.monthPicker}>
          <Text
            style={style.monthPickerLeft}
            onPress={() => setFocused(prevMonth(focused))}
          >
            {"‹"}
          </Text>
          <Text style={style.monthPickerTitle}>
            {MONTHS[focused.month]} {focused.year}
          </Text>
          <Text
            style={style.monthPickerLeft}
            onPress={() => setFocused(nextMonth(focused))}
          >
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
  titleYear: {
    color: COLORS.text,
  },
  titleDate: {
    fontSize: 32,
    fontWeight: "700",
    height: UNIT * 2,
    color: COLORS.text,
  },
  monthPicker: {
    flexDirection: "row",
    height: UNIT * 1.2,
  },
  monthPickerTitle: {
    color: COLORS.text,
    flex: 5,
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  monthPickerLeft: {
    color: COLORS.text,
    flex: 1,
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 10,
  },
  monthPickerRight: {
    color: COLORS.text,
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
    color: COLORS.text,
  },
  grayedText: {
    color: COLORS.shadow,
  },
  selectedText: {
    color: COLORS.background,
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
  submitRow: {
    flexDirection: "row-reverse",
  },
  submitRowItem: {
    color: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: UNIT / 4,
    textAlignVertical: "center",
  },
  background: {
    position: "absolute",
    backgroundColor: COLORS.blurred,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  window: {
    width: UNIT * 7,
    backgroundColor: COLORS.background,
    paddingHorizontal: UNIT / 2,
    paddingTop: UNIT / 2,
    paddingBottom: UNIT / 2,
    borderRadius: UNIT / 4,
  },
});
