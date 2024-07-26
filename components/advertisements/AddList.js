import React, { useState } from "react";
import { FlatList, View, StatusBar, Text } from "react-native";
import AddCard from "./AddCard";
import { useGetAddsQuery } from "../../store";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";

export const AddList = ({ navigation }) => {
  const { data: advertisements, refetch, isFetching } = useGetAddsQuery();
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const fullAddNavigate = (id) => {
    return navigation.navigate("FullAdd", { id });
  };

  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
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
            <AddCard
              advertisement={item}
              fullAddNavigate={fullAddNavigate}
              layout={layout}
            />
          )}
          ItemSeparatorComponent={<View style={{ height: 20 }}></View>}
          refreshing={isFetching}
          onRefresh={refetch}
          numColumns={2}
          columnWrapperStyle={{ gap: 10 }} // Space items between columns
          onLayout={handleLayout}
        />
      </SafeAreaView>
    </>
  );
};
