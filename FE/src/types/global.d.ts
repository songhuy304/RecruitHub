import { ITeam } from "@/features/teams/types";

export {};

declare global {
  interface CurrentTeam extends ITeam {
    teamRole: string;
  }
  interface User {
    id: number;
    userName: string;
    email: string;
    fullName: string;
    avatar: string;
    role: string;
    isVerified: boolean;
    currentTeamId: number;
    currentTeam: CurrentTeam;
  }
}
