"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { TeamSetupCard } from "../components/team-setup-card";
import {
  createTeamSchema,
  type CreateTeamFormValues,
} from "../schemas/team.schema";

interface CreateTeamFormProps {
  onCancel: () => void;
  onSubmit?: (values: CreateTeamFormValues) => void;
  isPending?: boolean;
}

function CreateTeamForm({
  onCancel,
  onSubmit,
  isPending = false,
}: CreateTeamFormProps) {
  const form = useAppForm({
    defaultValues: {
      name: "",
      slug: "",
      logoUrl: [] as File[],
    } as CreateTeamFormValues,
    validators: {
      onSubmit: createTeamSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit?.(value);
    },
  });

  const { FormTextField, FormFileUploadField } =
    useFormFields<CreateTeamFormValues>();

  return (
    <form.AppForm>
      <form.Form className="p-0">
        <TeamSetupCard>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Create team</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            <FormFileUploadField
              name="logoUrl"
              label="Logo"
              className="m-h-24"
              description="Recommended size 1:1, up to 10MB."
              maxSize={10 * 1024 * 1024}
              maxFiles={1}
            />

            <FormTextField
              name="name"
              label="Name"
              placeholder="Enter your team name"
            />
            <FormTextField
              name="slug"
              label="Slug"
              placeholder="Enter team slug"
            />
          </CardContent>

          <CardFooter className="justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isPending}>
              Create team
            </Button>
          </CardFooter>
        </TeamSetupCard>
      </form.Form>
    </form.AppForm>
  );
}

export { CreateTeamForm };
