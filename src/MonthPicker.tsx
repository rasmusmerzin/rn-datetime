import React, { useMemo } from "react";
import { ColorOverride, Colors, useColors } from "./colors";
import { StyleSheet, Text, View } from "react-native";
import { UNIT } from "./constant";
import { YearMonth, nextMonth, prevMonth } from "./YearMonth";
import { mergeStyleSheets } from "./style";

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

interface Props {
  focused: YearMonth;
  setFocused(focused: YearMonth): void;
  colorOverride?: ColorOverride;
}

export function MonthPicker({ focused, setFocused, colorOverride }: Props) {
  const colors = useColors(colorOverride);
  const style = useMemo(
    () => mergeStyleSheets(staticStyle, dynamicStyle(colors)),
    [colors],
  );
  const focusPrevMonth = () => setFocused(prevMonth(focused));
  const focusNextMonth = () => setFocused(nextMonth(focused));
  return (
    <View style={style.monthPicker}>
      <Text style={style.monthPickerArrow} onPress={focusPrevMonth}>
        ‹
      </Text>
      <Text style={style.monthPickerTitle}>
        {MONTHS[focused.month]} {focused.year}
      </Text>
      <Text style={style.monthPickerArrow} onPress={focusNextMonth}>
        ›
      </Text>
    </View>
  );
}

const dynamicStyle = (colors: Colors) =>
  StyleSheet.create({
    monthPickerTitle: {
      color: colors.text,
    },
    monthPickerArrow: {
      color: colors.text,
      backgroundColor: colors.background,
    },
  });

const staticStyle = StyleSheet.create({
  monthPicker: {
    flexDirection: "row",
    alignItems: "center",
    height: UNIT,
  },
  monthPickerTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  monthPickerArrow: {
    width: UNIT,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
});
