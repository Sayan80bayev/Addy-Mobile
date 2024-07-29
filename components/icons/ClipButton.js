// PlusButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const PlusButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="paperclip" color={"white"} size={25} />
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
    top: 25,
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
