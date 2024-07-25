import React, { useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useFullAdd } from "./hooks";
import { AddInfo } from "./AddInfo";
import { styles } from "./style";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthorInfo } from "./AuthorInfo";
import { useGetUserQuery } from "../../store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export const FullAdd = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;
  const {
    advertisement = { title: "" },
    isLoading,
    error,
    refetch,
  } = useFullAdd({ id });
  const email = advertisement?.email;
  const {
    data: user,
    isLoading: isUserLoading,
    refetch: refethcUser,
  } = useGetUserQuery(email);
  const [token, setToken] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchToken = async () => {
        const result = await AsyncStorage.getItem("authToken");
        setToken(result);
      };
      fetchToken();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {advertisement && !isLoading && user && !isUserLoading && (
          <>
            <AddInfo advertisement={advertisement} />
            <AuthorInfo
              user={user}
              token={token}
              id={advertisement.id}
              navigation={navigation}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
