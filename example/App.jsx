import React, { useState } from "react";
import {
  DatePicker,
  TimePicker,
  NaiveDate,
  NaiveTime,
  useColors,
} from "rn-datetime";
import { StyleSheet, Text, View } from "react-native";

export default () => {
  const colors = useColors();
  const [date, setDate] = useState(new NaiveDate());
  const [time, setTime] = useState(new NaiveTime(12, 0));
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  const [timePickerVisibility, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  function submitDate(time) {
    setDate(time);
    hideDatePicker();
  }
  function submitTime(time) {
    setTime(time);
    hideTimePicker();
  }

  return (
    <>
      <View style={[style.center, { backgroundColor: colors.background }]}>
        <View style={style.row}>
          <Text
            style={[style.date, { color: colors.text }]}
            onPress={showDatePicker}
          >
            {date.toLocalDate().toDateString()}
          </Text>
          <Text
            style={[style.time, { color: colors.text }]}
            onPress={showTimePicker}
          >
            {time.toString()}
          </Text>
        </View>
        <Text style={{ color: colors.text }}>
          {date.toLocalDate(time).toISOString()}
        </Text>
      </View>
      <DatePicker
        prioritizeYear={true}
        value={date}
        visible={datePickerVisibility}
        onCancel={hideDatePicker}
        onSubmit={submitDate}
      />
      <TimePicker
        value={time}
        visible={timePickerVisibility}
        onCancel={hideTimePicker}
        onSubmit={submitTime}
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
