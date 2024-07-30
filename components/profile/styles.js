import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#232323",
    padding: 20,
  },
  text: {
    color: "white",
  },
  userInfo: {
    flexDirection: "row",
  },
  avatar: {
    borderRadius: 30,
  },
  username: {
    fontSize: 24,
    fontWeight: 500,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FF0083",
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
  },
  signIn: {
    alignItems: "center",
  },
});
