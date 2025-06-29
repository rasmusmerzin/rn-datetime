import { ColorSchemeName, useColorScheme } from "react-native";

export interface Colors {
  primary: string;
  shadow: string;
  highlight: string;
  background: string;
  text: string;
  blurred: string;
}

export interface ColorsPalette {
  light: Colors;
  dark: Colors;
}

export const COLORS: ColorsPalette = {
  light: {
    primary: "#07f",
    shadow: "#999",
    highlight: "#0001",
    background: "#fff",
    text: "#000",
    blurred: "#0008",
  },
  dark: {
    primary: "#07f",
    shadow: "#666",
    highlight: "#fff1",
    background: "#1c1c1c",
    text: "#fff",
    blurred: "#0008",
  },
};

export function useColors(
  override?: ColorSchemeName | Colors | ColorsPalette,
): Colors {
  const theme = useColorScheme() || "light";
  if (override && typeof override === "object")
    return (override as ColorsPalette)[theme] || (override as Colors);
  return COLORS[override || theme];
}
