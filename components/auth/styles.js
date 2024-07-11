import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#232323",
    paddingVertical: 20,
  },

  signup: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    width: 660,
    maxWidth: "90%",
    alignItems: "center",
  },
  signupContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 50,
    alignItems: "stretch",
  },
  formTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 24,
    color: "#222",
    marginBottom: 40,
    textTransform: "uppercase",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    padding: 17,
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
  },
  labelAgreeTerm: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
    marginLeft: 8,
  },
  termService: {
    color: "#555",
    textDecorationLine: "underline",
  },
  formSubmit: {
    borderRadius: 5,
    padding: 17,
    alignItems: "center",
    backgroundColor: "#ff0083",
    marginTop: 20,
  },
  formSubmitText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
    textTransform: "uppercase",
  },
  loginhere: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  loginhereLink: {
    fontWeight: "700",
    color: "#222",
  },
});
