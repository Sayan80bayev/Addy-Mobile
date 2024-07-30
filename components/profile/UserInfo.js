import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { styles } from "./styles";
export const UserInfo = ({ user, logout }) => {
  const username = user.name ? user.name.toUpperCase() : "";

  return (
    <>
      <View style={styles.userInfo}>
        <Image
          style={styles.avatar}
          source={{ uri: `data:image/jpeg;base64,${user.avatar}` }}
          height={60}
          width={60}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.username]}>{username}</Text>
          <Text style={styles.text}>{user.email}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <TouchableOpacity style={[styles.button]}>
          <Icon name="edit" size={20} color={"white"} />
          <Text style={[styles.text, { fontSize: 16, fontWeight: 600 }]}>
            Edit profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Icon name="logout" size={20} color={"white"} />
          <Text style={[styles.text, { fontSize: 16, fontWeight: 600 }]}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
