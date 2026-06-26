import { QUERY_KEY } from "@/config/query-keys";
import { useQuery } from "@tanstack/react-query";
import { teamService } from "../services";

interface UseGetMembersParams {
  teamId: number;
  page: number;
  limit: number;
  search?: string;
  enabled?: boolean;
}

const useGetMembers = ({
  teamId,
  page,
  limit,
  search,
  enabled = true,
}: UseGetMembersParams) => {
  const query = useQuery({
    queryKey: [...QUERY_KEY.TEAM.MEMBERS(teamId), { page, limit, search }],
    queryFn: () => teamService.getMembers(teamId, { page, limit, search }),
    enabled: enabled && !!teamId,
  });

  return {
    ...query,
    data: query.data?.data || [],
  };
};

export { useGetMembers };
