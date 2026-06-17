import { IResponse } from "@/types/api.type";
import { apiClient } from "@/lib/axios";
import { ITeam } from "../types";

export const teamService = {
  getInfo: (): Promise<IResponse<ITeam>> => apiClient.get("/teams/info"),
};
