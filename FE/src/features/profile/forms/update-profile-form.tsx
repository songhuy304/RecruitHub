"use client";

import { useStore } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { Typography } from "@/components/ui/typography";

import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "../schemas/profile.schema";
import { ProfileAvatarUpload } from "../components/profile-avatar-upload";

interface UpdateProfileFormProps {
  defaultValues: UpdateProfileFormValues;
}

function UpdateProfileForm({ defaultValues }: UpdateProfileFormProps) {
  const t = useTranslations();

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: updateProfileSchema(t),
    },
    onSubmit: () => {
      toast.success("Profile updated successfully");
    },
  });

  const { FormTextField } = useFormFields<UpdateProfileFormValues>();

  const { isDirty, isValid } = useStore(form.store, (state) => ({
    isDirty: state.isDirty,
    isValid: state.isValid,
  }));

  return (
    <form.AppForm>
      <form.Form className="flex flex-col gap-0 p-0">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <ProfileAvatarUpload
            avatarUrl={defaultValues.avatarUrl}
            fullName={defaultValues.fullName}
            onAvatarChange={(url) => form.setFieldValue("avatarUrl", url)}
          />

          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <FormTextField
              name="fullName"
              label="Full name"
              placeholder="Enter your full name"
            />

            <div className="flex flex-col gap-2">
              <FormTextField
                name="email"
                label="Email address"
                placeholder="Enter your email"
                disabled
              />
              <Typography
                as="p"
                variant="paragraph-xs"
                className="text-muted-foreground"
              >
                Email address cannot be changed
              </Typography>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit" disabled={!isDirty || !isValid}>
            {t("Common.save-changes")}
          </Button>
        </div>
      </form.Form>
    </form.AppForm>
  );
}

export { UpdateProfileForm };
