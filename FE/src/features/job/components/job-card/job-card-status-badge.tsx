import { Badge } from "@/components/ui/badge";
import { jobStatusConfig } from "@/features/job/constants/job-options.constant";
import { EJobStatus } from "@/features/job/enums";
import { cn } from "@/lib/utils";

const statusStyles: Record<
  EJobStatus,
  {
    badge: string;
    dot: string;
  }
> = {
  [EJobStatus.DRAFT]: {
    badge: "bg-gray-400/10 text-gray-400",
    dot: "bg-gray-600",
  },
  [EJobStatus.OPEN]: {
    badge: "bg-green-300/10 text-green-500",
    dot: "bg-green-600",
  },
  [EJobStatus.CLOSED]: {
    badge: "bg-red-300/10 text-red-400",
    dot: "bg-red-500",
  },
  [EJobStatus.ARCHIVED]: {
    badge: "bg-slate-300/10 text-slate-400",
    dot: "bg-slate-600",
  },
};

interface JobCardStatusBadgeProps {
  status: EJobStatus;
  className?: string;
}

export function JobCardStatusBadge({ status, className }: JobCardStatusBadgeProps) {
  const config = jobStatusConfig[status];
  const styles = statusStyles[status];

  return (
    <Badge
      className={cn(
        "gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium uppercase",
        styles.badge,
        className
      )}
    >
      <span className={cn("size-2 rounded-full", styles.dot)} />
      {config.label}
    </Badge>
  );
}
