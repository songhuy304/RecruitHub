import PageContainer from "@/components/layout/page-container";
import { ListJobPage } from "@/features/job/components/list-job";
import { createMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

export const metadata = createMetadata("Jobs", "");

export default async function Page() {
  const t = await getTranslations("Jobs");

  return (
    <PageContainer>
      <ListJobPage />
    </PageContainer>
  );
}
