import React from "react";
import { View, Image, Text } from "react-native";
import { useProfile } from "./hooks";
import { UserInfo } from "./UserInfo";
import { styles } from "./styles";

export const Profile = () => {
  const { user } = useProfile();
  // console.log(user);
  return (
    <View style={styles.main}>
      <UserInfo user={user} />
    </View>
  );
};
