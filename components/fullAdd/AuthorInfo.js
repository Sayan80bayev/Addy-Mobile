import React from "react";
import { View, Image, Text } from "react-native";
import { styles } from "./style";
export const AuthorInfo = ({ user }) => {
  return (
    <View
      style={{
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        // borderColor: "#ff0083",
        // borderWidth: 1,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          source={require("../../assets/author-sign-svgrepo-com.png")}
          style={styles.icon}
        />
        <Text style={[styles.text, { fontSize: 22, fontWeight: 500 }]}>
          Author:
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View>
          <Text style={[styles.text, { fontWeight: 500, fontSize: 20 }]}>
            {user.name}
          </Text>
          <Text style={[styles.text, { fontWeight: 500 }]}>{user.email}</Text>
        </View>
        <Image
          source={{ uri: `data:image/jpeg;base64,${user.avatar}` }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
        />
      </View>
    </View>
  );
};
