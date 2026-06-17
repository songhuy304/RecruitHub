"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AccountChooserCard, type TeamSetupView } from "./account-chooser-card";
import { CreateTeamForm } from "../forms/create-team-form";
import { JoinTeamForm } from "../forms/join-team-form";
import type {
  CreateTeamFormValues,
  JoinTeamFormValues,
} from "../schemas/team.schema";

function TeamSetupFlow() {
  const router = useRouter();
  const [view, setView] = useState<TeamSetupView>("choose");
  const [isPending, setIsPending] = useState(false);

  const handlePersonalAccount = () => {
    router.push("/dashboard/overview");
  };

  const handleCreateTeam = async (values: CreateTeamFormValues) => {
    setIsPending(true);
    try {
      // TODO: connect to team create API
      toast.success(`Team "${values.name}" created`);
      setView("choose");
    } catch {
      toast.error("Failed to create team");
    } finally {
      setIsPending(false);
    }
  };

  const handleJoinTeam = async (values: JoinTeamFormValues) => {
    setIsPending(true);
    try {
      // TODO: connect to team join API
      toast.success(`Joined team with code ${values.inviteCode}`);
      setView("choose");
    } catch {
      toast.error("Failed to join team");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex">
      {view === "choose" && (
        <AccountChooserCard
          onSelectView={setView}
          onPersonalAccount={handlePersonalAccount}
        />
      )}

      {view === "create" && (
        <CreateTeamForm
          onCancel={() => setView("choose")}
          onSubmit={handleCreateTeam}
          isPending={isPending}
        />
      )}

      {view === "join" && (
        <JoinTeamForm
          onCancel={() => setView("choose")}
          onSubmit={handleJoinTeam}
          isPending={isPending}
        />
      )}
    </div>
  );
}

export { TeamSetupFlow };
