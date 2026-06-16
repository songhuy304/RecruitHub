import { selectUser } from "@/store";
import { useAppSelector } from "./useRedux";

const useUser = () => {
  const selector = useAppSelector(selectUser);
  return selector;
};

export { useUser };
