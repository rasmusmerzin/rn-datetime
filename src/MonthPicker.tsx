import React, { useCallback, useMemo } from "react";
import YearMonth, { nextMonth, prevMonth } from "./YearMonth";
import { ColorOverride, Colors, useColors } from "./colors";
import { StyleSheet, Text, View } from "react-native";
import { UNIT } from "./constant";
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

export default ({ focused, setFocused, colorOverride }: Props) => {
  const colors = useColors(colorOverride);
  const style = useMemo(
    () => mergeStyleSheets(staticStyle, dynamicStyle(colors)),
    [colors],
  );
  const focusPrevMonth = useCallback(
    () => setFocused(prevMonth(focused)),
    [focused, setFocused],
  );
  const focusNextMonth = useCallback(
    () => setFocused(nextMonth(focused)),
    [focused, setFocused],
  );
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
};

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
    height: UNIT * 1.1,
  },
  monthPickerTitle: {
    flex: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  monthPickerArrow: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 10,
  },
});
