import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { styles } from "./styles";

export const UserActions = () => {
  const data = [
    { name: "bells", title: "Notifications" },
    { name: "message1", title: "Messages" },
    { name: "setting", title: "Options" },
  ];

  return (
    <FlatList
      style={{
        marginVertical: 20,
      }}
      data={data}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity>
            <View style={{ flexDirection: "row", gap: 10, marginLeft: 10 }}>
              <Icon name={item.name} size={20} color={"white"} />
              <Text style={[styles.text, { fontSize: 15 }]}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
      ItemSeparatorComponent={
        <View
          style={{
            borderBottomColor: "#434343",
            borderWidth: 2,
            borderTopWidth: 0,
            marginVertical: 10,
          }}
        ></View>
      }
    />
  );
};
