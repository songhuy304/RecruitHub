"use client";

import { useEffect, useState } from "react";
import { LoadingPage } from "../loading-page";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { tokenStorage } from "@/lib/auth";
import { selectAccessToken, selectIsLoading, setTokens, setUser } from "@/store";
import { useRouter } from "next/navigation";
import { AUTH_PATHS } from "@/config/paths.config";
import { useGetMe } from "@/features/auth/hooks";

export default function AppBootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAccessToken);
  const selectLoading = useAppSelector(selectIsLoading);
  const router = useRouter();

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const accessToken = tokenStorage.getAccess();
    const refreshToken = tokenStorage.getRefresh();

    if (accessToken && refreshToken) {
      dispatch(setTokens({ accessToken, refreshToken }));
    }
    setIsHydrated(true);
  }, [dispatch]);

  const { data, error, isFetching, isPending } = useGetMe();

  const isCheckingUser = !!token && isPending && isFetching;

  useEffect(() => {
    if (!isHydrated) return;
    if (isCheckingUser) return;

    if (!token || error) {
      router.replace(`${AUTH_PATHS.SIGN_IN}?redirect=${window.location.pathname}`);
    }
  }, [isHydrated, isCheckingUser, token, error, router]);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data?.data));
    }
  }, [data, dispatch]);

  const isAuthorized = isHydrated && !!token && !!data && !error;

  if (!isHydrated || isCheckingUser || (!!token && !isAuthorized && !error)) {
    return <LoadingPage />;
  }

  if (!isAuthorized) {
    return <LoadingPage />;
  }

  return (
    <>
      {selectLoading && <LoadingPage />}
      {children}
    </>
  );
}
