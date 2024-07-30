import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useProfile } from "./hooks";
import { UserInfo } from "./UserInfo";
import { styles } from "./styles";
import { UserInfoEmpty } from "./UserInfoEmpy";
import { UserActions } from "./UserActions";
export const Profile = ({ navigation }) => {
  const navigateToLogin = () => {
    return navigation.navigate("Login");
  };
  const { user, logout } = useProfile();

  return (
    <View style={styles.main}>
      {user ? (
        <>
          <UserInfo user={user} logout={logout} />
          <UserActions />
        </>
      ) : (
        <UserInfoEmpty navigateToLogin={navigateToLogin} />
      )}
    </View>
  );
};
