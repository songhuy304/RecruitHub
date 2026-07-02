"use client";

import { Button } from "@/components/ui/button";
import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { Typography } from "@/components/ui/typography";
import {
  joinTeamSchema,
  type JoinTeamFormValues,
} from "../schemas/team.schema";
import { useTranslations } from "next-intl";
import { Icons } from "@/components/icons";

interface JoinTeamFormProps {
  onCancel: () => void;
  onSubmit?: (values: JoinTeamFormValues, form: any) => void;
  isPending?: boolean;
}

function JoinTeamForm({
  onCancel,
  onSubmit,
  isPending = false,
}: JoinTeamFormProps) {
  const t = useTranslations();
  const form = useAppForm({
    defaultValues: {
      inviteCode: "",
    } as JoinTeamFormValues,
    validators: {
      onSubmit: joinTeamSchema(t),
    },
    onSubmit: ({ value }) => {
      onSubmit?.(value, form);
    },
  });

  const { FormTextField } = useFormFields<JoinTeamFormValues>();

  return (
    <form.AppForm>
      <form.Form className="p-0 mt-4 max-w-lg">
        <Typography variant="h4">{t("Teams.JoinTeam.title")}</Typography>
        <Typography color="muted" variant="paragraph-sm">
          {t("Teams.JoinTeam.description")}
        </Typography>

        <div className="mt-4">
          <FormTextField
            name="inviteCode"
            label={t("field.invite-code.label")}
            placeholder={t("field.invite-code.placeholder")}
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            {t("Common.cancel")}
          </Button>
          <Button type="submit" isLoading={isPending}>
            {t("Common.submit")}
          </Button>
        </div>
      </form.Form>
    </form.AppForm>
  );
}

export { JoinTeamForm };
