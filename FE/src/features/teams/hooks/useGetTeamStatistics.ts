import { QUERY_KEY } from "@/config/query-keys";
import { useQuery } from "@tanstack/react-query";
import { teamService } from "../services";

const useGetTeamStatistics = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  const query = useQuery({
    queryKey: QUERY_KEY.TEAM.STATISTICS(id),
    queryFn: () => teamService.getStatistics(id),
    enabled: enabled,
  });
  return { ...query, data: query.data?.data };
};

export { useGetTeamStatistics };
