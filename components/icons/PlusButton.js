// PlusButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const PlusButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF0083",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 70,
    left: 310,
    zIndex: 1,
  },
  plus: {
    top: -2,
    fontSize: 40,
    color: "#FFF",
    textAlign: "center",
  },
});

export default PlusButton;
