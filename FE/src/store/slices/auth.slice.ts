import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITokenResponse } from "@/services/auth/auth.type";
import { tokenStorage } from "@/lib/auth";

const accessToken = tokenStorage.getAccess();
const refreshToken = tokenStorage.getRefresh();

interface AuthState {
  accessToken?: string | null;
  refreshToken?: string | null;
  user: null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: accessToken ?? null,
  refreshToken: refreshToken ?? null,
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  reducers: {
    setTokens: (state, action: PayloadAction<ITokenResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      tokenStorage.setTokens(action.payload);
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      tokenStorage.clearTokens();
    },
  },
  initialState,
});

export const { setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
