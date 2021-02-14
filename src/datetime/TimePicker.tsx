import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TextStyle, View } from "react-native";

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
        <Text
          key={i}
          style={[
            style.clockItem,
            // @ts-ignore
            style["clockOuter" + i],
          ]}
          onPress={() => onChange(m)}
        >
          {String(m).padStart(2, "0")}
        </Text>
      );
    })}
  </>
);

const Hours = ({ onChange }: ModeProps) => (
  <>
    {MORNING_HOURS.map((h, i) => {
      return (
        <Text
          key={i}
          style={[
            style.clockItem,
            // @ts-ignore
            style["clockOuter" + i],
          ]}
          onPress={() => onChange(h)}
        >
          {h}
        </Text>
      );
    })}
    {EVENING_HOURS.map((h, i) => {
      return (
        <Text
          key={i}
          style={[
            style.clockItem,
            // @ts-ignore
            style["clockInner" + i],
          ]}
          onPress={() => onChange(h)}
        >
          {String(h).padStart(2, "0")}
        </Text>
      );
    })}
  </>
);

interface Props {
  value?: NaiveTime;
  onSubmit(date: NaiveTime): void;
  onCancel(): void;
}

enum Mode {
  Hour,
  Minute,
}

const TIMING = {
  duration: 200,
  useNativeDriver: true,
};

export default ({ value, onSubmit, onCancel }: Props) => {
  const [time, setTime] = useState(value || new NaiveTime());
  const [mode, setMode] = useState(Mode.Hour);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    opacity.setValue(0);
    Animated.timing(opacity, { ...TIMING, toValue: 1 }).start();
  }, [mode]);

  const selectAngle =
    mode === Mode.Hour ? (time.hour % 12) * 30 : time.minute * 6;
  const selectDist =
    mode === Mode.Hour && (!time.hour || time.hour > 12)
      ? INNER_DIST
      : OUTER_DIST;

  return (
    <View style={BASE_STYLE.background}>
      <View style={BASE_STYLE.window}>
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

            <Animated.View
              style={[
                style.clockCenter,
                { transform: [{ rotate: `${selectAngle}deg` }] },
              ]}
            >
              <Animated.Text
                style={[
                  style.clockItem,
                  BASE_STYLE.selected,
                  {
                    opacity,
                    transform: [
                      { translateY: -selectDist },
                      { rotate: `${360 - selectAngle}deg` },
                    ],
                  },
                ]}
              >
                {mode === Mode.Hour
                  ? time.hour || String(time.hour).padStart(2, "0")
                  : String(time.minute).padStart(2, "0")}
              </Animated.Text>
            </Animated.View>
          </View>
        </View>

        <View style={BASE_STYLE.submitRow}>
          <Text style={BASE_STYLE.submitRowItem} onPress={() => onSubmit(time)}>
            OK
          </Text>
          <Text style={BASE_STYLE.submitRowItem} onPress={onCancel}>
            Cancel
          </Text>
        </View>
      </View>
    </View>
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
    color: COLORS.text,
    position: "absolute",
    top: -UNIT / 2,
    left: -UNIT / 2,
    textAlign: "center",
    textAlignVertical: "center",
    width: UNIT,
    height: UNIT,
    borderRadius: UNIT,
  },
  clockCenter: {
    position: "absolute",
    left: CLOCK_DIAMETER / 2,
    top: CLOCK_DIAMETER / 2,
  },
  ...(() => {
    const generatedStyle: { [key: string]: TextStyle } = {};
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      generatedStyle["clockOuter" + i] = {
        fontSize: 16,
        left: (CLOCK_DIAMETER - UNIT) / 2 + Math.sin(angle) * OUTER_DIST,
        top: (CLOCK_DIAMETER - UNIT) / 2 - Math.cos(angle) * OUTER_DIST,
      };
      generatedStyle["clockInner" + i] = {
        color: COLORS.shadow,
        fontSize: 12,
        left: (CLOCK_DIAMETER - UNIT) / 2 + Math.sin(angle) * INNER_DIST,
        top: (CLOCK_DIAMETER - UNIT) / 2 - Math.cos(angle) * INNER_DIST,
      };
    }
    return generatedStyle;
  })(),
});
