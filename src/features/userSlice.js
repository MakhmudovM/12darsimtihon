import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  user: {
    uid: null,
    displayName: null,
    photoURL: null,
    email: null,
  },
  authReady: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    isAuthReady: (state) => {
      state.authReady = true;
    },
    clear: (state) => {
      state.user = {
        uid: null,
        displayName: null,
        photoURL: null,
        email: null,
      };
    },
  },
});

export const { login, isAuthReady, clear } = userSlice.actions;
export default userSlice.reducer;

