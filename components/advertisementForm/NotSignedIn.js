import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
export const NotSignedIn = () => {
  return (
    <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
      <Text style={[styles.text, { fontSize: 30 }]}>Not signed in</Text>
    </View>
  );
};
