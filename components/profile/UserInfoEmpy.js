import { View, Text, Image, Pressable } from "react-native";
import { styles } from "./styles";
export const UserInfoEmpty = ({ navigateToLogin }) => {
  return (
    <View style={styles.userInfo}>
      <Image
        style={styles.avatar}
        source={{
          uri: `https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg`,
        }}
        height={60}
        width={60}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.username]}>Not signed in</Text>
        <Pressable onPress={navigateToLogin}>
          <Text style={styles.text}>{"Sign in ->"}</Text>
        </Pressable>
      </View>
    </View>
  );
};
