import { ETEAM_ROLE } from "@/enums";
import { selectTeams, selectUser } from "@/store";
import { useAppSelector } from "./useRedux";

export const useUser = () => {
  const user = useAppSelector(selectUser);
  const teams = useAppSelector(selectTeams);

  const hasSystemRole = (role: string) => {
    return user?.role?.includes(role) ?? false;
  };

  const getUserTeamRole = (teamId: number): ETEAM_ROLE | undefined => {
    return teams?.find((team) => team.id === teamId)?.teamRole;
  };

  const hasUserTeamRole = (teamId: number, roles: ETEAM_ROLE | ETEAM_ROLE[]) => {
    const role = getUserTeamRole(teamId);
    if (!role) return false;
    return Array.isArray(roles) ? roles.includes(role) : role === roles;
  };

  const hasCurrentTeamRole = (roles: ETEAM_ROLE | ETEAM_ROLE[]) => {
    if (!user?.currentTeamId) return false;

    return hasUserTeamRole(user.currentTeamId, roles);
  };

  const isTeamOwner = (teamId: number) => {
    return hasUserTeamRole(teamId, ETEAM_ROLE.OWNER);
  };

  const isCurrentTeamOwner = () => {
    return hasCurrentTeamRole(ETEAM_ROLE.OWNER);
  };

  return {
    user,

    // System
    hasSystemRole,

    // Team
    getUserTeamRole,
    hasUserTeamRole,
    hasCurrentTeamRole,

    // Shortcut
    isTeamOwner,
    isCurrentTeamOwner,
  };
};
