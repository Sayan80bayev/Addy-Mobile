import { View, Text, Image } from "react-native";
import { styles } from "./styles";

export const UserInfo = ({ user }) => {
  const username = user.name ? user.name.toUpperCase() : "";

  return (
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
  );
};
