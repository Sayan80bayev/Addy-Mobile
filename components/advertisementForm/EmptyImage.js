import React from "react";
import { View, Image } from "react-native";

export const EmptyImage = ({ style }) => {
  return (
    <View
      style={[
        style,
        {
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",

          opacity: 0.3,
          gap: 10,
        },
      ]}
    >
      <Image
        source={require("../../assets/image.png")}
        style={{ height: 100, width: 100, borderRadius: 10 }}
      />
      <Image
        source={require("../../assets/image.png")}
        style={{ height: 100, width: 100, borderRadius: 10 }}
      />
      <Image
        source={require("../../assets/image.png")}
        style={{ height: 100, width: 100, borderRadius: 10 }}
      />
      <Image
        source={require("../../assets/image.png")}
        style={{ height: 100, width: 100, borderRadius: 10 }}
      />
    </View>
  );
};
