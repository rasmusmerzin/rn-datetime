import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";

import NaiveTime from "./NaiveTime";
import {
  MORNING_HOURS,
  EVENING_HOURS,
  MINUTES,
  COLORS,
  UNIT,
  BASE_STYLE,
} from "./constant";

interface ModeProps {
  onChange(value: number): void;
}

const Minutes = ({ onChange }: ModeProps) => (
  <>
    {MINUTES.map((m, i) => {
      return (
        <Pressable
          key={i}
          style={[
            style.clockItem,
            // @ts-ignore
            style["clockOuter" + i],
          ]}
          onPress={() => onChange(m)}
        >
          <Text style={style.clockItemText}>{String(m).padStart(2, "0")}</Text>
        </Pressable>
      );
    })}
  </>
);

const Hours = ({ onChange }: ModeProps) => (
  <>
    {MORNING_HOURS.map((h, i) => {
      return (
        <Pressable
          key={i}
          style={[
            style.clockItem,
            // @ts-ignore
            style["clockOuter" + i],
          ]}
          onPress={() => onChange(h)}
        >
          <Text style={style.clockItemText}>{h}</Text>
        </Pressable>
      );
    })}
    {EVENING_HOURS.map((h, i) => {
      return (
        <Pressable
          key={i}
          style={[
            style.clockItem,
            // @ts-ignore
            style["clockInner" + i],
          ]}
          onPress={() => onChange(h)}
        >
          <Text style={[style.clockItemText, style.clockInnerText]}>
            {String(h).padStart(2, "0")}
          </Text>
        </Pressable>
      );
    })}
  </>
);

enum Mode {
  Hour,
  Minute,
}

interface Props {
  value?: NaiveTime;
  visible: boolean;
  onSubmit(time: NaiveTime): void;
  onCancel(): void;
}

export default ({ value, visible, onSubmit, onCancel }: Props) => {
  const [time, setTime] = useState(value || new NaiveTime());
  const [mode, setMode] = useState(Mode.Hour);

  const selectedClass = useMemo(
    () =>
      "clock" +
      (mode === Mode.Hour
        ? (!time.hour || time.hour > 12 ? "Inner" : "Outer") + (time.hour % 12)
        : "Outer" + Math.floor(time.minute / 5)),
    [time, mode]
  );

  const cancel = () => {
    setMode(Mode.Hour);
    onCancel();
  };

  const submit = () => {
    setMode(Mode.Hour);
    onSubmit(time);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={cancel}
    >
      <Pressable style={BASE_STYLE.background} onPress={cancel}>
        <Pressable style={BASE_STYLE.window}>
          <View style={style.split}>
            <View style={style.title}>
              <Text
                style={[
                  style.titleText,
                  mode === Mode.Hour && style.selectedTitle,
                ]}
                onPress={() => setMode(Mode.Hour)}
              >
                {String(time.hour).padStart(2, "0")}
              </Text>
              <Text style={style.titleText}>:</Text>
              <Text
                style={[
                  style.titleText,
                  mode === Mode.Minute && style.selectedTitle,
                ]}
                onPress={() => setMode(Mode.Minute)}
              >
                {String(time.minute).padStart(2, "0")}
              </Text>
            </View>

            <View style={style.clockCircle}>
              {mode === Mode.Hour ? (
                <Hours
                  onChange={(val) => {
                    setTime(new NaiveTime(val, time.minute));
                    setTimeout(() => setMode(Mode.Minute));
                  }}
                />
              ) : (
                <Minutes
                  onChange={(val) => setTime(new NaiveTime(time.hour, val))}
                />
              )}

              <View
                style={[
                  style.clockItem,
                  BASE_STYLE.selected,
                  // @ts-ignore
                  style[selectedClass],
                ]}
              >
                <Text style={[style.clockItemText, BASE_STYLE.selectedText]}>
                  {mode === Mode.Hour
                    ? time.hour || String(time.hour).padStart(2, "0")
                    : String(time.minute).padStart(2, "0")}
                </Text>
              </View>
            </View>
          </View>

          <View style={BASE_STYLE.submitRow}>
            <Text style={BASE_STYLE.submitRowItem} onPress={submit}>
              OK
            </Text>
            <Text style={BASE_STYLE.submitRowItem} onPress={cancel}>
              Cancel
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const CLOCK_DIAMETER = UNIT * 6.4;
const TITLE_HEIGHT = UNIT * 2;
const OUTER_DIST = CLOCK_DIAMETER * 0.4;
const INNER_DIST = CLOCK_DIAMETER * 0.25;

const style = StyleSheet.create({
  split: {
    flexWrap: "wrap",
    maxHeight: CLOCK_DIAMETER + UNIT + TITLE_HEIGHT,
    alignItems: "center",
  },
  title: {
    flex: 1,
    minHeight: TITLE_HEIGHT,
    maxHeight: CLOCK_DIAMETER + UNIT,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    color: COLORS.shadow,
    fontSize: 56,
  },
  selectedTitle: {
    color: COLORS.text,
  },
  clockCircle: {
    width: CLOCK_DIAMETER,
    height: CLOCK_DIAMETER,
    borderRadius: CLOCK_DIAMETER,
    backgroundColor: COLORS.highlight,
    marginHorizontal: (UNIT * 7 - CLOCK_DIAMETER) / 2,
    marginVertical: UNIT / 2,
  },
  clockItem: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: UNIT,
    height: UNIT,
    borderRadius: UNIT,
  },
  clockItemText: {
    color: COLORS.text,
  },
  clockCenter: {
    position: "absolute",
    left: CLOCK_DIAMETER / 2,
    top: CLOCK_DIAMETER / 2,
    fontSize: 16,
  },
  clockInnerText: {
    color: COLORS.shadow,
    fontSize: 12,
  },
  ...(() => {
    const generatedStyle: { [key: string]: TextStyle } = {};
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      generatedStyle["clockOuter" + i] = {
        left: (CLOCK_DIAMETER - UNIT) / 2 + Math.sin(angle) * OUTER_DIST,
        top: (CLOCK_DIAMETER - UNIT) / 2 - Math.cos(angle) * OUTER_DIST,
      };
      generatedStyle["clockInner" + i] = {
        left: (CLOCK_DIAMETER - UNIT) / 2 + Math.sin(angle) * INNER_DIST,
        top: (CLOCK_DIAMETER - UNIT) / 2 - Math.cos(angle) * INNER_DIST,
      };
    }
    return generatedStyle;
  })(),
});
