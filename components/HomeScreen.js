// screens/HomeScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Добро пожаловать на домашнюю страницу!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});

export default HomeScreen;
