import { selectTeams, selectUser } from "@/store";
import { useAppSelector } from "./useRedux";
import { ETEAM_ROLE } from "@/enums";

const useUser = () => {
  const user = useAppSelector(selectUser);
  const teams = useAppSelector(selectTeams);

  const hasRole = (role: string) => {
    return user?.role?.includes(role);
  };

  const getTeamRole = (teamId: number) => {
    return teams?.find((team) => team.id === teamId)?.teamRole as ETEAM_ROLE;
  }

  const hasTeamRole = (
    teamId: number,
    roles: string | string[]
  ) => {
    const role = getTeamRole(teamId);

    if (!role) return false;

    if (Array.isArray(roles)) {
      return roles.includes(role);
    }

    return role === roles;
  };

  const isOwner = (teamId: number) => {
    return getTeamRole(teamId) === ETEAM_ROLE.OWNER;
  }

  return { user, hasRole, getTeamRole, hasTeamRole, isOwner };
};

export { useUser };
