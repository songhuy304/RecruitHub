"use client";

import PageContainer from "@/components/layout/page-container";
import { CreateJobHeader } from "@/features/job/components";
import { CreateJobForm } from "@/features/job/form";
import { useCreateJob } from "@/features/job/hooks";
import { CreateJobFormValues } from "@/features/job/schemas";
import { JobSubmitAction } from "@/features/job/types";
import { useRef } from "react";

export default function CreateJobPage() {
  const { isPending, createInitValues, handleCreateJob } = useCreateJob();
  const submitActionRef = useRef<JobSubmitAction>("publish");

  const handleSubmit = async (values: CreateJobFormValues) => {
    await handleCreateJob(values, submitActionRef.current);
  };

  return (
    <PageContainer>
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

        <CreateJobForm onSubmit={handleSubmit} defaultValues={createInitValues} />
      </div>
    </PageContainer>
  );
}
