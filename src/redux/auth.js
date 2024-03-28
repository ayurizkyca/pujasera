import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  username: "",
  password: ""
}

const authSlice = createSlice({
  name: "authentification",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = !initialAuthState.isAuthenticated;
      state.username = action.payload.username;
      state.password = action.payload.password
    },
    logout(state) {
      state.isAuthenticated = initialAuthState.isAuthenticated;
      state.username = "";
      state.password = ""
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;