"use client";

import { LoadingPage } from "@/components/loading-page";
import { useVerifyToken } from "../hooks/useVerifyToken";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { setTokens } from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AUTH_PATHS } from "@/config/paths.config";

interface IVerifyTokenViewProps {
  token: string;
}

const VerifyTokenView = ({ token }: IVerifyTokenViewProps) => {
  const { mutate, isPending } = useVerifyToken();
  const dispatch = useAppDispatch();
  const route = useRouter();

  useEffect(() => {
    if (token) {
      mutate(
        { token },
        {
          onSuccess(data) {
            const { accessToken, refreshToken } = data.data;
            dispatch(
              setTokens({
                accessToken: accessToken ?? "",
                refreshToken: refreshToken ?? "",
              }),
            );
          },
          onError(error) {
            toast.error(error.message || "Failed to verify token");
            route.push(AUTH_PATHS.SIGN_IN);
          },
        },
      );
    }
  }, [token, mutate]);

  if (isPending) {
    return <LoadingPage />;
  }

  return <div>asdasd</div>;
};

export { VerifyTokenView };
