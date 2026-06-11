"use client";

import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import Link from "next/link";
import { SignInFormValues } from "../shemas";
import GoogleSignInButton from "../components/google-auth-button";
import GithubSignInButton from "../components/github-auth-button";
import { AUTH_PATHS } from "@/config/paths.config";
import { useLoginSocial } from "../hooks/useLoginSocial";

interface SignInFormProps {
  onSubmit: (values: SignInFormValues) => void;
  isPending?: boolean;
}

export default function SignInForm({ onSubmit, isPending }: SignInFormProps) {
  const { loginWithGoogle, loginWithGithub } = useLoginSocial();

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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <GoogleSignInButton
          onClick={() => {
            loginWithGoogle();
          }}
        />
        <GithubSignInButton
          onClick={() => {
            loginWithGithub();
          }}
        />
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            className={"text-primary underline font-medium"}
            href={AUTH_PATHS.SIGN_IN}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
