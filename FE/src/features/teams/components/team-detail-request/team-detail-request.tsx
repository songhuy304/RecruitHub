'use client';

import { TeamRequestTable } from "./team-request-table";

interface TeamDetailRequestProps {
  teamId: number;
}

function TeamDetailRequest({ teamId }: TeamDetailRequestProps) {
  return <TeamRequestTable teamId={teamId ?? 0} />;
}

export { TeamDetailRequest };
