import CopyJobPage from "@/features/job/page-copy/page";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata("Copy Job", "");

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <CopyJobPage id={id} />;
}
