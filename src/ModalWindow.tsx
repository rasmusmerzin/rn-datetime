import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { ColorOverride, Colors, useColors } from "./colors";
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { UNIT } from "./constant";
import { mergeStyleSheets } from "./style";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  visible: boolean;
  onCancel(): void;
  onSubmit(): void;
  children?: ReactNode;
  colorOverride?: ColorOverride;
}

export function ModalWindow({
  visible,
  children,
  onCancel,
  onSubmit,
  colorOverride,
}: Props) {
  const colors = useColors(colorOverride);
  const style = useMemo(
    () => mergeStyleSheets(staticStyle, dynamicStyle(colors)),
    [colors],
  );
  const [mounted, setMounted] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let animation: Animated.CompositeAnimation;
    if (visible) {
      setMounted(true);
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
      (animation = Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 9,
          overshootClamping: false,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ])).start();
    } else {
      (animation = Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])).start(() => setMounted(false));
    }
    return () => animation?.stop();
  }, [visible]);
  return (
    <Modal transparent visible={mounted} onRequestClose={onCancel}>
      <AnimatedPressable
        style={[style.background, { opacity: opacityAnim }]}
        onPress={onCancel}
      >
        <AnimatedPressable
          style={[
            style.window,
            { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          {children}
          <View style={style.submitRow}>
            <Text style={style.submitRowItem} onPress={onSubmit}>
              OK
            </Text>
            <Text style={style.submitRowItem} onPress={onCancel}>
              Cancel
            </Text>
          </View>
        </AnimatedPressable>
      </AnimatedPressable>
    </Modal>
  );
}

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
    fontSize: 16,
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
    fontWeight: 500,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
});
