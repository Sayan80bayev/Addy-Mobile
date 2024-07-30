import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useProfile } from "./hooks";
import { UserInfo } from "./UserInfo";
import { styles } from "./styles";
import { UserInfoEmpty } from "./UserInfoEmpy";
import { UserActions } from "./UserActions";
import { UserAddList } from "./UserAddList";

export const Profile = ({ navigation }) => {
  const { user, logout } = useProfile();

  return (
    <ScrollView style={styles.main}>
      {user ? (
        <>
          <UserInfo user={user} logout={logout} />
          <UserActions />
          <UserAddList email={user.email} navigation={navigation} />
        </>
      ) : (
        <UserInfoEmpty navigateToLogin={() => navigation.navigate("Login")} />
      )}
    </ScrollView>
  );
};

export default Profile;
