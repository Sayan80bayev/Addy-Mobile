import React from "react";
import { FlatList, View, Text } from "react-native";
import { useProfile } from "./hooks";
import { UserInfo } from "./UserInfo";
import { styles } from "./styles";
import { UserInfoEmpty } from "./UserInfoEmpy";
import { UserActions } from "./UserActions";
import { UserAddList } from "./UserAddList";
import Icon from "react-native-vector-icons/AntDesign";
export const Profile = ({ navigation }) => {
  const { user, logout } = useProfile();

  const renderHeader = () => (
    <>
      {user ? (
        <>
          <UserInfo user={user} logout={logout} />
          <UserActions />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Icon name="appstore-o" size={25} color={"#ff0083"} />
            <Text style={{ fontSize: 18, marginBottom: 20, color: "#ff0083" }}>
              Your advertisements
            </Text>
          </View>
        </>
      ) : (
        <UserInfoEmpty navigateToLogin={() => navigation.navigate("Login")} />
      )}
    </>
  );

  return (
    <FlatList
      style={styles.main}
      data={user ? [user] : []}
      renderItem={null}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={
        user ? <UserAddList email={user.email} navigation={navigation} /> : null
      }
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Profile;
