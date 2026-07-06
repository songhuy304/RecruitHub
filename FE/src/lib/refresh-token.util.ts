import axios from "axios";
import { tokenStorage } from "./auth";
import { API_URL } from "@/config/app.config";

export const refreshToken = async () => {
  const refresh = tokenStorage.getRefresh();

  if (!refresh) {
    throw new Error("Refresh token not found");
  }

  const { data } = await axios.post(`${API_URL}/api/v1/auth/refresh-token`, {
    refreshToken: refresh,
  });

  tokenStorage.setTokens({
    accessToken: data.data.accessToken,
    refreshToken: data.data.refreshToken,
  });

  return data.data;
};
