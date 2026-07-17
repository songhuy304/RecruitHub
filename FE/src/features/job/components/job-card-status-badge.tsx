import { Badge } from "@/components/ui/badge";
import { jobStatusConfig } from "@/features/job/constants";
import { EJobStatus } from "@/features/job/enums";
import { cn } from "@/lib/utils";

interface JobCardStatusBadgeProps {
  status: EJobStatus;
  className?: string;
}

export function JobCardStatusBadge({ status, className }: JobCardStatusBadgeProps) {
  const config = jobStatusConfig[status];

  return (
    <Badge
      className={cn(
        "gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium uppercase",
        config.badge,
        className
      )}
    >
      <span className={cn("size-2 rounded-full", config.dot)} />
      {config.label}
    </Badge>
  );
}
