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
            BASE_STYLE.tableItem,
            // @ts-ignore
            style["tableOuter" + i],
          ]}
          onPress={() => onChange(m)}
        >
          <Text style={style.tableItemText}>{String(m).padStart(2, "0")}</Text>
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
            BASE_STYLE.tableItem,
            // @ts-ignore
            style["tableOuter" + i],
          ]}
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
          style={[
            BASE_STYLE.tableItem,
            // @ts-ignore
            style["tableInner" + i],
          ]}
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
      "table" +
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

            <View style={style.table}>
              {mode === Mode.Hour ? (
                <Hours
                  onChange={(val) => {
                    setTime(new NaiveTime(val, time.minute));
                    setTimeout(() => setMode(Mode.Minute), 100);
                  }}
                />
              ) : (
                <Minutes
                  onChange={(val) => setTime(new NaiveTime(time.hour, val))}
                />
              )}

              <View
                style={[
                  BASE_STYLE.tableItem,
                  BASE_STYLE.selected,
                  // @ts-ignore
                  style[selectedClass],
                ]}
              >
                <Text style={[style.tableItemText, BASE_STYLE.selectedText]}>
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

const TABLE_DIAMETER = UNIT * 6.4;
const TITLE_HEIGHT = UNIT * 2;
const OUTER_DIST = TABLE_DIAMETER * 0.4;
const INNER_DIST = TABLE_DIAMETER * 0.25;

const style = StyleSheet.create({
  split: {
    flexWrap: "wrap",
    maxHeight: TABLE_DIAMETER + UNIT + TITLE_HEIGHT,
    alignItems: "center",
  },
  title: {
    flex: 1,
    minHeight: TITLE_HEIGHT,
    maxHeight: TABLE_DIAMETER + UNIT,
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
  table: {
    width: TABLE_DIAMETER,
    height: TABLE_DIAMETER,
    borderRadius: TABLE_DIAMETER,
    backgroundColor: COLORS.highlight,
    marginHorizontal: (UNIT * 7 - TABLE_DIAMETER) / 2,
    marginVertical: UNIT / 2,
  },
  tableItemText: {
    color: COLORS.text,
  },
  tableCenter: {
    position: "absolute",
    left: TABLE_DIAMETER / 2,
    top: TABLE_DIAMETER / 2,
    fontSize: 16,
  },
  tableInnerText: {
    color: COLORS.shadow,
    fontSize: 12,
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
