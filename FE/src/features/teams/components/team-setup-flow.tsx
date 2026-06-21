"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { TeamSidebar } from "./team-sidebar";
import { TeamMainPanel } from "./team-main-panel";
import { CreateTeamForm } from "../forms/create-team-form";
import { JoinTeamForm } from "../forms/join-team-form";
import type {
  CreateTeamFormValues,
  JoinTeamFormValues,
} from "../schemas/team.schema";
import { useCreateTeam, useGetInfoTeam } from "../hooks";

type TeamSetupView = "overview" | "create" | "join";

function TeamSetupFlow() {
  const router = useRouter();
  useGetInfoTeam();
  const { mutateAsync: createTeam, isPending: isCreateTeamPending } =
    useCreateTeam();
  const [view, setView] = useState<TeamSetupView>("overview");
  const [isPending, setIsPending] = useState(false);

  const handlePersonalAccount = () => {
    router.push("/dashboard/overview");
  };

  const handleCreateTeam = async (values: CreateTeamFormValues, form: any) => {
    try {
      await createTeam({
        logoUrl: values.logoUrl || null,
        name: values.name,
        slug: values.slug,
      });
      form.reset();
      toast.success(`Team "${values.name}" created`);
      setView("overview");
    } catch {
      toast.error("Failed to create team");
      throw new Error("Failed to create team");
    }
  };

  const handleJoinTeam = async (values: JoinTeamFormValues) => {
    setIsPending(true);
    try {
      // TODO: connect to team join API
      toast.success(`Joined team with code ${values.inviteCode}`);
      setView("overview");
    } catch {
      toast.error("Failed to join team");
    } finally {
      setIsPending(false);
    }
  };

  const mainContent =
    view === "create" ? (
      <div className="flex flex-1 justify-center">
        <CreateTeamForm
          onCancel={() => setView("overview")}
          onSubmit={handleCreateTeam}
          isPending={isCreateTeamPending}
        />
      </div>
    ) : view === "join" ? (
      <div className="flex flex-1 justify-center">
        <JoinTeamForm
          onCancel={() => setView("overview")}
          onSubmit={handleJoinTeam}
          isPending={isPending}
        />
      </div>
    ) : (
      <TeamMainPanel />
    );

  return (
    <Card className="gap-0 py-0 md:min-h-[670px]">
      <div className="flex flex-col divide-y lg:flex-row lg:divide-x lg:divide-y-0 h-full">
        <TeamSidebar
          onSelectView={setView}
          onPersonalAccount={handlePersonalAccount}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex min-w-0 flex-1 flex-col p-6"
          >
            {mainContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
}

export { TeamSetupFlow };
