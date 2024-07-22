// FullAdd.js
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
import ModalAlert from "../feedback/ModalAlert";

export const FullAdd = ({ navigation }) => {
  const route = useRoute();
  const { id, message = null } = route.params;
  const {
    advertisement = { title: "" },
    isLoading,
    error,
  } = useFullAdd({ id });
  const email = advertisement?.email;
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(email);
  const [token, setToken] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchToken = async () => {
        const result = await AsyncStorage.getItem("authToken");
        setToken(result);
      };
      fetchToken();
    }, [])
  );

  React.useEffect(() => {
    if (message) {
      setModalVisible(true);
    }
  }, [message]);

  return (
    <SafeAreaView style={styles.main}>
      {message && (
        <ModalAlert
          text={message.value}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      <ScrollView style={{ flex: 1 }}>
        {advertisement && !isLoading && user && (
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
