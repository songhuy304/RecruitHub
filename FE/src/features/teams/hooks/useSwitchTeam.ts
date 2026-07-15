import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { teamService } from "../services";
import { useAppDispatch } from "@/hooks/useRedux";
import { setTokens } from "@/store";

const useSwitchTeam = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const switchTeamMutation = useMutation({
    mutationFn: (teamId: number) => teamService.switchTeam(teamId),
    onSuccess: async (data) => {
      dispatch(setTokens(data.data));
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
