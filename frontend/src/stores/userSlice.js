import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getUserData from "@utils/getUserData";

const getInitialState = createAsyncThunk("user/getInitialState", async (token) => {
  const resp = await getUserData(token);
  const result = await resp;
  return result;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: null,
    userData: { uuid: null, id: null, email: null, nickName: null },
  },
  reducers: {
    setData: (state, action) => {
      state.userData.uuid = action.payload?.uuid;
      state.userData.id = action.payload?.id;
      state.userData.email = action.payload?.email;
      state.userData.nickName = action.payload?.nickName;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialState.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(getInitialState.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.status = "complete";
    });
    builder.addCase(getInitialState.rejected, (state, action) => {
      state.status = "fail";
    });
  },
});

export default userSlice;
export { getInitialState };
