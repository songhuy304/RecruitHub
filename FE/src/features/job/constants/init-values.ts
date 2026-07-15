import { ECurrency, EEmploymentType, EWorkLocationType } from "../enums";
import { CreateJobFormValues } from "../schemas";

export const CreateInitValues: Partial<CreateJobFormValues> = {
  workLocationType: EWorkLocationType.AT_OFFICE,
  currency: ECurrency.USD,
  employmentType: EEmploymentType.FULL_TIME,
  openedAt: new Date(),
};
