import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DatePicker, TimePicker, NaiveDate, NaiveTime } from "rn-datetime";

export default () => {
  const [date, setDate] = useState(new NaiveDate());
  const [time, setTime] = useState(new NaiveTime(12, 0));
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  const [timePickerVisibility, setTimePickerVisibility] = useState(false);

  const showDatePicker = useCallback(() => setDatePickerVisibility(true), [
    setDatePickerVisibility,
  ]);
  const hideDatePicker = useCallback(() => setDatePickerVisibility(false), [
    setDatePickerVisibility,
  ]);
  const showTimePicker = useCallback(() => setTimePickerVisibility(true), [
    setTimePickerVisibility,
  ]);
  const hideTimePicker = useCallback(() => setTimePickerVisibility(false), [
    setTimePickerVisibility,
  ]);

  const submitDate = useCallback(
    (time) => {
      setDate(time);
      hideDatePicker();
    },
    [time, setDate, hideDatePicker]
  );
  const submitTime = useCallback(
    (time) => {
      setTime(time);
      hideTimePicker();
    },
    [time, setTime, hideTimePicker]
  );

  return (
    <>
      <View style={style.center}>
        <View style={style.row}>
          <Text style={style.date} onPress={showDatePicker}>
            {date.toLocalDate().toDateString()}
          </Text>
          <Text style={style.time} onPress={showTimePicker}>
            {time.toString()}
          </Text>
        </View>
        <Text>{date.toLocalDate(time).toISOString()}</Text>
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
