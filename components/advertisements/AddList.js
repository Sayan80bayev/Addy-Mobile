import React from "react";
import { FlatList } from "react-native";
import AddCard from "./AddCard";
import { useGetAddsQuery } from "../../store";

export const AddList = () => {
  const { data: advertisements } = useGetAddsQuery();

  return (
    <FlatList
      data={advertisements}
      keyExtractor={(item) => item.id.toString()} // Add a key extractor if there's an id
      renderItem={({ item }) => <AddCard advertisement={item} />}
    />
  );
};
