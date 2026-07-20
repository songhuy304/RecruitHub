"use client";

import { Empty } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { JobCard } from "@/features/job/components";
import { IJob } from "@/features/job/types";
import { cn } from "@/lib/utils";
import { ILocation } from "@/services/common/types";

interface JobListProps {
  jobs: IJob[];
  locations: ILocation[];
  isFetching?: boolean;
  onEdit?: (job: IJob) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  loading?: boolean;
}

export function JobList({
  jobs,
  locations,
  loading = false,
  isFetching,
  onEdit,
  emptyTitle = "No jobs found",
  emptyDescription = "Create your first job to start attracting great candidates",
  className,
}: JobListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="rounded-xl border bg-background p-4 space-y-4">
            <Skeleton className="h-10 w-10 rounded-full" />

            <Skeleton className="h-5 w-3/4" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return <Empty title={emptyTitle} description={emptyDescription} className="py-10" />;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4",
        isFetching && "opacity-60",
        className
      )}
    >
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} locations={locations} onEdit={onEdit} />
      ))}
    </div>
  );
}
