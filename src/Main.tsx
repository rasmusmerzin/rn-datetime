import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { registerRootComponent } from "expo";

import { DatePicker, NaiveDate } from "./datetime";

export default registerRootComponent(() => {
  const [date, setDate] = useState(new NaiveDate());
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  return (
    <>
      <View style={style.main}>
        <Text style={style.date} onPress={() => setDatePickerVisibility(true)}>
          {date.toLocalDate().toDateString()}
        </Text>
        <Text style={style.time}>12:00</Text>
      </View>
      <DatePicker
        visible={datePickerVisibility}
        onCancel={() => setDatePickerVisibility(false)}
        onSubmit={(date) => {
          setDate(date);
          setDatePickerVisibility(false);
        }}
      />
    </>
  );
});

const style = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    paddingRight: 10,
  },
  time: {
    paddingLeft: 10,
  },
});
