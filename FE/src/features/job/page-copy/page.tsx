"use client";

import PageContainer from "@/components/layout/page-container";
import { ETEAM_ROLE } from "@/enums";
import { CreateJobHeader } from "@/features/job/components";
import { CreateJobForm } from "@/features/job/form";
import { useCreateJob, useGetJobDetails } from "@/features/job/hooks";
import { mutationJobMapper } from "@/features/job/mappers";
import { CreateJobFormValues } from "@/features/job/schemas";
import { JobSubmitAction } from "@/features/job/types";
import { useUser } from "@/hooks/useUser";
import { useRef } from "react";

interface CopyJobPageProps {
  id: string;
}
export default function CopyJobPage({ id }: CopyJobPageProps) {
  const { hasCurrentTeamRole } = useUser();
  const { isPending: isGetJobDetailsPending, data } = useGetJobDetails({
    id: parseInt(id),
  });
  const { isPending, handleCreateJob } = useCreateJob();
  const submitActionRef = useRef<JobSubmitAction>("publish");

  const handleSubmit = async (values: CreateJobFormValues) => {
    await handleCreateJob(values, submitActionRef.current);
  };

  const defaultValues = data?.data
    ? mutationJobMapper.toFormValues(data?.data)
    : undefined;

  return (
    <PageContainer
      isLoading={isGetJobDetailsPending}
      access={hasCurrentTeamRole([ETEAM_ROLE.ADMIN, ETEAM_ROLE.OWNER])}
    >
      <div className="flex-1 space-y-4">
        <CreateJobHeader
          onSaveDraft={() => {
            submitActionRef.current = "save";
          }}
          onPublish={() => {
            submitActionRef.current = "publish";
          }}
          isSubmitting={isPending}
          submittingAction={isPending ? submitActionRef.current : null}
        />

        <CreateJobForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </PageContainer>
  );
}
