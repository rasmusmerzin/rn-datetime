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
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
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
  const selectedAngle = useRef(new Animated.Value(0)).current;
  const selectedDistance = useRef(new Animated.Value(-OUTER_DIST)).current;
  const [selectedStyle, selectedInnerStyle] = useMemo<[Style, Style]>(() => {
    const rotate = selectedAngle.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "360deg"],
    });
    const rotateReverse = selectedAngle.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "-360deg"],
    });
    return [
      {
        top: (TABLE_DIAMETER - UNIT) / 2,
        left: (TABLE_DIAMETER - UNIT) / 2,
        transform: [{ rotate }, { translateY: selectedDistance }],
      },
      { transform: [{ rotate: rotateReverse }] },
    ];
  }, [selectedAngle, selectedDistance]);
  const selectedAnimation = useRef<Animated.CompositeAnimation | null>(null);
  const previousMode = useRef<Mode>(mode);
  const previousSelectedAngle = useRef(0);

  useEffect(() => {
    if (stateResetTimeout.current) clearTimeout(stateResetTimeout.current);
    if (!visible)
      stateResetTimeout.current = setTimeout(() => {
        if (value) setTime(value);
        if (mode !== defaultMode) setMode(defaultMode);
      }, 200);
  }, [visible]);

  useEffect(() => {
    let distance = 0;
    let angle = 0;
    if (mode === Mode.Hour) {
      const morningIndex = MORNING_HOURS.indexOf(time.hour);
      const eveningIndex = EVENING_HOURS.indexOf(time.hour);
      if (morningIndex >= 0) {
        distance = OUTER_DIST;
        angle = (morningIndex * 360) / MORNING_HOURS.length;
      } else if (eveningIndex >= 0) {
        distance = INNER_DIST;
        angle = (eveningIndex * 360) / EVENING_HOURS.length;
      }
    } else {
      distance = OUTER_DIST;
      angle = (MINUTES.indexOf(time.minute) * 360) / MINUTES.length;
    }
    selectedAnimation.current?.stop();
    if (previousMode.current === mode) {
      selectedAngle.setValue(angle);
      selectedDistance.setValue(-distance);
    } else {
      const deltaAngle = angle - previousSelectedAngle.current;
      if (deltaAngle < -180)
        selectedAngle.setValue(previousSelectedAngle.current - 360);
      else if (deltaAngle > 180)
        selectedAngle.setValue(previousSelectedAngle.current + 360);
      selectedAnimation.current = Animated.parallel([
        Animated.timing(selectedAngle, {
          toValue: angle,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(selectedDistance, {
          toValue: -distance,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]);
      selectedAnimation.current.start();
    }
    previousMode.current = mode;
    previousSelectedAngle.current = angle;
  }, [mode, time]);

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
          <TouchableOpacity onPress={openHours}>
            <Text
              style={[
                style.titleText,
                mode === Mode.Hour && style.selectedTitle,
              ]}
            >
              {String(time.hour).padStart(2, "0")}
            </Text>
          </TouchableOpacity>
          <Text style={style.titleText}>:</Text>
          <TouchableOpacity onPress={openMinutes}>
            <Text
              style={[
                style.titleText,
                mode === Mode.Minute && style.selectedTitle,
              ]}
            >
              {String(time.minute).padStart(2, "0")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={style.table}>
          {mode === Mode.Hour ? (
            <Hours onChange={selectHour} style={style} />
          ) : (
            <Minutes onChange={selectMinute} style={style} />
          )}

          <Animated.View
            style={[style.tableItem, style.selected, selectedStyle]}
          >
            <Animated.Text
              style={[
                style.tableItemText,
                style.selectedText,
                selectedInnerStyle,
              ]}
            >
              {mode === Mode.Hour
                ? time.hour || String(time.hour).padStart(2, "0")
                : String(time.minute).padStart(2, "0")}
            </Animated.Text>
          </Animated.View>
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
  selected: {
    pointerEvents: "none",
  },
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
    width: 160,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
