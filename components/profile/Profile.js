import React from "react";
import { FlatList, View, Text } from "react-native";
import { useProfile } from "./hooks";
import { UserInfo } from "./UserInfo";
import { styles } from "./styles";
import { UserInfoEmpty } from "./UserInfoEmpy";
import { UserActions } from "./UserActions";
import { UserAddList } from "./UserAddList";

export const Profile = ({ navigation }) => {
  const { user, logout } = useProfile();

  const renderHeader = () => (
    <>
      {user ? (
        <>
          <UserInfo user={user} logout={logout} />
          <UserActions />
        </>
      ) : (
        <UserInfoEmpty navigateToLogin={() => navigation.navigate("Login")} />
      )}
    </>
  );

  return (
    <FlatList
      style={styles.main}
      data={user ? [user] : []} // Dummy data to trigger FlatList rendering
      renderItem={null}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={
        user ? <UserAddList email={user.email} navigation={navigation} /> : null
      }
      keyExtractor={(item, index) => index.toString()}
      // columnWrapperStyle={{
      //   gap: "2%",
      // }}
    />
  );
};

export default Profile;
