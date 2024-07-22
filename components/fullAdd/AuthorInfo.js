import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { jwtDecode } from "jwt-decode";
import { decode as atob, encode as btoa } from "base-64";
if (typeof global.atob === "undefined") {
  global.atob = atob;
}
if (typeof global.btoa === "undefined") {
  global.btoa = btoa;
}
export const AuthorInfo = ({ user, token, navigation, id }) => {
  const navigateToEdit = (id) => {
    return navigation.navigate("Edit", { isEditing: true, id: id });
  };
  const [email, setEmail] = useState();
  useEffect(() => {
    if (token) {
      const result = jwtDecode(token).sub;
      setEmail(result);
    }
  }, [token]);

  return (
    <View style={{ padding: 20, gap: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
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
      {email != user.email ? (
        <TouchableOpacity style={styles.contactButton}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.text, { fontSize: 20, fontWeight: 600 }]}>
              Contact author
            </Text>
            <Image
              style={styles.icon}
              source={require("../../assets/call-dropped-rounded-svgrepo-com.png")}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={[styles.contactButton, { width: "45%" }]}
            onPress={() => navigateToEdit(id)}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={[styles.text, { fontSize: 20, fontWeight: 600 }]}>
                Edit
              </Text>
              <Image
                style={[styles.icon, { height: 25, width: 25 }]}
                source={require("../../assets/edit-3-svgrepo-com.png")}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contactButton, { width: "45%" }]}>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.text, { fontSize: 20, fontWeight: 600 }]}>
                Delete
              </Text>
              <Image
                style={styles.icon}
                source={require("../../assets/delete-clipboard-svgrepo-com.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
