import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "../API_KEY";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_KEY}`,
    prepareHeaders: async (headers, { getState }) => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["UserAds"],
  endpoints: (build) => ({
    getUserAdds: build.query({
      query: (email) => "/user/getUserAds/" + email,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "UserAds", id })),
              { type: "UserAds", id: "LIST" },
            ]
          : [{ type: "UserAds", id: "LIST" }],
    }),
  }),
});

export const { useGetUserAddsQuery } = userApi;
