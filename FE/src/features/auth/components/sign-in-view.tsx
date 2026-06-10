"use client";
import SignInForm from "@/features/auth/forms/sign-in.form";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useSignIn } from "../hooks";
import { toast } from "sonner";
import { SignInFormValues } from "../shemas";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function SignInViewPage() {
  const router = useRouter();
  const { mutate: signIn, isPending } = useSignIn();

  const handleSignIn = (values: SignInFormValues) => {
    signIn(values, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-1">Sign in to your account</h2>
      <p className="text-muted-foreground text-sm text-center mb-8">
        Welcome back! Please enter your details to continue.
      </p>
      <SignInForm onSubmit={handleSignIn} isPending={isPending} />
    </div>
  );
}
