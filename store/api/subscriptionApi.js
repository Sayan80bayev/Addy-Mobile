import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// baseUrl: `http://192.168.98.67:3001`,

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.150.223:3001/subs",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Subscriptions"],
  endpoints: (build) => ({
    getSubs: build.query({
      query: () => ({
        url: ``,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Subscriptions", id })),
              { type: "Subscriptions", id: "LIST" },
            ]
          : [{ type: "Subscriptions", id: "LIST" }],
    }),
    deleteSub: build.mutation({
      query: (subscription) => ({
        url: ``,
        method: "DELETE",
        body: subscription,
      }),
      invalidatesTags: [{ type: "Subscriptions", id: "LIST" }],
    }),
    createSub: build.mutation({
      query: (subscription) => ({
        url: ``,
        method: "POST",
        body: subscription,
      }),
      invalidatesTags: [{ type: "Subscriptions", id: "LIST" }],
    }),
  }),
});
export const { useCreateSubMutation, useDeleteSubMutation, useGetSubsQuery } =
  subscriptionApi;
