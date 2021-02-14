import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { registerRootComponent } from "expo";

import { DatePicker, TimePicker, NaiveDate, NaiveTime } from "./datetime";

export default registerRootComponent(() => {
  const [date, setDate] = useState(new NaiveDate());
  const [time, setTime] = useState(
    new NaiveTime(
      new Date().getHours(),
      (Math.ceil(new Date().getMinutes() / 5) * 5) % 60
    )
  );
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={datePickerVisibility}
        onRequestClose={() => setDatePickerVisibility(false)}
      >
        <DatePicker
          value={date}
          onCancel={() => setDatePickerVisibility(false)}
          onSubmit={(date) => {
            setDate(date);
            setDatePickerVisibility(false);
          }}
        />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={timePickerVisibility}
        onRequestClose={() => setTimePickerVisibility(false)}
      >
        <TimePicker
          value={time}
          onCancel={() => setTimePickerVisibility(false)}
          onSubmit={(time) => {
            setTime(time);
            setTimePickerVisibility(false);
          }}
        />
      </Modal>
    </>
  );
});

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
