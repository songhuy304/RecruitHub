import { Metadata } from "next";
import SignInViewPage from "@/features/auth/components/sign-in-view";
import { APP_NAME } from "@/config/app.config";

export const metadata: Metadata = {
  title: `${APP_NAME} | Sign In`,
  description: "Sign In page for authentication.",
};

export default async function Page() {
  return <SignInViewPage />;
}
