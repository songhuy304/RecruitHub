"use client";

import { Icons } from "@/components/icons";
import { PagePagination } from "@/components/pagination";
import { Empty } from "@/components/ui/empty";
import { JOB_PATHS } from "@/config/paths.config";
import { JobCard } from "@/features/job/components/job-card";
import { useGetJobs } from "@/features/job/hooks";
import { IJob } from "@/features/job/types";
import { useGetLocation } from "@/hooks/options";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { SetValues } from "nuqs";
import { JobSearchParams, jobSearchParsers } from "../job-search-params";

interface JobListContentProps {
  params: JobSearchParams;
  setParams: SetValues<typeof jobSearchParsers>;
}

export function JobListContent({ params, setParams }: JobListContentProps) {
  const router = useRouter();
  const { data: locations = [] } = useGetLocation();

  const {
    data: jobsResponse,
    isPending,
    isFetching,
    isPlaceholderData,
  } = useGetJobs({
    page: params.page,
    limit: params.limit,
    status: params.status ?? undefined,
    jobType: params.jobType ?? undefined,
    location: params.location ?? undefined,
    q: params.q ?? undefined,
    level: params.level ?? undefined,
  });

  const jobs = jobsResponse?.data ?? [];
  const meta = jobsResponse?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const currentPage = meta?.currentPage ?? params.page;
  // keepPreviousData keeps prior (often empty) list while filters change — treat that as loading
  const isLoading = isPending || (isFetching && isPlaceholderData);

  const handlePageChange = (page: number) => {
    void setParams({ page });
  };

  const handlePageSizeChange = (limit: number) => {
    void setParams({ limit, page: 1 });
  };

  const handleEdit = (job: IJob) => {
    router.push(`/jobs/edit/${job.id}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="bg-muted h-40 animate-pulse rounded-xl border" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {jobs.length > 0 ? (
        <div
          className={cn(
            "grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4",
            isFetching && "opacity-60"
          )}
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onEdit={handleEdit} locations={locations} />
          ))}
        </div>
      ) : (
        <Empty
          title="No jobs found"
          description="Create your first job to start attracting great candidates"
          className="py-10"
        />
      )}

      <PagePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={meta?.totalItems ?? 0}
        pageSize={params.limit}
        isDisabled={isFetching}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
