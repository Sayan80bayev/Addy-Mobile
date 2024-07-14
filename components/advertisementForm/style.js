import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  formInput: {
    borderColor: "#FF0083",
    borderWidth: 1,
    borderRadius: 5,
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
    height: 120,
    flexDirection: "row", // Ensure images render horizontally
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 10,
  },
  submitButton: {
    height: 50,
    padding: 10,
    backgroundColor: "#ff0083",
    borderRadius: 10,
  },
});
