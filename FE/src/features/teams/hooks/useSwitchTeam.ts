import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { teamService } from "../services";

const useSwitchTeam = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const switchTeamMutation = useMutation({
    mutationFn: (teamId: number) => teamService.switchTeam(teamId),
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(t(error.message));
    },
  });

  const data = switchTeamMutation.data;

  return { ...switchTeamMutation, data };
};

export { useSwitchTeam };
