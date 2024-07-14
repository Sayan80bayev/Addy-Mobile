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
import { useAuthenticateUserMutation } from "../../store";
import * as SecureStore from "expo-secure-store";
import { AlertError } from "../feedback";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        await AsyncStorage.setItem("authToken", data.token);
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
      <StatusBar backgroundColor={"#232323"} barStyle={"light-content"} />

      <ScrollView contentContainerStyle={styles.main}>
        <View style={styles.signup}>
          <View style={styles.container}>
            <View style={styles.signupContent}>
              {message && <AlertError message={message} />}
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
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 20,
                }}
              >
                <Text style={styles.loginhere}>Don't have an account ? </Text>

                <Pressable onPress={() => navigation.navigate("Register")}>
                  <Text style={styles.loginhereLink}>Sign up here</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default LoginScreen;
