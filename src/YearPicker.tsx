import React, { useCallback, useMemo } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { UNIT } from "./constant";
import { Colors } from "./colors";
import { mergeStyleSheets, Style } from "./style";

const MIN_YEAR = 1900;
const YEAR_COUNT = 201;
const ITEM_HEIGHT = UNIT * 1.25;
const YEARS = Array.from(Array(YEAR_COUNT), (_, i) => MIN_YEAR + i);

interface YearProps {
  value: number;
  selected: boolean;
  select(value: number): void;
  style: Record<string, Style>;
}

const Year = ({ value, selected, select, style }: YearProps) => {
  const onPress = useCallback(() => select(value), [value, select]);
  return (
    <Pressable style={style.year} onPress={onPress}>
      <Text style={[style.yearText, selected && style.selectedText]}>
        {value}
      </Text>
    </Pressable>
  );
};

export interface YearPickerProps {
  selected: number;
  select(year: number): void;
  colors: Colors;
}

const getItemLayout = (_: any, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

const keyExtractor = (value: number, _: any) => String(value);

export function YearPicker({ selected, select, colors }: YearPickerProps) {
  const style = useMemo(
    () => mergeStyleSheets(staticStyle, dynamicStyle(colors)),
    [colors],
  );
  const renderItem = ({ item }: { item: number }) => (
    <Year
      value={item}
      selected={selected === item}
      select={select}
      style={style}
    />
  );
  return (
    <FlatList
      style={style.list}
      data={YEARS}
      initialScrollIndex={Math.max(0, selected - MIN_YEAR - 2)}
      getItemLayout={getItemLayout}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const dynamicStyle = (colors: Colors) =>
  StyleSheet.create({
    yearText: {
      color: colors.text,
    },
    selectedText: {
      color: colors.primary,
    },
  });

const staticStyle = StyleSheet.create({
  list: {
    marginBottom: UNIT / 2,
  },
  year: {
    alignItems: "center",
    justifyContent: "center",
    height: ITEM_HEIGHT,
  },
  yearText: {
    fontSize: 16,
  },
  selectedText: {
    fontSize: 28,
    fontWeight: 700,
  },
});
