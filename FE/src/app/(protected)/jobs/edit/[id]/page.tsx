import EditJobPage from "@/features/job/page-edit/page";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata("Edit Job", "");

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <EditJobPage id={id} />;
}
