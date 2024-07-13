import { configureStore } from "@reduxjs/toolkit";
import { authenticationApi } from "./api/authenticationApi";
import { advertisementApi } from "./api/advertismentApi";
import { categoryApi } from "./api/categoryApi";

export const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [advertisementApi.reducerPath]: advertisementApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authenticationApi.middleware,
      advertisementApi.middleware,
      categoryApi.middleware
    ),
});
