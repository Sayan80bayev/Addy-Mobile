// messageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.message = action.payload;
    },
    removeMessage: (state) => {
      state.message = null;
      console.log("removed state");
    },
  },
});

export const { addMessage, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
