import React from "react";
import { StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";

import DatePicker from "component/DatePicker";

export default registerRootComponent(() => (
  <View style={style.center}>
    <DatePicker onCancel={() => {}} onSubmit={() => {}} />
  </View>
));

const style = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
