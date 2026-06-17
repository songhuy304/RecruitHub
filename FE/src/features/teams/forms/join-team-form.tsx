"use client";

import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  joinTeamSchema,
  type JoinTeamFormValues,
} from "../schemas/team.schema";
import { TeamSetupCard } from "../components/team-setup-card";

interface JoinTeamFormProps {
  onCancel: () => void;
  onSubmit?: (values: JoinTeamFormValues) => void;
  isPending?: boolean;
}

function JoinTeamForm({
  onCancel,
  onSubmit,
  isPending = false,
}: JoinTeamFormProps) {
  const form = useAppForm({
    defaultValues: {
      inviteCode: "",
    } as JoinTeamFormValues,
    validators: {
      onSubmit: joinTeamSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit?.(value);
    },
  });

  const { FormTextField } = useFormFields<JoinTeamFormValues>();

  return (
    <TeamSetupCard>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Join team</CardTitle>
        <CardDescription>
          Enter the invite code shared by your team admin.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form.AppForm>
          <form.Form className="p-0">
            <FormTextField
              name="inviteCode"
              label="Invite code"
              placeholder="Enter invite code"
            />
          </form.Form>
        </form.AppForm>
      </CardContent>

      <CardFooter className="justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending}>
          Join team
        </Button>
      </CardFooter>
    </TeamSetupCard>
  );
}

export { JoinTeamForm };
