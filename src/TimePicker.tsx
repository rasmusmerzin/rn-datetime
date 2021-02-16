import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";

import NaiveTime from "./NaiveTime";
import { UNIT, COLORS } from "./constant";
import Modal from "./Modal";

const MORNING_HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const EVENING_HOURS = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

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
            style.tableItem,
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
            style.tableItem,
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
            style.tableItem,
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
    value && setTime(value);
    setMode(Mode.Hour);
    onCancel();
  };

  const submit = () => {
    setMode(Mode.Hour);
    onSubmit(time);
  };

  const selectHour = (hour: number) => {
    setTime(new NaiveTime(hour, time.minute));
    setTimeout(() => setMode(Mode.Minute), 100);
  };
  const selectMinute = (minute: number) =>
    setTime(new NaiveTime(time.hour, minute));

  const openHours = () => mode !== Mode.Hour && setMode(Mode.Hour);
  const openMinutes = () => mode !== Mode.Minute && setMode(Mode.Minute);

  return (
    <Modal visible={visible} onCancel={cancel} onSubmit={submit}>
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
            <Hours onChange={selectHour} />
          ) : (
            <Minutes onChange={selectMinute} />
          )}

          <View
            style={[
              style.tableItem,
              style.selected,
              // @ts-ignore
              style[selectedClass],
            ]}
          >
            <Text style={[style.tableItemText, style.selectedText]}>
              {mode === Mode.Hour
                ? time.hour || String(time.hour).padStart(2, "0")
                : String(time.minute).padStart(2, "0")}
            </Text>
          </View>
        </View>
      </View>
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
  tableItem: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: UNIT,
    height: UNIT,
    borderRadius: UNIT,
  },
  tableItemText: {
    color: COLORS.text,
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
  selectedText: {
    color: COLORS.background,
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
