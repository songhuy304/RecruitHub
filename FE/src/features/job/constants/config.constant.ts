import { EJobStatus } from "../enums";

export const jobStatusConfig = {
  [EJobStatus.DRAFT]: {
    label: "Draft",
    dot: "bg-gray-400",
    color: "text-gray-400",
    badge: "bg-gray-400/10 text-gray-400",
  },
  [EJobStatus.OPEN]: {
    label: "Open",
    dot: "bg-green-500",
    color: "text-green-500",
    badge: "bg-green-300/10 text-green-500",
  },
  [EJobStatus.CLOSED]: {
    label: "Closed",
    dot: "bg-red-500",
    color: "text-red-500",
    badge: "bg-red-300/10 text-red-400",
  },
  [EJobStatus.ARCHIVED]: {
    label: "Archived",
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-600",
    color: "text-amber-500",
  },
};
