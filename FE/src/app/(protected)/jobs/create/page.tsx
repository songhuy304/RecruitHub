import CreateJobPage from "@/features/job/page-create/page";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata("Create Job", "");

export default function Page() {
  return <CreateJobPage />;
}
