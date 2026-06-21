import { selectUser } from "@/store";
import { useAppSelector } from "./useRedux";

const useUser = () => {
  const user = useAppSelector(selectUser);

  const hasRole = (role: string) => {
    return user?.role?.includes(role);
  };
  return { user, hasRole };
};

export { useUser };
