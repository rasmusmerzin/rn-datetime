import React, { useState, useMemo } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";

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
  visible: boolean;
  onSubmit(date: NaiveDate): void;
  onCancel(): void;
}

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
    setFocused({
      year: date.year,
      month: date.month,
    });
    onCancel();
  };

  const submit = () => {
    setFocused({
      year: date.year,
      month: date.month,
    });
    onSubmit(date);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={cancel}
    >
      <Pressable style={BASE_STYLE.background} onPress={cancel}>
        <Pressable style={BASE_STYLE.window}>
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
                  <View
                    key={i}
                    style={[
                      BASE_STYLE.tableItem,
                      // @ts-ignore
                      style["tableItem" + i],
                    ]}
                  >
                    <Text style={style.tableItemText}>{day}</Text>
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
                    onPress={() =>
                      setDate(new NaiveDate(focused.year, focused.month, day))
                    }
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
                    <Text
                      style={[style.tableItemText, BASE_STYLE.selectedText]}
                    >
                      {date.day}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={BASE_STYLE.submitRow}>
            <Text style={BASE_STYLE.submitRowItem} onPress={submit}>
              OK
            </Text>
            <Text style={BASE_STYLE.submitRowItem} onPress={cancel}>
              Cancel
            </Text>
          </View>
        </Pressable>
      </Pressable>
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
