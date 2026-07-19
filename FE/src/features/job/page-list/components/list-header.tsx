"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { JOB_PATHS } from "@/config/paths.config";
import { useGetJobStatistics } from "@/features/job/hooks/use-get-job-statistics";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { EJobStatus } from "../../enums";
import { jobStatusConfig } from "../../constants";
import { useUser } from "@/hooks/useUser";
import { Can } from "@/components/ui/can";
import { ETEAM_ROLE } from "@/enums";
import { useFilterParams } from "@/hooks/use-filter-params";
import { jobSearchParsers } from "@/features/job/page-list/job-search-params";
import { Heading } from "@/components/ui/heading";

function JobStatItem({
  label,
  value,
  isLoading,
  status,
}: {
  label: string;
  value: number;
  isLoading?: boolean;
  status?: EJobStatus | undefined;
}) {
  const config = status ? jobStatusConfig[status] : undefined;
  return (
    <div className="flex min-w-14 flex-col items-center gap-1 text-center">
      <div className="flex items-center gap-1.5">
        {config && <span className={cn("size-2 rounded-full", config?.dot)} />}
        <span className="text-muted-foreground text-[10px] font-medium tracking-[0.12em]">
          {label}
        </span>
      </div>

      {isLoading ? (
        <span className="bg-muted h-7 w-9 animate-pulse rounded" />
      ) : (
        <span className="text-xl font-semibold tabular-nums">{value}</span>
      )}
    </div>
  );
}

export function JobListHeader({ className }: { className?: string }) {
  const t = useTranslations("Jobs");

  const { total, open, onHold, closed, isPending } = useGetJobStatistics();
  const { hasCurrentTeamRole } = useUser();

  const stats = [
    { label: t("stats.total"), value: total, status: undefined },
    { label: t("stats.open"), value: open, status: EJobStatus.OPEN },
    { label: t("stats.archived"), value: onHold, status: EJobStatus.ARCHIVED },
    { label: t("stats.draft"), value: closed, status: EJobStatus.DRAFT },
    { label: t("stats.closed"), value: closed, status: EJobStatus.CLOSED },
  ] as const;

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-6", className)}>
      <div>
        <Heading
          title="Jobs"
          description="Manage and track all job postings in your organization"
        />
      </div>
      <div className="flex flex-wrap items-center gap-6 sm:gap-8">
        <div className="flex items-center gap-6 sm:gap-6">
          {stats.map((stat) => (
            <JobStatItem
              key={stat.label}
              status={stat.status}
              label={stat.label}
              value={stat.value}
              isLoading={isPending}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Can can={hasCurrentTeamRole([ETEAM_ROLE.ADMIN, ETEAM_ROLE.OWNER])}>
            <Button asChild>
              <Link href={JOB_PATHS.CREATE_JOB}>
                <Icons.add className="h-4 w-4" />
                {t("create-job")}
              </Link>
            </Button>
          </Can>
          <Button type="button" variant="outline">
            <span>Filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
