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
import { Typography } from "@/components/ui/typography";

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
    <div>
      <Typography variant="h4">Join team</Typography>
      <Typography color="muted" variant="paragraph-sm" copy>
        Enter the invite code shared by your team admin.
      </Typography>

      <div className="p-0 mt-4 max-w-lg">
        <form.AppForm>
          <form.Form className="">
            <FormTextField
              name="inviteCode"
              label="Invite code"
              placeholder="Enter invite code"
            />
          </form.Form>
        </form.AppForm>
        <div className="justify-end gap-4 flex items-center mt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isPending}>
            Join team
          </Button>
        </div>
      </div>
    </div>
  );
}

export { JoinTeamForm };
