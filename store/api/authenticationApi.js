import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../API_KEY";

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: `http://192.168.98.67:3001/api/v1/auth/`,
    baseUrl: `${API_KEY}/api/v1/auth/`,
  }),
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (formData) => ({
        url: "register",
        method: "POST",
        body: formData,
      }),
    }),
    authenticateUser: build.mutation({
      query: (formData) => ({
        url: "authenticate",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useAuthenticateUserMutation } =
  authenticationApi;
