import React, { memo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

import YearMonth, { nextMonth, prevMonth } from "./YearMonth";
import { UNIT, COLORS } from "./constant";

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
}

export default memo(({ focused, setFocused }: Props) => {
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
});

const style = StyleSheet.create({
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
});
