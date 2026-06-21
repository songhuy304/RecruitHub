import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamService } from "../services";
import { QUERY_KEY } from "@/config/query-keys";

const useSwitchTeam = () => {
  const queryClient = useQueryClient();

  const switchTeamMutation = useMutation({
    mutationFn: (teamId: number) => teamService.switchTeam(teamId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER.ROOT] }),
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TEAM.ROOT] }),
      ]);
    },
  });

  const data = switchTeamMutation.data;

  return { ...switchTeamMutation, data };
};

export { useSwitchTeam };
