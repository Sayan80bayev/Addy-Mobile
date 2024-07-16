import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
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
  } = useFullAdd({ id });
  const email = advertisement?.email;
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(email);
  const [token, setToken] = useState();

  useFocusEffect(
    React.useCallback(() => {
      const fetchToken = async () => {
        const result = await AsyncStorage.getItem("authToken");
        setToken(result);
      };
      fetchToken();
    }, [])
  );
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={{ flex: 1 }}>
        {advertisement && !isLoading && user && (
          <>
            <AddInfo advertisement={advertisement} />
            <AuthorInfo user={user} token={token} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
