import PageContainer from "@/components/layout/page-container";
import { ListJobPage } from "@/features/job/page-list/page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("Jobs", "");

export default async function Page() {
  return (
    <PageContainer>
      <ListJobPage />
    </PageContainer>
  );
}
