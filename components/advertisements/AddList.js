import React from "react";
import { FlatList } from "react-native";
import AddCard from "./AddCard";
import { useGetAddsQuery } from "../../store";
import { styles } from "./style";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
export const AddList = () => {
  const { data: advertisements } = useGetAddsQuery();

  return (
    <>
      <StatusBar backgroundColor="#232323" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={advertisements}
          style={styles.cardContainer}
          keyExtractor={(item) => item.id.toString()} // Add a key extractor if there's an id
          renderItem={({ item }) => <AddCard advertisement={item} />}
          ItemSeparatorComponent={<View style={{ height: 20 }}></View>}
        />
      </SafeAreaView>
    </>
  );
};
