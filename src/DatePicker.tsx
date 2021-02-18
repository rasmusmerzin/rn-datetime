import React, { useState, useMemo, useCallback } from "react";
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";

import NaiveDate from "./NaiveDate";
import { UNIT, COLORS } from "./constant";
import { nextMonth, prevMonth } from "./YearMonth";
import getMonthDays from "./getMonthDays";
import Modal from "./Modal";
import Years from "./Years";

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

enum Mode {
  Calendar,
  Year,
}

interface Props {
  prioritizeYear?: boolean;
  value?: NaiveDate;
  visible: boolean;
  onSubmit(date: NaiveDate): void;
  onCancel(): void;
}

export default ({
  prioritizeYear,
  value,
  visible,
  onSubmit,
  onCancel,
}: Props) => {
  const today = new NaiveDate();
  const [date, setDate] = useState(value || today);
  const [focused, setFocused] = useState({
    year: date.year,
    month: date.month,
  });
  const [mode, setMode] = useState(prioritizeYear ? Mode.Year : Mode.Calendar);

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
    const defaultMode = prioritizeYear ? Mode.Year : Mode.Calendar;
    mode !== defaultMode && setMode(defaultMode);

    if (value) {
      (date.year !== value.year ||
        date.month !== value.month ||
        date.day !== value.day) &&
        setDate(value);
      (focused.year !== value.year || focused.month !== value.month) &&
        setFocused({
          year: value.year,
          month: value.month,
        });
    } else {
      (focused.year !== date.year || focused.month !== date.month) &&
        setFocused({
          year: date.year,
          month: date.month,
        });
    }

    onCancel();
  };

  const submit = () => {
    if (mode === Mode.Year) setMode(Mode.Calendar);
    else {
      const defaultMode = prioritizeYear ? Mode.Year : Mode.Calendar;
      mode !== defaultMode && setMode(defaultMode);

      (focused.year !== date.year || focused.month !== date.month) &&
        setFocused({
          year: date.year,
          month: date.month,
        });

      onSubmit(date);
    }
  };

  const focusPrevMonth = () => setFocused(prevMonth(focused));
  const focusNextMonth = () => setFocused(nextMonth(focused));
  const selectDay = (day: number) =>
    setDate(new NaiveDate(focused.year, focused.month, day));

  const toggleMode = () =>
    setMode(mode === Mode.Calendar ? Mode.Year : Mode.Calendar);
  const focusYear = useCallback((year: number) => {
    focused.year !== year && setFocused({ ...focused, year });
    date.year !== year && setDate(new NaiveDate(year, date.month, 1));
    setMode(Mode.Calendar);
  }, []);

  return (
    <Modal visible={visible} onCancel={cancel} onSubmit={submit}>
      <View style={style.split}>
        <View>
          <Text style={style.titleYear} onPress={toggleMode}>
            {date.year}
          </Text>
          <Text style={style.titleDate}>
            {date.toLocalDate().toDateString().substring(0, 10)}
          </Text>
        </View>

        <View style={style.table}>
          {mode === Mode.Calendar ? (
            <>
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

              <View>
                {WEEKDAYS.map((day, i) => (
                  <View
                    key={i}
                    style={[
                      style.tableItem,
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
                      style.tableItem,
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
                      style.tableItem,
                      style.selected,
                      // @ts-ignore
                      style[selectedClass],
                    ]}
                  >
                    <Text style={[style.tableItemText, style.selectedText]}>
                      {date.day}
                    </Text>
                  </View>
                )}
              </View>
            </>
          ) : (
            <Years selected={date.year} select={focusYear} />
          )}
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
  table: {
    width: UNIT * 7,
    height: UNIT * 8.1,
  },
  monthPicker: {
    flexDirection: "row",
    alignItems: "center",
    height: UNIT * 1.1,
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
  tableItemText: {
    fontSize: 12,
    color: COLORS.text,
  },
  tableItem: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: UNIT,
    height: UNIT,
    borderRadius: UNIT,
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
  selectedText: {
    color: COLORS.background,
  },
  today: {
    color: COLORS.primary,
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
});
