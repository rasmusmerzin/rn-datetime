import React, { ReactNode, useMemo } from "react";
import { ColorOverride, Colors, useColors } from "./colors";
import { Modal } from "./compat";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { UNIT } from "./constant";
import { mergeStyleSheets } from "./style";

interface Props {
  visible: boolean;
  onCancel(): void;
  onSubmit(): void;
  children?: ReactNode;
  colorOverride?: ColorOverride;
}

export default ({
  visible,
  children,
  onCancel,
  onSubmit,
  colorOverride,
}: Props) => {
  const colors = useColors(colorOverride);
  const style = useMemo(
    () => mergeStyleSheets(staticStyle, dynamicStyle(colors)),
    [colors],
  );
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <Pressable style={style.background} onPress={onCancel}>
        <Pressable style={style.window}>
          {children}
          <View style={style.submitRow}>
            <Text style={style.submitRowItem} onPress={onSubmit}>
              OK
            </Text>
            <Text style={style.submitRowItem} onPress={onCancel}>
              Cancel
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const dynamicStyle = (colors: Colors) =>
  StyleSheet.create({
    background: {
      backgroundColor: colors.blurred,
    },
    window: {
      backgroundColor: colors.background,
    },
    submitRowItem: {
      color: colors.primary,
      backgroundColor: colors.background,
    },
  });

const staticStyle = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
  },
  window: {
    maxHeight: "90%",
    paddingHorizontal: UNIT / 2,
    paddingTop: UNIT / 2,
    paddingBottom: UNIT * 1.5,
    borderRadius: UNIT / 2,
  },
  submitRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    position: "absolute",
    height: UNIT,
    bottom: UNIT / 2,
    right: UNIT / 2,
  },
  submitRowItem: {
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
});
