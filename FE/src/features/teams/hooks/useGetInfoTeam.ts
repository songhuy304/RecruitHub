import { QUERY_KEY } from "@/config/query-keys";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectAccessToken, setTeamInfo } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { teamService } from "../services";
import { useEffect } from "react";

const useGetInfoTeam = () => {
  const token = useAppSelector(selectAccessToken);
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: QUERY_KEY.TEAM.INFO,
    queryFn: () => teamService.getInfo(),
    enabled: !!token,
    retry: 1,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      dispatch(setTeamInfo(query.data.data));
    }
  }, [query.isSuccess, query.data, dispatch]);

  return { ...query };
};

export { useGetInfoTeam };
