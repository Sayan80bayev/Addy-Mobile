import { configureStore } from "@reduxjs/toolkit";
import { authenticationApi } from "./api/authenticationApi";
export const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authenticationApi.middleware),
});
