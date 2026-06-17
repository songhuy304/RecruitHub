import { TeamViewPage } from "@/features/teams/team-view";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "Teams",
  "Manage your teams and team settings.",
);

export default function TeamPage() {
  return <TeamViewPage />;
}
