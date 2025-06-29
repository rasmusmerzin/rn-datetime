import Calendar from "./Calendar";
import Modal from "./Modal";
import MonthPicker from "./MonthPicker";
import NaiveDate from "./NaiveDate";
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import YearPicker from "./YearPicker";
import { ColorOverride, Colors, useColors } from "./colors";
import { StyleSheet, Text, View } from "react-native";
import { UNIT } from "./constant";
import { mergeStyleSheets } from "./style";

enum Mode {
  Calendar = "calendar",
  Year = "year",
}

interface Props {
  prioritizeYear?: boolean;
  value?: NaiveDate;
  visible: boolean;
  onSubmit(date: NaiveDate): void;
  onCancel(): void;
  colorOverride?: ColorOverride;
}

export default ({
  prioritizeYear,
  value,
  visible,
  onSubmit,
  onCancel,
  colorOverride,
}: Props) => {
  const colors = useColors(colorOverride);
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
  const defaultMode = useRef(mode);
  const stateResetTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    defaultMode.current = prioritizeYear ? Mode.Year : Mode.Calendar;
  }, [prioritizeYear]);
  useEffect(() => {
    if (stateResetTimeout.current) clearTimeout(stateResetTimeout.current);
    if (!visible)
      stateResetTimeout.current = setTimeout(() => {
        if (mode !== defaultMode.current) setMode(defaultMode.current);
        if (
          value &&
          (date.year !== value.year ||
            date.month !== value.month ||
            date.day !== value.day)
        )
          setDate(value);
        if (focused.year !== date.year || focused.month !== date.month)
          setFocused({ year: date.year, month: date.month });
      }, 300);
  }, [visible]);

  function submit() {
    if (mode === Mode.Year) setMode(Mode.Calendar);
    else onSubmit(date);
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
    <Modal
      visible={visible}
      onCancel={onCancel}
      onSubmit={submit}
      colorOverride={colorOverride}
    >
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
              <MonthPicker
                focused={focused}
                setFocused={setFocused}
                colorOverride={colorOverride}
              />
              <Calendar
                focused={focused}
                date={date}
                setDate={setDate}
                colorOverride={colorOverride}
              />
            </>
          ) : (
            <YearPicker
              selected={date.year}
              select={focusYear}
              colorOverride={colorOverride}
            />
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
    height: UNIT * 8.3,
  },
});
