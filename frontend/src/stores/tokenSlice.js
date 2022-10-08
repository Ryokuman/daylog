import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "@utils/cookie";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    accessToken: getCookie("accessDayLogToken") || null,
    refreshToken: getCookie("refreshDayLogToken") || null,
  },
  reducers: {
    accessToken: (state, action) => {
      state.accessToken = action.payload;
      setCookie("accessDayLogToken", state.accessToken, 0.5);
    },
    refreshToken: (state, action) => {
      state.refreshToken = action.payload;
      setCookie("refreshDayLogToken", state.refreshToken, 24 * 14);
    },
  },
});

export default tokenSlice;
