import { configureStore } from "@reduxjs/toolkit";
import { authenticationApi } from "./api/authenticationApi";
import { advertisementApi } from "./api/advertismentApi";
export const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [advertisementApi.reducerPath]: advertisementApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authenticationApi.middleware,
      advertisementApi.middleware
    ),
});
