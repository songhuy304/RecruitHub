import { QUERY_KEY } from "@/config/query-keys";
import { commonService } from "@/services/common/common.service";
import { useQuery } from "@tanstack/react-query";

const useGetLocation = () => {
  const query = useQuery({
    queryKey: QUERY_KEY.LOCATION.LIST,
    queryFn: () => commonService.getLocation(),
    retry: 1,
  });

  const data = query.data?.data || [];

  const options = data.map((location) => ({
    value: location.code,
    label: location.englishName,
  }));

  return { ...query, data, options };
};

export { useGetLocation };
