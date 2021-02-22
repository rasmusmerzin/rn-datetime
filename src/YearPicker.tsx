import React, { memo, useCallback } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { COLORS, UNIT } from "./constant";

const MIN_YEAR = 1900;
const YEAR_COUNT = 201;
const ITEM_HEIGHT = UNIT * 1.25;
const YEARS = Array.from(Array(YEAR_COUNT), (_, i) => MIN_YEAR + i);

interface YearProps {
  value: number;
  selected: boolean;
  select(value: number): void;
}

const Year = memo(({ value, selected, select }: YearProps) => {
  const onPress = useCallback(() => select(value), [value, select]);
  return (
    <Pressable style={style.year} onPress={onPress}>
      <Text style={[style.yearText, selected && style.selectedText]}>
        {value}
      </Text>
    </Pressable>
  );
});

interface Props {
  selected: number;
  select(year: number): void;
}

const getItemLayout = (_: any, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

const keyExtractor = (value: number, _: any) => String(value);

export default memo(({ selected, select }: Props) => {
  const renderItem = ({ item }: { item: number }) => (
    <Year value={item} selected={selected === item} select={select} />
  );
  return (
    <FlatList
      style={style.list}
      data={YEARS}
      initialScrollIndex={Math.max(0, selected - MIN_YEAR - 2)}
      getItemLayout={getItemLayout}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
});

const style = StyleSheet.create({
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
    color: COLORS.text,
  },
  selectedText: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
