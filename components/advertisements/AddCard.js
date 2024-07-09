import React from "react";
import { View, Text } from "react-native";

const AddCard = ({ advertisement }) => {
  return (
    <View>
      <Text>{advertisement.title}</Text>
    </View>
  );
};

export default AddCard;
