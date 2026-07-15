"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { JOB_PATHS } from "@/config/paths.config";
import { useGetJobStatistics } from "@/features/job/hooks/use-get-job-statistics";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";

function JobStatItem({
  label,
  value,
  isLoading,
}: {
  label: string;
  value: number;
  isLoading?: boolean;
}) {
  return (
    <div className="flex min-w-14 flex-col items-center gap-1 text-center">
      <span className="text-muted-foreground text-[10px] font-medium tracking-[0.12em] uppercase">
        {label}
      </span>
      {isLoading ? (
        <span className="bg-muted h-7 w-9 animate-pulse rounded" />
      ) : (
        <span className="text-2xl leading-none font-semibold tracking-tight tabular-nums">
          {value}
        </span>
      )}
    </div>
  );
}

export function JobListHeader({ className }: { className?: string }) {
  const t = useTranslations("Jobs");
  const { total, open, onHold, closed, isPending } = useGetJobStatistics();

  const stats = [
    { label: t("stats.total"), value: total },
    { label: t("stats.open"), value: open },
    { label: t("stats.on-hold"), value: onHold },
    { label: t("stats.closed"), value: closed },
  ] as const;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-6 px-5 sm:gap-8 sm:px-6",
        className
      )}
    >
      <div className="flex items-center gap-6 sm:gap-10">
        {stats.map((stat) => (
          <JobStatItem
            key={stat.label}
            label={stat.label}
            value={stat.value}
            isLoading={isPending}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button asChild>
          <Link href={JOB_PATHS.CREATE_JOB}>
            <Icons.add className="h-4 w-4" />
            {t("create-job")}
          </Link>
        </Button>
        <Button type="button" variant="outline" size="icon" className="size-9">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">{t("more-actions")}</span>
        </Button>
      </div>
    </div>
  );
}
