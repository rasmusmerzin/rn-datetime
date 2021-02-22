import React, { memo, ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Modal } from "./compat";
import { UNIT, COLORS } from "./constant";

interface Props {
  visible: boolean;
  onCancel(): void;
  onSubmit(): void;
  children?: ReactNode;
}

export default memo(({ visible, children, onCancel, onSubmit }: Props) => (
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
));

const style = StyleSheet.create({
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
    maxHeight: "90%",
    paddingHorizontal: UNIT / 2,
    backgroundColor: COLORS.background,
    paddingTop: UNIT / 2,
    paddingBottom: UNIT * 1.5,
    borderRadius: UNIT / 4,
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
    color: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
});
