import { View, Text, Image } from "react-native";
export const UserInfo = ({ user }) => {
  return (
    <View>
      <Image
        source={{ uri: `data:image/jpeg;base64,${user.avatar}` }}
        height={100}
        width={100}
      />
      <Text>{user.email}</Text>
      <Text>{user.name}</Text>
    </View>
  );
};
