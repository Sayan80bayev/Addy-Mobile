import React from "react";
import { View, Text, StyleSheet } from "react-native";
export const AlertSuccess = ({ message }) => {
  return (
    <View style={style.alertSuccess}>
      <Text>{message}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  alertSuccess: {
    border: "none",
    borderLeft: "4px rgb(100, 255, 100) solid",
    backgroundColor: "rgb(100, 255, 100, .3)",
  },
});
