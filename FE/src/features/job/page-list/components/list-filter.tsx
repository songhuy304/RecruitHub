import { FormFilter } from "@/components/forms/form-filter";
import { Icons } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetLocation } from "@/hooks/options";
import { employmentTypeOptions, levelOptions } from "../../constants";
import { JobSearchParams, jobSearchParsers } from "../job-search-params";
import { EJobStatus } from "@/features/job/enums";
import { SetValues } from "nuqs";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
  const { options } = useGetLocation();

  return (
    <div className="space-y-4">
      <FormFilter<JobSearchParams>
        defaultValues={params}
        fields={[
          {
            type: "text",
            name: "q",
            placeholder: t("field.search.placeholder"),
            leftIcon: <Icons.search className="size-4" />,
            className: "w-full",
          },
          {
            type: "multiSelect",
            name: "jobType",
            multiple: true,
            placeholder: t("field.employment-type.placeholder"),
            options: employmentTypeOptions,
          },
          {
            type: "multiSelect",
            name: "level",
            multiple: true,
            placeholder: t("field.level.placeholder"),
            options: levelOptions,
          },
          {
            type: "multiSelect",
            multiple: true,
            name: "location",
            placeholder: t("field.location.placeholder"),
            options: options,
          },
          {
            type: "dateRange",
            name: "createdAt",
            placeholder: t("field.createdDate.placeholder"),
          },
        ]}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />

      <Tabs
        variant="underline"
        defaultValue={params.status || EJobStatus.OPEN}
        onValueChange={(value) => setParams({ status: value as EJobStatus })}
      >
        <TabsList className="w-full">
          <TabsTrigger value={EJobStatus.OPEN}>{t("Jobs.stats.open")}</TabsTrigger>
          <TabsTrigger value={EJobStatus.ARCHIVED}>
            {t("Jobs.stats.archived")}
          </TabsTrigger>
          <TabsTrigger value={EJobStatus.DRAFT}>{t("Jobs.stats.draft")}</TabsTrigger>
          <TabsTrigger value={EJobStatus.CLOSED}>{t("Jobs.stats.closed")}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export { JobListFilter };
