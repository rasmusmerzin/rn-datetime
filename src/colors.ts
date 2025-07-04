import { ColorSchemeName, useColorScheme } from "react-native";

export type ColorOverride = ColorSchemeName | Colors | ColorPalette;

export interface Colors {
  primary: string;
  shadow: string;
  highlight: string;
  background: string;
  text: string;
  blurred: string;
}

export interface ColorPalette {
  light: Colors;
  dark: Colors;
}

export const COLORS: ColorPalette = {
  light: {
    primary: "#18f",
    shadow: "#999",
    highlight: "#0001",
    background: "#fff",
    text: "#000",
    blurred: "#0008",
  },
  dark: {
    primary: "#18f",
    shadow: "#666",
    highlight: "#fff1",
    background: "#1c1c1c",
    text: "#fff",
    blurred: "#0008",
  },
};

export function useColors(override?: ColorOverride): Colors {
  const theme = useColorScheme() || "light";
  if (override && typeof override === "object")
    return (override as ColorPalette)[theme] || (override as Colors);
  return COLORS[override || theme];
}
