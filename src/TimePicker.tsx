import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ColorOverride, Colors, useColors } from "./colors";
import { ModalWindow } from "./ModalWindow";
import { NaiveTime } from "./NaiveTime";
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";
import { Style, mergeStyleSheets } from "./style";
import { UNIT } from "./constant";

const MORNING_HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const EVENING_HOURS = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

interface ModeProps {
  onChange(value: number): void;
  style: Record<string, Style>;
}

const Minutes = ({ onChange, style }: ModeProps) => (
  <>
    {MINUTES.map((m, i) => {
      return (
        <Pressable
          key={i}
          style={[style.tableItem, style["tableOuter" + i]]}
          onPress={() => onChange(m)}
        >
          <Text style={style.tableItemText}>{String(m).padStart(2, "0")}</Text>
        </Pressable>
      );
    })}
  </>
);

const Hours = ({ onChange, style }: ModeProps) => (
  <>
    {MORNING_HOURS.map((h, i) => {
      return (
        <Pressable
          key={i}
          style={[style.tableItem, style["tableOuter" + i]]}
          onPress={() => onChange(h)}
        >
          <Text style={style.tableItemText}>{h}</Text>
        </Pressable>
      );
    })}
    {EVENING_HOURS.map((h, i) => {
      return (
        <Pressable
          key={i}
          style={[style.tableItem, style["tableInner" + i]]}
          onPress={() => onChange(h)}
        >
          <Text style={[style.tableItemText, style.tableInnerText]}>
            {String(h).padStart(2, "0")}
          </Text>
        </Pressable>
      );
    })}
  </>
);

enum Mode {
  Hour = "hour",
  Minute = "minute",
}

interface Props {
  value?: NaiveTime;
  visible: boolean;
  onSubmit(time: NaiveTime): void;
  onCancel(): void;
  colorOverride?: ColorOverride;
}

const defaultMode = Mode.Hour;
export function TimePicker({
  value,
  visible,
  onSubmit,
  onCancel,
  colorOverride,
}: Props) {
  const colors = useColors(colorOverride);
  const style = useMemo(
    () => mergeStyleSheets(staticStyle, dynamicStyle(colors)),
    [colors],
  );
  const [time, setTime] = useState(value || new NaiveTime());
  const [mode, setMode] = useState(defaultMode);
  const stateResetTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (stateResetTimeout.current) clearTimeout(stateResetTimeout.current);
    if (!visible)
      stateResetTimeout.current = setTimeout(() => {
        if (value) setTime(value);
        if (mode !== defaultMode) setMode(defaultMode);
      }, 200);
  }, [visible]);

  const selectedClass = useMemo(
    () =>
      "table" +
      (mode === Mode.Hour
        ? (!time.hour || time.hour > 12 ? "Inner" : "Outer") + (time.hour % 12)
        : "Outer" + Math.floor(time.minute / 5)),
    [time, mode],
  );

  function selectHour(hour: number) {
    setTime((time) => new NaiveTime(hour, time.minute));
    setTimeout(setMode, 100, Mode.Minute);
  }
  function selectMinute(minute: number) {
    setTime((time) => new NaiveTime(time.hour, minute));
  }

  const openHours = useCallback(
    () => mode !== Mode.Hour && setMode(Mode.Hour),
    [mode],
  );
  const openMinutes = useCallback(
    () => mode !== Mode.Minute && setMode(Mode.Minute),
    [mode],
  );

  return (
    <ModalWindow
      visible={visible}
      onCancel={onCancel}
      onSubmit={() => onSubmit(time)}
      colorOverride={colorOverride}
    >
      <View style={style.split}>
        <View style={style.title}>
          <Text
            style={[style.titleText, mode === Mode.Hour && style.selectedTitle]}
            onPress={openHours}
          >
            {String(time.hour).padStart(2, "0")}
          </Text>
          <Text style={style.titleText}>:</Text>
          <Text
            style={[
              style.titleText,
              mode === Mode.Minute && style.selectedTitle,
            ]}
            onPress={openMinutes}
          >
            {String(time.minute).padStart(2, "0")}
          </Text>
        </View>

        <View style={style.table}>
          {mode === Mode.Hour ? (
            <Hours onChange={selectHour} style={style} />
          ) : (
            <Minutes onChange={selectMinute} style={style} />
          )}

          <View style={[style.tableItem, style.selected, style[selectedClass]]}>
            <Text style={[style.tableItemText, style.selectedText]}>
              {mode === Mode.Hour
                ? time.hour || String(time.hour).padStart(2, "0")
                : String(time.minute).padStart(2, "0")}
            </Text>
          </View>
        </View>
      </View>
    </ModalWindow>
  );
}

const TABLE_DIAMETER = UNIT * 6.4;
const TITLE_HEIGHT = UNIT * 2;
const OUTER_DIST = TABLE_DIAMETER * 0.4;
const INNER_DIST = TABLE_DIAMETER * 0.25;

const dynamicStyle = (colors: Colors) =>
  StyleSheet.create({
    titleText: {
      color: colors.shadow,
      backgroundColor: colors.background,
    },
    selectedTitle: {
      color: colors.text,
    },
    table: {
      backgroundColor: colors.highlight,
    },
    tableItemText: {
      color: colors.text,
    },
    selected: {
      backgroundColor: colors.primary,
    },
    selectedText: {
      color: colors.background,
    },
    tableInnerText: {
      color: colors.shadow,
    },
  });

const staticStyle = StyleSheet.create({
  selectedText: {
    fontWeight: 600,
  },
  split: {
    flexWrap: "wrap",
    maxHeight: TABLE_DIAMETER + UNIT + TITLE_HEIGHT,
    alignItems: "center",
  },
  title: {
    flex: 1,
    minHeight: TITLE_HEIGHT,
    maxHeight: TABLE_DIAMETER + UNIT,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 56,
    fontWeight: 600,
  },
  table: {
    width: TABLE_DIAMETER,
    height: TABLE_DIAMETER,
    borderRadius: TABLE_DIAMETER,
    marginHorizontal: (UNIT * 7 - TABLE_DIAMETER) / 2,
    marginVertical: UNIT / 2,
  },
  tableItem: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: UNIT,
    height: UNIT,
    borderRadius: UNIT,
  },
  tableCenter: {
    position: "absolute",
    left: TABLE_DIAMETER / 2,
    top: TABLE_DIAMETER / 2,
    fontSize: 16,
  },
  tableInnerText: {
    fontSize: 12,
    fontWeight: 600,
  },
  ...(() => {
    const generatedStyle: { [key: string]: TextStyle } = {};
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      generatedStyle["tableOuter" + i] = {
        left: (TABLE_DIAMETER - UNIT) / 2 + Math.sin(angle) * OUTER_DIST,
        top: (TABLE_DIAMETER - UNIT) / 2 - Math.cos(angle) * OUTER_DIST,
      };
      generatedStyle["tableInner" + i] = {
        left: (TABLE_DIAMETER - UNIT) / 2 + Math.sin(angle) * INNER_DIST,
        top: (TABLE_DIAMETER - UNIT) / 2 - Math.cos(angle) * INNER_DIST,
      };
    }
    return generatedStyle;
  })(),
});
