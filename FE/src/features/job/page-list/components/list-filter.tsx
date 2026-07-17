import { FormFilter } from "@/components/forms/form-filter";
import { useFilterParams } from "@/hooks/use-filter-params";
import { IGetJobs, IJobFilterFormValues } from "../../types";
import { Icons } from "@/components/icons";
import { employmentTypeOptions, levelOptions } from "../../constants";
import { useGetLocation } from "@/hooks/options";
import { Card, CardContent } from "@/components/ui/card";

interface JobListFilterProps {
  params: IJobFilterFormValues;
  handleSubmit: (values: IJobFilterFormValues) => void;
  handleReset: () => void;
}

const JobListFilter = ({ params, handleSubmit, handleReset }: JobListFilterProps) => {
  const { options } = useGetLocation();

  return (
    <Card>
      <CardContent>
        <FormFilter<IJobFilterFormValues>
          defaultValues={params}
          fields={[
            {
              type: "text",
              name: "q",
              placeholder: "Search jobs by title, keywords...",
              leftIcon: <Icons.search className="size-4" />,
              className: "w-full",
            },
            {
              type: "multiSelect",
              name: "jobType",
              multiple: true,
              placeholder: "Select job type",
              options: employmentTypeOptions,
            },
            {
              type: "multiSelect",
              name: "level",
              multiple: true,
              placeholder: "Select level",
              options: levelOptions,
            },
            {
              type: "multiSelect",
              multiple: true,
              name: "location",
              placeholder: "Select location",
              options: options,
            },
          ]}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
      </CardContent>
    </Card>
  );
};

export { JobListFilter };
