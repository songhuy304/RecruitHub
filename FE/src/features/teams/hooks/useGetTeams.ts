import { QUERY_KEY } from "@/config/query-keys";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectAccessToken, selectUser } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { teamService } from "../services";

const useGetTeams = () => {
  const token = useAppSelector(selectAccessToken);

  const query = useQuery({
    queryKey: QUERY_KEY.TEAM.LIST,
    queryFn: () => teamService.getTeams(),
    enabled: !!token,
    retry: 1,
  });

  const data = query.data?.data || [];

  return { ...query, data };
};

export { useGetTeams };
