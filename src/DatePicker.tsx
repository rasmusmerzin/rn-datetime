import Calendar from "./Calendar";
import Modal from "./Modal";
import MonthPicker from "./MonthPicker";
import NaiveDate from "./NaiveDate";
import React, { useState, useCallback, useMemo } from "react";
import YearPicker from "./YearPicker";
import { Colors, useColors } from "./colors";
import { StyleSheet, Text, View } from "react-native";
import { UNIT } from "./constant";
import { mergeStyleSheets } from "./style";

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
  const colors = useColors();
  const style = useMemo(
    () => mergeStyleSheets(staticStyle, dynamicStyle(colors)),
    [colors],
  );
  const [date, setDate] = useState(value || new NaiveDate());
  const [focused, setFocused] = useState({
    year: date.year,
    month: date.month,
  });
  const [mode, setMode] = useState(prioritizeYear ? Mode.Year : Mode.Calendar);

  function cancel() {
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
  }

  function submit() {
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
  }

  const toggleMode = useCallback(
    () => setMode(mode === Mode.Calendar ? Mode.Year : Mode.Calendar),
    [mode, setMode],
  );
  const focusYear = useCallback(
    (year: number) => {
      focused.year !== year && setFocused({ ...focused, year });
      date.year !== year && setDate(new NaiveDate(year, date.month, 1));
      setMode(Mode.Calendar);
    },
    [focused, setFocused, date, setDate, setMode],
  );

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
              <MonthPicker focused={focused} setFocused={setFocused} />
              <Calendar focused={focused} date={date} setDate={setDate} />
            </>
          ) : (
            <YearPicker selected={date.year} select={focusYear} />
          )}
        </View>
      </View>
    </Modal>
  );
};

const dynamicStyle = (colors: Colors) =>
  StyleSheet.create({
    titleYear: {
      color: colors.text,
      backgroundColor: colors.background,
    },
    titleDate: {
      color: colors.text,
    },
  });

const staticStyle = StyleSheet.create({
  split: {
    flexWrap: "wrap",
  },
  titleDate: {
    fontSize: 32,
    fontWeight: "700",
    width: 200,
    marginBottom: UNIT * 0.7,
  },
  table: {
    width: UNIT * 7,
    height: UNIT * 8.1,
  },
});
