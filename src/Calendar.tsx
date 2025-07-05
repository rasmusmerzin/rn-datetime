import React, { useCallback, useMemo } from "react";
import { Colors } from "./colors";
import { NaiveDate } from "./NaiveDate";
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";
import { UNIT } from "./constant";
import { YearMonth } from "./YearMonth";
import { getMonthDays, StartOfWeek } from "./getMonthDays";
import { mergeStyleSheets, Style } from "./style";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function Weekdays({
  startOfWeek,
  style,
}: {
  startOfWeek: StartOfWeek;
  style: Record<string, Style>;
}) {
  const days = useMemo(() => {
    if (startOfWeek === StartOfWeek.Sunday) return WEEKDAYS;
    return [...WEEKDAYS.slice(1), WEEKDAYS[0]];
  }, [startOfWeek]);
  return (
    <>
      {days.map((day, i) => (
        <View key={i} style={[style.tableItem, style["tableItem" + i]]}>
          <Text style={[style.tableItemText, style.tableWeekDay]}>{day}</Text>
        </View>
      ))}
    </>
  );
}

interface DayProps {
  value: number;
  offset: number;
  isToday: boolean;
  selected: boolean;
  select(value: number): void;
  style: Record<string, Style>;
}

const Day = ({ value, offset, isToday, selected, select, style }: DayProps) => {
  const onPress = useCallback(() => select(value), [value, select]);
  const posStyle = useMemo(
    () => style["tableItem" + (6 + offset + value)],
    [offset, value, style],
  );
  const pressableStyles = useMemo(
    () => [style.tableItem, posStyle, selected && style.selected],
    [selected, posStyle],
  );
  const textStyles = useMemo(
    () => [
      style.tableItemText,
      selected ? style.selectedText : isToday && style.today,
    ],
    [selected ? 0 : isToday ? 1 : 2, style],
  );
  return (
    <Pressable style={pressableStyles} onPress={onPress}>
      <Text style={textStyles}>{value}</Text>
    </Pressable>
  );
};

export interface CalendarProps {
  focused: YearMonth;
  date: NaiveDate;
  startOfWeek: StartOfWeek;
  setDate?: (date: NaiveDate) => void;
  colors: Colors;
}

export function Calendar({
  date,
  setDate,
  focused,
  colors,
  startOfWeek,
}: CalendarProps) {
  const style = useMemo(
    () => mergeStyleSheets(staticStyle, dynamicStyle(colors)),
    [colors],
  );
  const [days, offset] = useMemo(
    () => getMonthDays(focused.year, focused.month, startOfWeek),
    [focused],
  );

  const today = useMemo(() => new NaiveDate(), []);

  const selectDay = useCallback(
    (day: number) => setDate?.(new NaiveDate(focused.year, focused.month, day)),
    [focused, setDate],
  );
  const isToday = useCallback(
    (day: number) =>
      today.year === focused.year &&
      today.month === focused.month &&
      today.day === day,
    [today, focused],
  );
  const isSelected = useCallback(
    (day: number) =>
      date.year === focused.year &&
      date.month === focused.month &&
      date.day === day,
    [date, focused],
  );

  return (
    <>
      <View>
        <Weekdays style={style} startOfWeek={startOfWeek} />
        {days.map((day) => (
          <Day
            style={style}
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
}

const dynamicStyle = (colors: Colors) =>
  StyleSheet.create({
    tableItemText: {
      color: colors.text,
    },
    selected: {
      backgroundColor: colors.primary,
    },
    selectedText: {
      color: colors.background,
    },
    today: {
      color: colors.primary,
    },
    tableWeekDay: {
      color: colors.shadow,
    },
  });

const staticStyle = StyleSheet.create({
  selectedText: {
    fontWeight: "bold",
  },
  today: {
    fontWeight: "bold",
  },
  tableItemText: {
    fontSize: 12,
  },
  tableItem: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: UNIT,
    height: UNIT,
    borderRadius: UNIT,
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
