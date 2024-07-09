import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
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
        navigation.navigate("Home");
      } else {
        setMessage("Неверное имя пользователя или пароль");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Ошибка входа", "Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <View style={styles.container}>
      {message && <AlertError message={message} />}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        placeholder="Введите email пользователя"
      />
      <Text style={styles.label}>Пароль</Text>
      <TextInput
        style={styles.input}
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        placeholder="Введите пароль"
        secureTextEntry
      />
      <Button title="Войти" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default LoginScreen;
