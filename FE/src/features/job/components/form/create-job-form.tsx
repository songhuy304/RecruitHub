"use client";

import { useRef } from "react";
import { useAppForm } from "@/components/ui/tanstack-form";
import type { JobFormValues } from "../../schemas/job.schema";
import type { JobSubmitAction } from "./types";
import { CreateJobFormHeader } from "@/features/job/components/form/create-job-form-header";
import { JobBasicInfoCard } from "@/features/job/components/form/job-basic-info-card";
import { JobDescriptionCard } from "@/features/job/components/form/job-description-card";
import { JobPublishOptionsCard } from "@/features/job/components/form/job-publish-options-card";
import { JobHiringTeamCard } from "@/features/job/components/form/job-hiring-team-card";
import { JobPreviewCard } from "@/features/job/components/form/job-preview-card";

export type { JobSubmitAction };

interface CreateJobFormProps {
  onSubmit: (values: JobFormValues, action: JobSubmitAction) => void | Promise<void>;
  isSubmitting?: boolean;
  submittingAction?: JobSubmitAction | null;
  defaultValues?: Partial<JobFormValues>;
}

const EMPTY_VALUES: JobFormValues = {
  title: "",
  departments: "",
  location: "",
  employmentType: "",
  level: "",
  status: "DRAFT",
  salaryMin: undefined,
  salaryMax: undefined,
  salaryCurrency: "VND",
  currency: "VND",
  workLocationType: "",
  officeAddress: "",
  skills: [],
  isNegotiable: false,
  opensAt: undefined,
  expiresAt: undefined,
  description: "",
  requirements: "",
  benefits: "",
  published: false,
  pinned: false,
};

export default function CreateJobForm({
  onSubmit,
  isSubmitting = false,
  submittingAction = null,
  defaultValues,
}: CreateJobFormProps) {
  const actionTypeRef = useRef<JobSubmitAction>("publish");

  const form = useAppForm({
    defaultValues: {
      ...EMPTY_VALUES,
      ...defaultValues,
    } as JobFormValues,
    onSubmit: async ({ value }) => {
      await onSubmit(value, actionTypeRef.current);
    },
  });

  const triggerSubmit = (type: JobSubmitAction) => {
    if (isSubmitting) return;
    actionTypeRef.current = type;
    form.handleSubmit();
  };

  return (
    <div className="space-y-6">
      <CreateJobFormHeader
        onSaveDraft={() => triggerSubmit("draft")}
        onPublish={() => triggerSubmit("publish")}
        isSubmitting={isSubmitting}
        submittingAction={submittingAction}
      />

      <form.AppForm>
        <form.Form id="job-form" className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 space-y-6 lg:col-span-9">
            <JobBasicInfoCard />
            <JobDescriptionCard />
          </div>

          <div className="space-y-6 lg:col-span-3">
            <JobPublishOptionsCard />
            <JobHiringTeamCard />
            <JobPreviewCard />
          </div>
        </form.Form>
      </form.AppForm>
    </div>
  );
}
