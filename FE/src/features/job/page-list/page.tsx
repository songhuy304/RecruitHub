"use client";

import { JobListContent } from "@/features/job/page-list/components/list-content";
import { JobListFilter } from "@/features/job/page-list/components/list-filter";
import { JobListHeader } from "@/features/job/page-list/components/list-header";
import { useFilterParams } from "@/hooks/use-filter-params";
import { parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs";

export function ListJobPage() {
  const { params, handleSubmit, handleReset } = useFilterParams({
    parsers: {
      page: parseAsInteger.withDefault(1),
      limit: parseAsInteger.withDefault(10),
      q: parseAsString,
      jobType: parseAsArrayOf(parseAsString),
      level: parseAsArrayOf(parseAsString),
      location: parseAsArrayOf(parseAsString),
      status: parseAsString,
      sortBy: parseAsString,
      sortOrder: parseAsString,
      createdFrom: parseAsString,
      createdTo: parseAsString,
    },
  });
  console.log("🚀 ~ ListJobPage ~ params:", params);

  return (
    <div className="space-y-6">
      <JobListFilter
        params={params}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
      <JobListHeader />
      <JobListContent params={params} />
    </div>
  );
}
