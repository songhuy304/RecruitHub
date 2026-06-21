export const QUERY_KEY = {
  AUTH: {
    ME: ["auth", "me"],
  },

  USER: {
    ROOT: "user",
    INFO: ["user", "info"],
    LIST: ["user", "list"],
  },

  TEAM: {
    ROOT: "team",
    INFO: ["team", "info"],
    LIST: ["team", "list"],
  },
} as const;
