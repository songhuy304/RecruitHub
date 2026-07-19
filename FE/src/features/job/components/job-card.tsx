"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "@/components/ui/typography";
import { employmentTypeOptions } from "@/features/job/constants/job-options.constant";
import { IJob } from "@/features/job/types";
import {
  formatJobExpiresIn,
  formatJobUpdatedAt,
} from "@/features/job/utils/format-job-time";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { JobCardAvatarGroup } from "./job-card-avatar-group";
import { JobCardStatusBadge } from "./job-card-status-badge";
import { ILocation } from "@/services/common/types";

interface JobCardProps {
  job: IJob;
  className?: string;
  onPinToggle?: (job: IJob) => void;
  onEdit?: (job: IJob) => void;
  onDuplicate?: (job: IJob) => void;
  onArchive?: (job: IJob) => void;
  locations?: ILocation[];
}

function getEmploymentTypeLabel(employmentType: IJob["employmentType"]): string {
  const label = employmentTypeOptions.find(
    (option) => option.value === employmentType
  )?.label;

  return typeof label === "string" ? label : employmentType;
}

function getDepartmentLabel(departments: IJob["departments"]): string {
  if (!departments.length) return "-";

  return departments.join(", ");
}

function getNameLocation(location: IJob["location"], locations: ILocation[]): string {
  const locationObj = locations.find((loc) => loc.code === location);
  return locationObj ? locationObj.englishName : "-";
}

function MetaItem({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {children}
    </span>
  );
}

export function JobCard({
  job,
  className,
  onPinToggle,
  onEdit,
  onDuplicate,
  onArchive,
  locations = [],
}: JobCardProps) {
  const t = useTranslations("Jobs");
  const expiresInDays = formatJobExpiresIn(job.expiresAt);
  const hasStats = job.viewCount != null || job.applicantCount != null || !!expiresInDays;

  return (
    <Card
      className={cn(
        "hover:border-border/90 group cursor-pointer gap-3 py-4 shadow-xs transition-colors",
        className
      )}
    >
      <CardHeader className="px-4 pb-0">
        <JobCardStatusBadge status={job.status} />
        <CardAction>
          <div className="flex items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "text-muted-foreground hover:text-foreground h-7 w-7",
                job.isPinned && "text-primary"
              )}
              onClick={() => onPinToggle?.(job)}
              aria-label={job.isPinned ? t("card.unpin") : t("card.pin")}
            >
              <Icons.pin className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground h-7 w-7"
                  aria-label={t("card.actions")}
                >
                  <Icons.ellipsis className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {onEdit ? (
                  <DropdownMenuItem onClick={() => onEdit(job)}>
                    {t("card.edit")}
                  </DropdownMenuItem>
                ) : null}
                {onDuplicate ? (
                  <DropdownMenuItem onClick={() => onDuplicate(job)}>
                    {t("card.duplicate")}
                  </DropdownMenuItem>
                ) : null}
                {onArchive ? (
                  <DropdownMenuItem onClick={() => onArchive(job)}>
                    {t("card.archive")}
                  </DropdownMenuItem>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-2 px-4">
        <div className="min-w-0">
          <Link href={`/jobs/edit/${job.id}`}>
            <Typography variant="h5" className="line-clamp-2 font-semibold">
              {job.title}
            </Typography>
          </Link>
          <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
            <MetaItem icon={Icons.briefcase}>
              {getDepartmentLabel(job.departments)}
            </MetaItem>
            <span aria-hidden="true">·</span>
            <MetaItem icon={Icons.mapPin}>
              {getNameLocation(job.location, locations)}
            </MetaItem>
            <span aria-hidden="true">·</span>
            <MetaItem icon={Icons.building}>
              {getEmploymentTypeLabel(job.employmentType)}
            </MetaItem>
          </div>
        </div>

        {hasStats ? (
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {job.viewCount != null ? (
              <span className="inline-flex items-center gap-1.5">
                <Icons.eye className="h-4 w-4" />
                {t("card.views", { count: job.viewCount })}
              </span>
            ) : null}
            {job.applicantCount != null ? (
              <span className="inline-flex items-center gap-1.5">
                <Icons.teams className="h-4 w-4" />
                {t("card.applicants", { count: job.applicantCount })}
              </span>
            ) : null}
            {expiresInDays ? (
              <span className="inline-flex items-center gap-1.5">
                <Icons.calendar className="h-4 w-4" />
                {expiresInDays}d
              </span>
            ) : null}
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="justify-between px-4 pt-0">
        <JobCardAvatarGroup members={job.hiringTeam ?? []} className="shrink-0" />
        <span className="text-muted-foreground/70 shrink-0 text-[11px]">
          {t("card.updated", { time: formatJobUpdatedAt(job.updatedAt) })}
        </span>
      </CardFooter>
    </Card>
  );
}
