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
import { styles } from "./styles";

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
        navigation.navigate("Ads");
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

export default RegistrationScreen;
