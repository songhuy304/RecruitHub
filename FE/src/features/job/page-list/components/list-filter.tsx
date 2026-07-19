import { FormFilter } from "@/components/forms/form-filter";
import { Icons } from "@/components/icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetLocation } from "@/hooks/options";
import { employmentTypeOptions, levelOptions } from "../../constants";
import { JobSearchParams, jobSearchParsers } from "../job-search-params";
import { EJobStatus } from "@/features/job/enums";
import { SetValues } from "nuqs";

interface JobListFilterProps {
  params: JobSearchParams;
  handleSubmit: (values: JobSearchParams) => void;
  handleReset: () => void;
  setParams: SetValues<typeof jobSearchParsers>;
}

const JobListFilter = ({
  params,
  handleSubmit,
  handleReset,
  setParams,
}: JobListFilterProps) => {
  const { options } = useGetLocation();

  return (
    <div className="space-y-4">
      <FormFilter<JobSearchParams>
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
          {
            type: "dateRange",
            name: "createdAt",
            placeholder: "Select created date",
          },
        ]}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />

      <Tabs
        defaultValue={params.status || EJobStatus.OPEN}
        orientation="horizontal"
        onValueChange={(value) => setParams({ status: value as EJobStatus })}
      >
        <TabsList variant="line">
          <TabsTrigger value={EJobStatus.OPEN}>Open</TabsTrigger>
          <TabsTrigger value={EJobStatus.ARCHIVED}>Archived</TabsTrigger>
          <TabsTrigger value={EJobStatus.DRAFT}>Draft</TabsTrigger>
          <TabsTrigger value={EJobStatus.CLOSED}>Closed</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export { JobListFilter };
