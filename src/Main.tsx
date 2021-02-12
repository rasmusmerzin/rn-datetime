import React from "react";
import { Text, View } from "react-native";
import { registerRootComponent } from "expo";

export default registerRootComponent(() => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text>Hello, World!</Text>
  </View>
));
