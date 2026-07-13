import { Option } from "@/components/forms/fields/select-field";
import {
  EmploymentType,
  JobLevel,
  JobStatus,
  WorkLocationType,
} from "@/features/job/types";

export const employmentTypeOptions: Option[] = [
  {
    value: EmploymentType.FULL_TIME,
    label: "Full-time",
  },
  {
    value: EmploymentType.PART_TIME,
    label: "Part-time",
  },
  {
    value: EmploymentType.CONTRACT,
    label: "Contract",
  },
  {
    value: EmploymentType.INTERN,
    label: "Intern",
  },
  {
    value: EmploymentType.FREELANCE,
    label: "Freelance",
  },
];

export const levelOptions: Option[] = [
  {
    value: JobLevel.INTERN,
    label: "Intern",
  },
  {
    value: JobLevel.FRESHER,
    label: "Fresher",
  },
  {
    value: JobLevel.JUNIOR,
    label: "Junior",
  },
  {
    value: JobLevel.MIDDLE,
    label: "Middle",
  },
  {
    value: JobLevel.SENIOR,
    label: "Senior",
  },
  {
    value: JobLevel.LEAD,
    label: "Lead",
  },
];

export const jobStatusConfig: Record<
  JobStatus,
  {
    label: string;
    color: string;
  }
> = {
  [JobStatus.DRAFT]: {
    label: "Draft",
    color: "bg-gray-400",
  },
  [JobStatus.OPEN]: {
    label: "Open",
    color: "bg-green-500",
  },
  [JobStatus.ON_HOLD]: {
    label: "On Hold",
    color: "bg-yellow-500",
  },
  [JobStatus.CLOSED]: {
    label: "Closed",
    color: "bg-red-500",
  },
  [JobStatus.ARCHIVED]: {
    label: "Archived",
    color: "bg-slate-500",
  },
};

export const workLocationTypeOptions: Option[] = [
  {
    value: WorkLocationType.AT_OFFICE,
    label: "At Office",
  },
  {
    value: WorkLocationType.REMOTE,
    label: "Remote",
  },
  {
    value: WorkLocationType.HYBRID,
    label: "Hybrid",
  },
];

export const currencyOptions: Option[] = [
  {
    value: "VND",
    label: "VND",
  },
  {
    value: "USD",
    label: "USD",
  },
  {
    value: "EUR",
    label: "EUR",
  },
];
