import { API_URL } from "@/config/app.config";
import { tokenStorage } from "@/lib/auth";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      tokenStorage.clearTokens();
      window.location.href = "/auth/sign-in";
    }
    return Promise.reject(err);
  }
);
