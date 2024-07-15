import React, { useState, useEffect } from "react";
import { useGetUserQuery } from "../../store";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { decode as atob, encode as btoa } from "base-64";

// Polyfill for atob and btoa
if (typeof global.atob === "undefined") {
  global.atob = atob;
}
if (typeof global.btoa === "undefined") {
  global.btoa = btoa;
}

export const useProfile = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        const decodedToken = jwtDecode("" + token);
        setEmail(decodedToken.sub);
        console.log(decodedToken);
        console.log(token);
      }
    };

    fetchToken();
  }, []);

  const { data: user = { avatar: "" } } = useGetUserQuery(email, {
    skip: !email,
  });

  return {
    user,
  };
};
