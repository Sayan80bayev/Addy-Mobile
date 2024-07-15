import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useFullAdd } from "./hooks";

export const FullAdd = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;
  const {
    advertisement = { title: "" },
    isLoading,
    error,
  } = useFullAdd({ id });

  return (
    <View>
      <Text>{advertisement.title}</Text>
      <Text>{advertisement.price}</Text>
      <Text>{advertisement.category.category_name}</Text>
    </View>
  );
};
