import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  user: null,
  authReady: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    login: (state, { payload }) => {
      // Сохраняем только сериализуемые данные пользователя
      state.user = {
        uid: payload.uid,
        email: payload.email,
        displayName: payload.displayName,
      };
    },
    isAuthReady: (state) => {
      state.authReady = true;
    },
    clear: (state) => {
      state.user = null;
    },
  },
});

export const { login, isAuthReady, clear } = userSlice.actions;
export default userSlice.reducer;
