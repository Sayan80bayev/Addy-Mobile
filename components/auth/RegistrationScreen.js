import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";
import { useRegisterUserMutation } from "../../store";
import * as SecureStore from "expo-secure-store";
import { AlertError } from "../feedback";

const RegistrationScreen = ({ navigation }) => {
  const [message, setMessage] = useState();
  const [registerUser] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      setMessage("All fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const { data } = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      if (data) {
        await SecureStore.setItemAsync("authToken", data.token);
        navigation.navigate("Advertisements");
      } else {
        setMessage("Wrong credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Access error", "Please, try again.");
    }
  };

  return (
    <>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <ScrollView contentContainerStyle={styles.main}>
        <View style={styles.signup}>
          <View style={styles.container}>
            <View style={styles.signupContent}>
              {message && <AlertError message={message} />}
              <View style={styles.formGroup}>
                <TextInput
                  style={styles.formInput}
                  placeholder="Your Username"
                  value={formData.username}
                  onChangeText={(text) =>
                    setFormData({ ...formData, username: text })
                  }
                />
              </View>
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
              <TouchableOpacity
                style={styles.formSubmit}
                onPress={handleRegister}
              >
                <Text style={styles.formSubmitText}>Sign in</Text>
              </TouchableOpacity>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 20,
                }}
              >
                <Text style={styles.loginhere}>Already have an account ? </Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.loginhereLink}>Sign in here</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
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
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  loginhereLink: {
    fontWeight: "700",
    color: "#222",
  },
});
export default RegistrationScreen;
