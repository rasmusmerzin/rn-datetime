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
  selected: {
    backgroundColor: COLORS.primary,
  },
  selectedText: {
    color: COLORS.background,
  },
  submitRow: {
    flexDirection: "row-reverse",
    position: "absolute",
    height: UNIT,
    bottom: UNIT / 2,
    right: UNIT / 2,
  },
  submitRowItem: {
    color: COLORS.primary,
    paddingHorizontal: 15,
    textAlignVertical: "center",
  },
});
