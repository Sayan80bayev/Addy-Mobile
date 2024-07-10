import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  formInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    color: "white",
    marginVertical: 10,
  },
  description: {
    height: 100,
  },
  text: {
    color: "white",
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row", // Ensure images render horizontally
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 5,
  },
});
