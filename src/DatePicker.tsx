import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "./Calendar";
import { ColorOverride, Colors, useColors } from "./colors";
import { ModalWindow } from "./ModalWindow";
import { MonthPicker } from "./MonthPicker";
import { NaiveDate } from "./NaiveDate";
import { StartOfWeek } from "./getMonthDays";
import { Style, mergeStyleSheets } from "./style";
import { UNIT } from "./constant";
import { YearMonth } from "./YearMonth";
import { YearPicker } from "./YearPicker";

enum Mode {
  Calendar = "calendar",
  Year = "year",
}

export interface DatePickerProps {
  prioritizeYear?: boolean;
  value?: NaiveDate;
  visible: boolean;
  onSubmit(date: NaiveDate): void;
  onCancel(): void;
  colorOverride?: ColorOverride;
  startOfWeek?: StartOfWeek;
}

export function DatePicker({
  prioritizeYear,
  value,
  visible,
  onSubmit,
  onCancel,
  colorOverride,
  startOfWeek = StartOfWeek.Sunday,
}: DatePickerProps) {
  const colors = useColors(colorOverride);
  const style = useMemo(
    () => mergeStyleSheets(staticStyle, dynamicStyle(colors)),
    [colors],
  );
  const [date, setDate] = useState(value || new NaiveDate());
  const [previousFocused, setPreviousFocused] = useState<YearMonth | null>(
    null,
  );
  const [focused, setFocused] = useState<YearMonth>({
    year: date.year,
    month: date.month,
  });
  const [mode, setMode] = useState(prioritizeYear ? Mode.Year : Mode.Calendar);
  const defaultMode = useRef(mode);
  const stateResetTimeout = useRef<NodeJS.Timeout | null>(null);
  const transition = useRef(new Animated.Value(1)).current;
  const direction = useMemo<-1 | 0 | 1>(() => {
    if (!previousFocused) return 0;
    if (previousFocused.year < focused.year) return 1;
    if (previousFocused.year > focused.year) return -1;
    if (previousFocused.month < focused.month) return 1;
    if (previousFocused.month > focused.month) return -1;
    return 0;
  }, [previousFocused, focused]);
  const [currentStyle, previousStyle] = useMemo<[Style, Style]>(() => {
    const currentTranslateX = transition.interpolate({
      inputRange: [0, 1],
      outputRange: [direction * UNIT * 7, 0],
    });
    const previousTranslateX = transition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -direction * UNIT * 7],
    });
    return [
      { transform: [{ translateX: currentTranslateX }] },
      { transform: [{ translateX: previousTranslateX }] },
    ];
  }, [transition, direction]);

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
      }, 200);
  }, [visible]);

  function submit() {
    if (mode === Mode.Year) setMode(Mode.Calendar);
    else onSubmit(date);
  }

  const toggleMode = () =>
    setMode(mode === Mode.Calendar ? Mode.Year : Mode.Calendar);
  function focusYear(year: number) {
    focused.year !== year && setFocused({ ...focused, year });
    date.year !== year && setDate(new NaiveDate(year, date.month, 1));
    setMode(Mode.Calendar);
  }
  function transitionFocus(target: YearMonth) {
    if (previousFocused) return;
    setPreviousFocused(focused);
    setFocused(target);
    transition.setValue(0);
    setTimeout(() =>
      Animated.timing(transition, {
        toValue: 1,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => setPreviousFocused(null)),
    );
  }

  return (
    <ModalWindow
      visible={visible}
      onCancel={onCancel}
      onSubmit={submit}
      colorOverride={colorOverride}
    >
      <View style={style.split}>
        <View style={style.header}>
          <TouchableOpacity onPress={toggleMode}>
            <Text style={style.titleYear}>{date.year}</Text>
          </TouchableOpacity>
          <Text style={style.titleDate}>
            {date.toLocalDate().toDateString().substring(0, 10)}
          </Text>
        </View>

        <View style={style.table}>
          {mode === Mode.Calendar ? (
            <>
              <MonthPicker
                focused={focused}
                setFocused={transitionFocus}
                colorOverride={colorOverride}
              />
              <View style={style.calendarRoot}>
                {previousFocused && (
                  <Animated.View style={[style.calendarPage, previousStyle]}>
                    <Calendar
                      focused={previousFocused}
                      date={date}
                      colorOverride={colorOverride}
                      startOfWeek={startOfWeek}
                    />
                  </Animated.View>
                )}
                <Animated.View style={[style.calendarPage, currentStyle]}>
                  <Calendar
                    focused={focused}
                    date={date}
                    setDate={setDate}
                    colorOverride={colorOverride}
                    startOfWeek={startOfWeek}
                  />
                </Animated.View>
              </View>
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
    </ModalWindow>
  );
}

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
  calendarRoot: {
    position: "relative",
  },
  calendarPage: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  header: {
    paddingTop: 4,
    paddingHorizontal: 4,
    paddingBottom: UNIT / 2,
  },
  split: {
    flexWrap: "wrap",
  },
  titleDate: {
    fontSize: 32,
    fontWeight: 700,
    width: 180,
  },
  table: {
    width: UNIT * 7,
    height: UNIT * 8,
    overflow: "hidden",
  },
});
