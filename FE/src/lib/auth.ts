export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export const tokenStorage = {
  getAccess: () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  getRefresh: () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),

  setTokens: (tokens: { accessToken: string; refreshToken: string }) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
  },

  clearTokens: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },
};
