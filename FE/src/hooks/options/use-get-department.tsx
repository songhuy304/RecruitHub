import { QUERY_KEY } from "@/config/query-keys";
import { commonService } from "@/services/common/common.service";
import { useQuery } from "@tanstack/react-query";

const useGetDepartment = () => {
  const query = useQuery({
    queryKey: QUERY_KEY.DEPARTMENT.LIST,
    queryFn: () => commonService.getDepartments(),
    retry: 1,
  });

  const data = query.data?.data || [];

  const options = data.map((department) => ({
    value: department.code,
    label: department.name,
  }));

  return { ...query, data, options };
};

export { useGetDepartment };
