import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AdvertisementHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TextInput style={{ height: 40, backgroundColor: "#323232" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingLeft: 20,
    backgroundColor: "#232323",
    shadowColor: "#000000",
    height: 60,
    justifyContent: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
  },
});

export default AdvertisementHeader;
