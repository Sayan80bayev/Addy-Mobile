import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useFullAdd } from "./hooks";
import { AddInfo } from "./AddInfo";
import { styles } from "./style";
import { SafeAreaView } from "react-native-safe-area-context";
export const FullAdd = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;
  const {
    advertisement = { title: "" },
    isLoading,
    error,
  } = useFullAdd({ id });

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        {advertisement && !isLoading && (
          <AddInfo advertisement={advertisement} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
