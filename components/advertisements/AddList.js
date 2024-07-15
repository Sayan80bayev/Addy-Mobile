import React from "react";
import { FlatList } from "react-native";
import AddCard from "./AddCard";
import { useGetAddsQuery } from "../../store";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { styles } from "./style";

export const AddList = ({ navigation }) => {
  const { data: advertisements, refetch, isFetching } = useGetAddsQuery();
  const fullAddNavigate = (id) => {
    return navigation.navigate("FullAdd", { id });
  };
  return (
    <>
      <StatusBar backgroundColor="#232323" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={advertisements}
          style={styles.cardContainer}
          keyExtractor={(item) => item.id.toString()} // Add a key extractor if there's an id
          renderItem={({ item }) => (
            <AddCard advertisement={item} fullAddNavigate={fullAddNavigate} />
          )}
          ItemSeparatorComponent={<View style={{ height: 20 }}></View>}
          refreshing={isFetching}
          onRefresh={refetch}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }} // Space items between columns
        />
      </SafeAreaView>
    </>
  );
};
