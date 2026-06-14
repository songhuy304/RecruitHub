"use client";

import { useEffect } from "react";
import { useGetMe } from "@/features/auth/hooks";
import { LoadingPage } from "../loading-page";
import { useAppSelector } from "@/hooks/useRedux";
import { selectAccessToken } from "@/store";
import { useRouter } from "next/navigation";
import { AUTH_PATHS } from "@/config/paths.config";

export default function AppBootstrap({
  children,
}: {
  children: React.ReactNode;
}) {
  const selectToken = useAppSelector(selectAccessToken);
  const router = useRouter();
  const { isLoading } = useGetMe();

  useEffect(() => {
    if (!selectToken) {
      router.replace(
        `${AUTH_PATHS.SIGN_IN}?redirect=${window.location.pathname}`,
      );
    }
  }, [selectToken, router]);

  if (!selectToken) {
    return <LoadingPage />;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
