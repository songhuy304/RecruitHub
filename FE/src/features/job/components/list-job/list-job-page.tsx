"use client";

import { JobListContent } from "@/features/job/components/list-job/job-list-content";
import { JobListHeader } from "@/features/job/components/list-job/job-list-header";

export function ListJobPage() {
  return (
    <div className="space-y-6">
      <JobListHeader />
      <JobListContent />
    </div>
  );
}
