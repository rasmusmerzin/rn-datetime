import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type Style = ViewStyle | TextStyle | ImageStyle;

export function mergeStyleSheets(
  ...stylesheets: Record<string, Style>[]
): Record<string, Style> {
  return stylesheets.reduce((merged, stylesheet) => {
    for (const [key, style] of Object.entries(stylesheet))
      merged[key] = Object.assign(merged[key] || {}, style);
    return merged;
  }, {});
}
