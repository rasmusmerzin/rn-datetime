import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DatePicker, TimePicker, NaiveDate, NaiveTime } from "rn-datetime";

export default () => {
  const [date, setDate] = useState(new NaiveDate());
  const [time, setTime] = useState(new NaiveTime(12, 0));
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  const [timePickerVisibility, setTimePickerVisibility] = useState(false);

  return (
    <>
      <View style={style.center}>
        <View style={style.row}>
          <Text
            style={style.date}
            onPress={() => setDatePickerVisibility(true)}
          >
            {date.toLocalDate().toDateString()}
          </Text>
          <Text
            style={style.time}
            onPress={() => setTimePickerVisibility(true)}
          >
            {time.toString()}
          </Text>
        </View>
        <Text>{date.toLocalDate(time).toISOString()}</Text>
      </View>
      <DatePicker
        value={date}
        visible={datePickerVisibility}
        onCancel={() => setDatePickerVisibility(false)}
        onSubmit={(date) => {
          setDate(date);
          setDatePickerVisibility(false);
        }}
      />
      <TimePicker
        value={time}
        visible={timePickerVisibility}
        onCancel={() => setTimePickerVisibility(false)}
        onSubmit={(time) => {
          setTime(time);
          setTimePickerVisibility(false);
        }}
      />
    </>
  );
};

const style = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  date: {
    padding: 10,
  },
  time: {
    padding: 10,
  },
});
