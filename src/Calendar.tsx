import React, { memo, useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";

import { UNIT, COLORS } from "./constant";
import YearMonth from "./YearMonth";
import getMonthDays from "./getMonthDays";
import NaiveDate from "./NaiveDate";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

const Weekdays = memo(() => (
  <>
    {WEEKDAYS.map((day, i) => (
      <View
        key={i}
        style={[
          style.tableItem,
          // @ts-ignore
          style["tableItem" + i],
        ]}
      >
        <Text style={[style.tableItemText, style.tableWeekDay]}>{day}</Text>
      </View>
    ))}
  </>
));

interface DayProps {
  value: number;
  offset: number;
  isToday: boolean;
  selected: boolean;
  select(value: number): void;
}

const Day = memo(({ value, offset, isToday, selected, select }: DayProps) => {
  const onPress = useCallback(() => select(value), [value, select]);
  const posStyle = useMemo(
    () =>
      // @ts-ignore
      style["tableItem" + (6 + offset + value)],
    [offset, value]
  );
  const pressableStyles = useMemo(
    () => [style.tableItem, posStyle, selected && style.selected],
    [selected, posStyle]
  );
  const textStyles = useMemo(
    () => [
      style.tableItemText,
      selected ? style.selectedText : isToday && style.today,
    ],
    [selected ? 0 : isToday ? 1 : 2]
  );
  return (
    <Pressable style={pressableStyles} onPress={onPress}>
      <Text style={textStyles}>{value}</Text>
    </Pressable>
  );
});

interface Props {
  focused: YearMonth;
  date: NaiveDate;
  setDate(date: NaiveDate): void;
}

export default memo(({ date, setDate, focused }: Props) => {
  const [days, offset] = useMemo(
    () => getMonthDays(focused.year, focused.month),
    [focused]
  );

  const today = useMemo(() => new NaiveDate(), []);

  const selectDay = useCallback(
    (day: number) => setDate(new NaiveDate(focused.year, focused.month, day)),
    [focused, setDate]
  );
  const isToday = useCallback(
    (day: number) =>
      today.year === focused.year &&
      today.month === focused.month &&
      today.day === day,
    [today, focused]
  );
  const isSelected = useCallback(
    (day: number) =>
      date.year === focused.year &&
      date.month === focused.month &&
      date.day === day,
    [date, focused]
  );

  return (
    <>
      <View>
        <Weekdays />
        {days.map((day) => (
          <Day
            key={day}
            value={day}
            offset={offset}
            isToday={isToday(day)}
            selected={isSelected(day)}
            select={selectDay}
          />
        ))}
      </View>
    </>
  );
});

const style = StyleSheet.create({
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
