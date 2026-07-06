"use client";

import { useStore } from "@tanstack/react-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { Typography } from "@/components/ui/typography";
import { useTranslations } from "next-intl";

import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "../schemas/profile.schema";

function ChangePasswordForm() {
  const t = useTranslations();

  const form = useAppForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    } as ChangePasswordFormValues,
    validators: {
      onChange: changePasswordSchema(t),
    },
    onSubmit: () => {
      toast.success("Password updated successfully");
      form.reset();
    },
  });

  const { FormTextField } = useFormFields<ChangePasswordFormValues>();

  const { isValid } = useStore(form.store, (state) => ({
    isValid: state.isValid,
  }));

  return (
    <form.AppForm>
      <form.Form className="flex flex-col gap-5 p-0">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <FormTextField
            name="currentPassword"
            type="password"
            label="Current password"
            placeholder="Enter current password"
          />
          <FormTextField
            name="newPassword"
            type="password"
            label="New password"
            placeholder="Enter new password"
          />
          <FormTextField
            name="confirmPassword"
            type="password"
            label="Confirm new password"
            placeholder="Confirm new password"
          />
        </div>

        <Typography
          as="p"
          variant="paragraph-xs"
          className="text-muted-foreground"
        >
          Your password must be at least 8 characters and include a combination
          of letters, numbers, and symbols.
        </Typography>

        <div className="flex justify-end pt-1">
          <Button type="submit" disabled={!isValid}>
            Update password
          </Button>
        </div>
      </form.Form>
    </form.AppForm>
  );
}

export { ChangePasswordForm };
