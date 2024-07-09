import React from "react";
import { View, Text, StyleSheet } from "react-native";
export const AlertError = ({ message }) => {
  return (
    <View style={styles.alertError}>
      <Text style={styles.alertText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alertError: {
    borderLeftWidth: 4,
    borderColor: "red",
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    padding: 10,
    marginBottom: 10,
  },
  alertText: {
    color: "red",
  },
});
