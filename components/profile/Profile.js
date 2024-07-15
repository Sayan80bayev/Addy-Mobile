import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useProfile } from "./hooks";
import { UserInfo } from "./UserInfo";
import { styles } from "./styles";
import { UserInfoEmpty } from "./UserInfoEmpy";
export const Profile = ({ navigation }) => {
  const navigateToLogin = () => {
    return navigation.navigate("Login");
  };
  const { user, logout } = useProfile();

  return (
    <View style={styles.main}>
      {user ? (
        <>
          <UserInfo user={user} />
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity style={styles.logout} onPress={logout}>
            <Text style={[styles.text, { fontSize: 16, fontWeight: 500 }]}>
              Log out
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <UserInfoEmpty navigateToLogin={navigateToLogin} />
      )}
    </View>
  );
};
