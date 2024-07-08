import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useAuthenticateUserMutation } from "../store";

const LoginScreen = ({ navigation }) => {
  const [authenticateUser] = useAuthenticateUserMutation();
  //   console.log(authenticateUser);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleLogin = async () => {
    try {
      // Perform authentication using your mutation function
      const { data } = await authenticateUser({
        email: formData.email,
        password: formData.password,
      });
      console.log(data);
      // Assuming sauccessful login, navigate to the home screen
      if (data) {
        navigation.navigate("Home");
      } else {
        alert("Неверное имя пользователя или пароль");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Ошибка входа. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <View style={styles.container}>
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
