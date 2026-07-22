"use client";

import PageContainer from "@/components/layout/page-container";
import { CreateJobForm } from "@/features/job/form";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { CreateJobHeader } from "@/features/job/components";
import { JobSubmitAction } from "@/features/job/types";
import { useCreateJob, useEditJob, useGetJobDetails } from "@/features/job/hooks";
import { CreateJobFormValues } from "@/features/job/schemas";
import { mutationJobMapper } from "@/features/job/mappers";
import { useUser } from "@/hooks/useUser";
import { ETEAM_ROLE } from "@/enums";

interface EditJobPageProps {
  id: string;
}

export default function EditJobPage({ id }: EditJobPageProps) {
  const t = useTranslations();
  const { hasCurrentTeamRole } = useUser();
  const { isPending: isGetJobDetailsPending, data } = useGetJobDetails({
    id: parseInt(id),
  });
  const { handleEditJob, isPending: isEditJobPending } = useEditJob(parseInt(id));

  const submitActionRef = useRef<JobSubmitAction>("publish");

  const handleSubmit = async (values: CreateJobFormValues) => {
    await handleEditJob(values, submitActionRef.current);
  };

  const defaultValues = data?.data
    ? mutationJobMapper.toFormValues(data?.data)
    : undefined;

  return (
    <PageContainer
      access={hasCurrentTeamRole([ETEAM_ROLE.ADMIN, ETEAM_ROLE.OWNER])}
      isLoading={isGetJobDetailsPending}
    >
      <div className="flex-1 space-y-4">
        <CreateJobHeader
          onSaveDraft={() => {
            submitActionRef.current = "save";
          }}
          title={t("Jobs.edit-title")}
          onPublish={() => {
            submitActionRef.current = "publish";
          }}
          isSubmitting={isEditJobPending}
          submittingAction={isEditJobPending ? submitActionRef.current : null}
        />

        <CreateJobForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </PageContainer>
  );
}
