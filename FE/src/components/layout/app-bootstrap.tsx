"use client";

import { useGetMe } from "@/features/auth/hooks";
import { LoadingPage } from "../loading-page";

export default function AppBootstrap({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useGetMe();

  if (isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
