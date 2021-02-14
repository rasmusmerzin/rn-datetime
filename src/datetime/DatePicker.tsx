import React, { useState, useMemo } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";

import NaiveDate from "./NaiveDate";
import { nextMonth, prevMonth } from "./YearMonth";
import { WEEKDAYS, MONTHS, UNIT, COLORS, DAY_MS, BASE_STYLE } from "./constant";

const getMonthDays = (year: number, month: number): [number[], number] => {
  const date = new NaiveDate(year, month).toLocalDate();
  const count = (() => {
    const yearMonth = nextMonth({ year, month });
    return (
      (new NaiveDate(yearMonth.year, yearMonth.month).toLocalDate().getTime() -
        date.getTime()) /
      DAY_MS
    );
  })();
  return [
    Array.from(Array(count).values()).map((_, i) => i + 1),
    date.getDay() - 1,
  ];
};

interface Props {
  value?: NaiveDate;
  onSubmit(date: NaiveDate): void;
  onCancel(): void;
}

export default ({ value, onSubmit, onCancel }: Props) => {
  const today = new NaiveDate();
  const [date, setDate] = useState(value || today);
  const [focused, setFocused] = useState({
    year: date.year,
    month: date.month,
  });
  const [days, offset] = useMemo(
    () => getMonthDays(focused.year, focused.month),
    [focused]
  );

  const isSelected = (day: number) =>
    date.year === focused.year &&
    date.month === focused.month &&
    date.day === day;

  const isToday = (day: number) =>
    today.year === focused.year &&
    today.month === focused.month &&
    today.day === day;

  return (
    <View style={BASE_STYLE.background}>
      <View style={BASE_STYLE.window}>
        <View style={style.split}>
          <View>
            <Text style={style.titleYear}>{date.year}</Text>
            <Text style={style.titleDate}>
              {date.toLocalDate().toDateString().substring(0, 10)}
            </Text>
          </View>

          <View>
            <View style={style.monthPicker}>
              <Text
                style={style.monthPickerArrow}
                onPress={() => setFocused(prevMonth(focused))}
              >
                {"‹"}
              </Text>
              <Text style={style.monthPickerTitle}>
                {MONTHS[focused.month]} {focused.year}
              </Text>
              <Text
                style={style.monthPickerArrow}
                onPress={() => setFocused(nextMonth(focused))}
              >
                {"›"}
              </Text>
            </View>
            <View style={style.table}>
              {WEEKDAYS.map((day, i) => (
                // @ts-ignore
                <Text key={i} style={[style.tableItem, style["tableItem" + i]]}>
                  {day}
                </Text>
              ))}
              {days.map((day, i) => (
                <Text
                  key={i}
                  style={[
                    style.tableItem,
                    // @ts-ignore
                    style["tableItem" + (7 + offset + i)],
                    isToday(day) && style.today,
                    isSelected(day) && BASE_STYLE.selected,
                  ]}
                  onPress={() =>
                    setDate(new NaiveDate(focused.year, focused.month, day))
                  }
                >
                  {day}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <View style={BASE_STYLE.submitRow}>
          <Text style={BASE_STYLE.submitRowItem} onPress={() => onSubmit(date)}>
            OK
          </Text>
          <Text style={BASE_STYLE.submitRowItem} onPress={onCancel}>
            Cancel
          </Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  split: {
    flexWrap: "wrap",
  },
  titleYear: {
    color: COLORS.text,
  },
  titleDate: {
    fontSize: 32,
    fontWeight: "700",
    width: 200,
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
  monthPickerArrow: {
    color: COLORS.text,
    flex: 1,
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 10,
  },
  table: {
    width: UNIT * 7,
    height: UNIT * 7,
  },
  tableItem: {
    color: COLORS.text,
    position: "absolute",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 12,
    width: UNIT,
    height: UNIT,
    borderRadius: UNIT,
  },
  ...(() => {
    const generatedStyle: { [key: string]: TextStyle } = {};
    for (let i = 0; i < 49; i++) {
      generatedStyle["tableItem" + i] = {
        color: i < 7 ? COLORS.shadow : COLORS.text,
        left: UNIT * (i % 7),
        top: UNIT * Math.floor(i / 7),
      };
    }
    return generatedStyle;
  })(),
  today: {
    color: COLORS.primary,
  },
});
