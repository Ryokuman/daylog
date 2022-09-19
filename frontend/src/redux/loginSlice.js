import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: { id: null, password: null, token: null },
    reducers: {
        ID: (state, action) => {
            state.id = action.payload;
        },
        PASSWORD: (state, action) => {
            state.password = action.payload;
        },
        TOKEN: (state, action) => {
            state.token = action.payload;
        },
    },
});

export default loginSlice;
