import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";
import userSlice from "./userSlice";
import postSlice from "./postSlice";

export const store = configureStore({
  reducer: { token: tokenSlice.reducer, user: userSlice.reducer, post: postSlice.reducer },
});
