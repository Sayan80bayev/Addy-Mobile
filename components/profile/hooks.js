import React, { useState, useEffect } from "react";
import { useGetUserQuery } from "../../store";
import { jwtDecode } from "jwt-decode";
import { decode as atob, encode as btoa } from "base-64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// Polyfill for atob and btoa
if (typeof global.atob === "undefined") {
  global.atob = atob;
}
if (typeof global.btoa === "undefined") {
  global.btoa = btoa;
}

export const useProfile = () => {
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchToken = async () => {
        const authToken = await AsyncStorage.getItem("authToken");
        setToken(authToken);
      };
      fetchToken();
    }, [])
  );

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        const decodedToken = jwtDecode("" + token);
        setEmail(decodedToken.sub);
      }
    };
    loadUser();
  }, [token]);

  const { data, refetch } = useGetUserQuery(email);
  const [user, setUser] = useState();

  useEffect(() => {
    if (email) {
      refetch();
    }
  }, [email]);

  useEffect(() => {
    setUser(data);
  }, [data]);

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    setToken(null);
    setEmail(null);
    setUser(null);
  };

  return {
    user,
    logout,
  };
};
