"use client";

import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { toast } from "sonner";
import GoogleSignInButton from "@/features/auth/components/google-auth-button";
import { signUpFormSchema, SignUpFormValues } from "@/features/auth/shemas";
import Link from "next/link";
import GithubSignInButton from "../components/github-auth-button";
import { AUTH_PATHS } from "@/config/paths.config";
import { useLoginSocial } from "../hooks/useLoginSocial";

interface SignUpFormProps {
  onSubmit: (values: SignUpFormValues) => void;
  isPending?: boolean;
}

export default function SignUpForm({ onSubmit, isPending }: SignUpFormProps) {
  const { loginWithGoogle, loginWithGithub } = useLoginSocial();

  const form = useAppForm({
    defaultValues: {
      userName: "",
      email: "",
      fullName: "",
      password: "",
    } as SignUpFormValues,
    validators: {
      onSubmit: signUpFormSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  const { FormTextField } = useFormFields<SignUpFormValues>();

  return (
    <div className="w-full space-y-4">
      <form.AppForm>
        <form.Form className="w-full space-y-2 p-0">
          <FormTextField
            name="userName"
            label="Username"
            required
            placeholder="Enter your username"
            autoComplete="username"
          />
          <FormTextField
            name="fullName"
            label="Full name"
            required
            placeholder="Enter your full name"
            autoComplete="name"
          />
          <FormTextField
            name="email"
            label="Email"
            required
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
          />
          <FormTextField
            name="password"
            label="Password"
            required
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
          />
          <form.SubmitButton className="mt-2 w-full" isLoading={isPending}>
            Create account
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
