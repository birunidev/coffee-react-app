import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
  },
  reducers: {
    setAuth(state, action) {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
