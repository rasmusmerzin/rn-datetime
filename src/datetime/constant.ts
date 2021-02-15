import { StyleSheet } from "react-native";

export const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
export const MORNING_HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const EVENING_HOURS = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

export const UNIT = 36;

export const COLORS = {
  primary: "#07f",
  shadow: "#888",
  highlight: "#0001",
  background: "#fff",
  text: "#000",
  blurred: "#0008",
};

export const DAY_MS = 1000 * 60 * 60 * 24;

export const BASE_STYLE = StyleSheet.create({
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
