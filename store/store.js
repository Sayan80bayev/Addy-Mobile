import { configureStore } from "@reduxjs/toolkit";
import { authenticationApi } from "./api/authenticationApi";
import { advertisementApi } from "./api/advertismentApi";
import { categoryApi } from "./api/categoryApi";
import { subscriptionApi } from "./api/subscriptionApi";
import { profileApi } from "./api/profileApi";
import { mainApi } from "./api/mainApi";
import messageReducer from "./messageSlice"; // Import the message reducer
import { userApi } from "./api/userApi";
export const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [advertisementApi.reducerPath]: advertisementApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    message: messageReducer, // Add the message reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authenticationApi.middleware,
      userApi.middleware,
      advertisementApi.middleware,
      categoryApi.middleware,
      mainApi.middleware,
      subscriptionApi.middleware,
      profileApi.middleware
    ),
});
