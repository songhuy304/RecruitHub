import { Option } from "@/components/forms/fields/select-field";
import { EEmploymentType, EJobLevel, EWorkLocationType } from "../enums";

export const employmentTypeOptions: Option[] = [
  {
    value: EEmploymentType.FULL_TIME,
    label: "Full-time",
  },
  {
    value: EEmploymentType.PART_TIME,
    label: "Part-time",
  },
  {
    value: EEmploymentType.CONTRACT,
    label: "Contract",
  },
];

export const levelOptions: Option[] = [
  {
    value: EJobLevel.INTERN,
    label: "Intern",
  },
  {
    value: EJobLevel.FRESHER,
    label: "Fresher",
  },
  {
    value: EJobLevel.JUNIOR,
    label: "Junior",
  },
  {
    value: EJobLevel.MIDDLE,
    label: "Middle",
  },
  {
    value: EJobLevel.SENIOR,
    label: "Senior",
  },
  {
    value: EJobLevel.LEAD,
    label: "Lead",
  },
];

export const workLocationTypeOptions: Option[] = [
  {
    value: EWorkLocationType.AT_OFFICE,
    label: "At Office",
  },
  {
    value: EWorkLocationType.REMOTE,
    label: "Remote",
  },
  {
    value: EWorkLocationType.HYBRID,
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
];
