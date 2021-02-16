import React, { useState, useMemo } from "react";
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";

import NaiveDate from "./NaiveDate";
import { UNIT, COLORS, BASE_STYLE } from "./constant";
import { nextMonth, prevMonth } from "./YearMonth";
import getMonthDays from "./getMonthDays";
import Modal from "./Modal";

interface Props {
  value?: NaiveDate;
  visible: boolean;
  onSubmit(date: NaiveDate): void;
  onCancel(): void;
}

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

export default ({ value, visible, onSubmit, onCancel }: Props) => {
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

  const selectedClass = useMemo(
    () =>
      date.year === focused.year && date.month === focused.month
        ? "tableItem" + (6 + offset + date.day)
        : undefined,
    [date, focused]
  );

  const isToday = (day: number) =>
    today.year === focused.year &&
    today.month === focused.month &&
    today.day === day;

  const cancel = () => {
    if (value) {
      setDate(value);
      setFocused({
        year: value.year,
        month: value.month,
      });
    } else {
      setFocused({
        year: date.year,
        month: date.month,
      });
    }
    onCancel();
  };

  const submit = () => {
    setFocused({
      year: date.year,
      month: date.month,
    });
    onSubmit(date);
  };

  const focusPrevMonth = () => setFocused(prevMonth(focused));
  const focusNextMonth = () => setFocused(nextMonth(focused));
  const selectDay = (day: number) =>
    setDate(new NaiveDate(focused.year, focused.month, day));

  return (
    <Modal visible={visible} onCancel={cancel} onSubmit={submit}>
      <View style={style.split}>
        <View>
          <Text style={style.titleYear}>{date.year}</Text>
          <Text style={style.titleDate}>
            {date.toLocalDate().toDateString().substring(0, 10)}
          </Text>
        </View>

        <View>
          <View style={style.monthPicker}>
            <Text style={style.monthPickerArrow} onPress={focusPrevMonth}>
              {"‹"}
            </Text>
            <Text style={style.monthPickerTitle}>
              {MONTHS[focused.month]} {focused.year}
            </Text>
            <Text style={style.monthPickerArrow} onPress={focusNextMonth}>
              {"›"}
            </Text>
          </View>

          <View style={style.table}>
            {WEEKDAYS.map((day, i) => (
              <View
                key={i}
                style={[
                  BASE_STYLE.tableItem,
                  // @ts-ignore
                  style["tableItem" + i],
                ]}
              >
                <Text style={[style.tableItemText, style.tableWeekDay]}>
                  {day}
                </Text>
              </View>
            ))}
            {days.map((day, i) => (
              <Pressable
                key={i}
                style={[
                  BASE_STYLE.tableItem,
                  // @ts-ignore
                  style["tableItem" + (7 + offset + i)],
                ]}
                onPress={() => selectDay(day)}
              >
                <Text
                  style={[style.tableItemText, isToday(day) && style.today]}
                >
                  {day}
                </Text>
              </Pressable>
            ))}
            {selectedClass && (
              <View
                style={[
                  BASE_STYLE.tableItem,
                  BASE_STYLE.selected,
                  // @ts-ignore
                  style[selectedClass],
                ]}
              >
                <Text style={[style.tableItemText, BASE_STYLE.selectedText]}>
                  {date.day}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
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
    color: COLORS.text,
    marginBottom: UNIT * 0.7,
  },
  monthPicker: {
    flexDirection: "row",
    alignItems: "center",
    height: UNIT,
    marginVertical: UNIT / 3,
  },
  monthPickerTitle: {
    color: COLORS.text,
    flex: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  monthPickerArrow: {
    color: COLORS.text,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 10,
  },
  table: {
    width: UNIT * 7,
    height: UNIT * 7,
  },
  tableItemText: {
    fontSize: 12,
    color: COLORS.text,
  },
  tableWeekDay: {
    color: COLORS.shadow,
  },
  ...(() => {
    const generatedStyle: { [key: string]: TextStyle } = {};
    for (let i = 0; i < 49; i++) {
      generatedStyle["tableItem" + i] = {
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
