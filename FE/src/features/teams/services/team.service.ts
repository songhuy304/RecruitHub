import { IResponse } from "@/types/api.type";
import { apiClient } from "@/lib/axios";
import { ICreateTeamPayload, ITeam } from "../types";
import { ITokenResponse } from "@/services/auth/auth.type";

const PATH = {
  INFO: "/teams/info",
  LIST: "/teams",
  CREATE: "/teams/create-team",
  SWITCH: (teamId: number) => `/teams/switch/${teamId}`,
};

export const teamService = {
  getInfo: (): Promise<IResponse<ITeam>> => apiClient.get(PATH.INFO),
  getTeams: (): Promise<IResponse<ITeam[]>> => apiClient.get(PATH.LIST),
  createTeam: (teamData: ICreateTeamPayload): Promise<IResponse<void>> =>
    apiClient.post(PATH.CREATE, teamData),
  switchTeam: (teamId: number): Promise<IResponse<ITokenResponse>> =>
    apiClient.post(PATH.SWITCH(teamId)),
};
