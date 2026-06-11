import { apiClient } from "@/lib/axios";
import { IResponse } from "@/types/api.type";

export const userService = {
  getMe: (): Promise<IResponse<User>> => apiClient.get("/users/me"),
};
