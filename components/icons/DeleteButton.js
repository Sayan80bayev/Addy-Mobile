// DeleteButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const DeleteButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.minus}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF0083",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    transform: [{ rotate: "45deg" }], // Rotate the button 45 degrees
  },
  minus: {
    // borderWidth: 2,
    padding: 0,
    margin: 0,
    fontSize: 25,
    fontWeight: "400",
    color: "#FFF",
    textAlign: "center",
    top: -3,
  },
});

export default DeleteButton;
