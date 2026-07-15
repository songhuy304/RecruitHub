"use client";

import PageContainer from "@/components/layout/page-container";
import { CreateJobForm } from "@/features/job/form";
import { CreateJobHeader } from "./create-job-header";
import { useCreateJob } from "../../hooks";
import { CreateJobFormValues } from "../../schemas";

export default function CreateJobPage() {
  const { isPending, createInitValues, handleCreateJob } = useCreateJob();

  const handleSubmit = async (values: CreateJobFormValues, form: any) => {
    await handleCreateJob(values, "publish");
  };

  return (
    <PageContainer>
      <div className="flex-1 space-y-4">
        <CreateJobHeader
          onSaveDraft={() => {}}
          onPublish={() => {}}
          isSubmitting={isPending}
        />

        <CreateJobForm onSubmit={handleSubmit} defaultValues={createInitValues} />
      </div>
    </PageContainer>
  );
}
