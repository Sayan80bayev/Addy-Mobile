import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View, StatusBar, BackHandler } from "react-native";
import AddCard from "./AddCard";
import {
  useGetAddsQuery,
  useSearchByNameQuery,
  useGetByCatQuery,
} from "../../store";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import { useRoute, useIsFocused } from "@react-navigation/native";

export const AddList = ({ navigation }) => {
  const route = useRoute();
  const { search, category, refresh } = route.params || {};

  const {
    data: addsData,
    refetch: refetchAdds,
    isFetching: isFetchingAdds,
  } = useGetAddsQuery();
  const {
    data: searchData,
    refetch: refetchSearch,
    isFetching: isFetchingSearch,
  } = useSearchByNameQuery(search ? search.name : null, { skip: !search });
  const {
    data: catData,
    refetch: refetchCat,
    isFetching: isFetchingCat,
  } = useGetByCatQuery(category ? category.category_id : null, {
    skip: !category,
  });

  const data = search ? searchData : category ? catData : addsData;
  const refetch = search ? refetchSearch : category ? refetchCat : refetchAdds;
  const isFetching = search
    ? isFetchingSearch
    : category
    ? isFetchingCat
    : isFetchingAdds;

  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const fullAddNavigate = useCallback(
    (id) => {
      navigation.navigate("FullAdd", { id });
    },
    [navigation]
  );

  const handleLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    const onBackPress = () => {
      if (search || category) {
        navigation.navigate("Ads", { search: null, category: null });

        return true;
      }
      return false;
    };

    if (isFocused) {
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
    } else {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, [isFocused, search, category, navigation]);

  useEffect(() => {
    if (refresh) {
      refetchAdds();
      console.log("refetch");
      navigation.setParams({ refresh: false }); // Reset refresh param
    }
  }, [refresh, refetchAdds, navigation]);

  return (
    <>
      <StatusBar backgroundColor="#232323" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={data}
          style={styles.cardContainer}
          keyExtractor={(item) => item.id.toString()} // Add a key extractor if there's an id
          renderItem={({ item }) => (
            <AddCard
              advertisement={item}
              fullAddNavigate={fullAddNavigate}
              layout={layout}
              styles={styles}
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
