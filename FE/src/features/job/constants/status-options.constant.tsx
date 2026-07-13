import { Option } from "@/components/forms/fields/select-field";
import { jobStatusConfig } from "@/features/job/constants/job-options.constant";

export const statusOptions: Option[] = Object.entries(jobStatusConfig).map(
  ([value, config]) => ({
    value,
    label: (
      <div className="flex items-center gap-2">
        <div className={`size-2 rounded-full ${config.color}`} />
        <span>{config.label}</span>
      </div>
    ),
  })
);
