"use client";

import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import Link from "next/link";
import { SignInFormValues } from "../shemas";
import GoogleSignInButton from "../components/google-auth-button";
import GithubSignInButton from "../components/github-auth-button";
import { AUTH_PATHS } from "@/config/paths.config";

interface SignInFormProps {
  onSubmit: (values: SignInFormValues) => void;
  isPending?: boolean;
}

export default function SignInForm({ onSubmit, isPending }: SignInFormProps) {
  const form = useAppForm({
    defaultValues: {
      userName: "",
      password: "",
    } satisfies SignInFormValues,
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  const { FormTextField } = useFormFields<SignInFormValues>();

  return (
    <div className="w-full space-y-4">
      <form.AppForm>
        <form.Form className="w-full space-y-2 p-0">
          <FormTextField
            name="userName"
            label="Email or Username"
            required
            placeholder="Enter your email or username"
            autoComplete="username"
          />

          <FormTextField
            name="password"
            label="Password"
            required
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          <form.SubmitButton className="mt-2 w-full" isLoading={isPending}>
            Sign in
          </form.SubmitButton>
        </form.Form>
      </form.AppForm>

      <div className="flex flex-col gap-2">
        <GoogleSignInButton onClick={() => {}} />
        <GithubSignInButton onClick={() => {}} />
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            href={AUTH_PATHS.SIGN_UP}
            className="text-primary underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
