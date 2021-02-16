import { StyleSheet } from "react-native";

export const UNIT = 36;

export const COLORS = {
  primary: "#07f",
  shadow: "#888",
  highlight: "#0001",
  background: "#fff",
  text: "#000",
  blurred: "#0008",
};

export const BASE_STYLE = StyleSheet.create({
  tableItem: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: UNIT,
    height: UNIT,
    borderRadius: UNIT,
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
  selectedText: {
    color: COLORS.background,
  },
});
