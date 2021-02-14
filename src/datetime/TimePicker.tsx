import React, { useState } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";

import NaiveTime from "./NaiveTime";
import {
  MORNING_HOURS,
  EVENING_HOURS,
  MINUTES,
  COLORS,
  UNIT,
} from "./constant";

interface ModeProps {
  selected: number;
  onChange(value: number): void;
}

const Minutes = ({ selected, onChange }: ModeProps) => (
  <>
    {MINUTES.map((m, i) => {
      return (
        <Text
          key={i}
          style={[
            style.clockItem,
            // @ts-ignore
            style["clockOuter" + i],
            selected === m && style.selected,
          ]}
          onPress={() => onChange(m)}
        >
          {String(m).padStart(2, "0")}
        </Text>
      );
    })}
  </>
);

const Hours = ({ selected, onChange }: ModeProps) => (
  <>
    {MORNING_HOURS.map((h, i) => {
      return (
        <Text
          key={i}
          style={[
            style.clockItem,
            // @ts-ignore
            style["clockOuter" + i],
            selected === h && style.selected,
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
            selected === h && style.selected,
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

export default ({ value, onSubmit, onCancel }: Props) => {
  const [time, setTime] = useState(value || new NaiveTime());
  const [mode, setMode] = useState(Mode.Hour);

  return (
    <View style={style.background}>
      <View style={style.window}>
        <View style={style.title}>
          <Text
            style={[style.titleText, mode === Mode.Hour && style.selectedTitle]}
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
              selected={time.hour}
              onChange={(val) => {
                setMode(Mode.Minute);
                setTime(new NaiveTime(val, time.minute));
              }}
            />
          ) : (
            <Minutes
              selected={time.minute}
              onChange={(val) => setTime(new NaiveTime(time.hour, val))}
            />
          )}
        </View>

        <View style={style.submitRow}>
          <Text style={style.submitRowItem} onPress={() => onSubmit(time)}>
            OK
          </Text>
          <Text style={style.submitRowItem} onPress={onCancel}>
            Cancel
          </Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    flexDirection: "row",
    justifyContent: "center",
  },
  titleText: {
    color: COLORS.shadow,
    fontSize: 56,
  },
  selectedTitle: {
    color: COLORS.text,
  },
  clockCircle: {
    width: UNIT * 5.8,
    height: UNIT * 5.8,
    borderRadius: UNIT * 6,
    backgroundColor: COLORS.highlight,
    marginVertical: 20,
    marginHorizontal: UNIT * 0.1,
  },
  clockItem: {
    color: COLORS.text,
    position: "absolute",
    textAlign: "center",
    textAlignVertical: "center",
    width: UNIT,
    height: UNIT,
    borderRadius: UNIT,
  },
  ...(() => {
    const generatedStyle: { [key: string]: TextStyle } = {};
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      generatedStyle["clockOuter" + i] = {
        fontSize: 16,
        left: UNIT * 2.4 + Math.sin(angle) * UNIT * 2.3,
        top: UNIT * 2.4 - Math.cos(angle) * UNIT * 2.3,
      };
      generatedStyle["clockInner" + i] = {
        color: COLORS.shadow,
        fontSize: 12,
        left: UNIT * 2.4 + Math.sin(angle) * UNIT * 1.4,
        top: UNIT * 2.4 - Math.cos(angle) * UNIT * 1.4,
      };
    }
    return generatedStyle;
  })(),
  selected: {
    backgroundColor: COLORS.primary,
    color: COLORS.background,
  },
  submitRow: {
    flexDirection: "row-reverse",
  },
  submitRowItem: {
    color: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: UNIT / 4,
    textAlignVertical: "center",
  },
  background: {
    position: "absolute",
    backgroundColor: COLORS.blurred,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  window: {
    width: UNIT * 7,
    backgroundColor: COLORS.background,
    paddingHorizontal: UNIT / 2,
    paddingTop: UNIT / 2,
    paddingBottom: UNIT / 2,
    borderRadius: UNIT / 4,
  },
});
