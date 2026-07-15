"use client";

import { PagePagination } from "@/components/pagination";
import { JobCard } from "@/features/job/components/job-card";
import { useGetJobs } from "@/features/job/hooks";
import { IGetJobs, IJob } from "@/features/job/types";
import { useFilterParams } from "@/hooks/use-filter-params";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { parseAsInteger } from "nuqs";

export function JobListContent() {
  const router = useRouter();
  const { params, setParams } = useFilterParams<IGetJobs>({
    parsers: {
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(10),
    },
  });

  const {
    data: jobsResponse,
    isPending,
    isFetching,
  } = useGetJobs({
    page: params.page,
    limit: params.perPage,
  });

  const jobs = jobsResponse?.data ?? [];
  const meta = jobsResponse?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const currentPage = meta?.currentPage ?? params.page;

  const handlePageChange = (page: number) => {
    void setParams({ page });
  };

  const handleEdit = (job: IJob) => {
    router.push(`/jobs/edit/${job.id}`);
  };

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className="bg-muted h-40 animate-pulse rounded-xl border" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-20">
      {jobs.length > 0 ? (
        <div
          className={cn(
            "grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4",
            isFetching && "opacity-60"
          )}
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onEdit={handleEdit} />
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground flex min-h-40 items-center justify-center text-sm">
          No jobs found.
        </div>
      )}

      <PagePagination
        className="mt-10"
        currentPage={currentPage}
        totalPages={totalPages}
        isDisabled={isFetching}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
