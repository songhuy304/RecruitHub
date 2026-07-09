import { createQueryParams, toQueryParams } from "@/lib/searchparams";
import { useQueryStates, UseQueryStatesKeysMap } from "nuqs";

interface UseFilterParamsOptions<T> {
  parsers: UseQueryStatesKeysMap;
  defaultFilters?: Partial<T>;
}

export function useFilterParams<T extends Record<string, any>>({
  parsers,
  defaultFilters,
}: UseFilterParamsOptions<T>) {
  const [params, setParams] = useQueryStates(parsers);

  const defaultValues = {
    ...defaultFilters,
    ...params,
  } as T;

  const handleSubmit = (values: T) => {
    setParams({
      ...createQueryParams(values),
      page: 1,
    });
  };

  const handleReset = () => {
    const cleared = Object.keys(parsers).reduce(
      (acc, key) => {
        acc[key] = null;
        return acc;
      },
      {} as Record<string, null>
    );

    setParams({
      ...cleared,
      ...toQueryParams(defaultFilters ?? {}),
      page: 1,
      perPage: 10,
    });
  };

  return { params, defaultValues, setParams, handleSubmit, handleReset };
}
