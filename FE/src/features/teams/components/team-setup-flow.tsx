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
import { AnimatePresence, motion } from "motion/react";

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

  const groups: Record<TeamSetupView, React.ReactNode> = {
    choose: (
      <AccountChooserCard
        onSelectView={setView}
        onPersonalAccount={handlePersonalAccount}
      />
    ),
    create: (
      <CreateTeamForm
        onCancel={() => setView("choose")}
        onSubmit={handleCreateTeam}
        isPending={isPending}
      />
    ),
    join: (
      <JoinTeamForm
        onCancel={() => setView("choose")}
        onSubmit={handleJoinTeam}
        isPending={isPending}
      />
    ),
  };

  const page = groups[view];

  return (
    <div className="flex">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={view}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="flex flex-1"
        >
          {page}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export { TeamSetupFlow };
