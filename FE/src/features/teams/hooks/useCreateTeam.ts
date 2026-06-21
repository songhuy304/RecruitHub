import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamService } from "../services";
import { QUERY_KEY } from "@/config/query-keys";
import { ICreateTeamPayload } from "../types";

const useCreateTeam = () => {
  const queryClient = useQueryClient();

  const createTeamMutation = useMutation({
    mutationFn: (teamData: ICreateTeamPayload) =>
      teamService.createTeam(teamData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.TEAM.LIST });
    },
  });

  return { ...createTeamMutation };
};

export { useCreateTeam };
