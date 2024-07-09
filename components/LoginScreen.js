import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuthenticateUserMutation } from "../store";
import * as SecureStore from "expo-secure-store";
import { AlertError } from "./feedback";

const LoginScreen = ({ navigation }) => {
  const [message, setMessage] = useState();
  const [authenticateUser] = useAuthenticateUserMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const { data } = await authenticateUser({
        email: formData.email,
        password: formData.password,
      });
      if (data) {
        await SecureStore.setItemAsync("authToken", data.token);
        navigation.navigate("Advertisements");
      } else {
        setMessage("Неверное имя пользователя или пароль");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Ошибка входа", "Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={styles.signup}>
        <View style={styles.container}>
          <View style={styles.signupContent}>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.formInput}
                placeholder="Your Email"
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
              />
            </View>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.formInput}
                placeholder="Password"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
              />
            </View>
            <TouchableOpacity style={styles.formSubmit} onPress={handleLogin}>
              <Text style={styles.formSubmitText}>Sign in</Text>
            </TouchableOpacity>
            <Text style={styles.loginhere}>
              Don't have an account ?{" "}
              <Text style={styles.loginhereLink}>Sign up here</Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
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
    marginTop: 20,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  loginhereLink: {
    fontWeight: "700",
    color: "#222",
  },
});
export default LoginScreen;
