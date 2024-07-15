import React from "react";
import { View, Image, Text } from "react-native";
import { useProfile } from "./hooks";
import { UserInfo } from "./UserInfo";
import { styles } from "./styles";
import { UserInfoEmpty } from "./UserInfoEmpy";
export const Profile = ({ navigation }) => {
  const navigateToLogin = () => {
    return navigation.navigate("Login");
  };

  // const { user } = useProfile();
  const user = null;
  return (
    <View style={styles.main}>
      {user ? (
        <UserInfo user={user} />
      ) : (
        <UserInfoEmpty navigateToLogin={navigateToLogin} />
      )}
    </View>
  );
};
