"use client";

import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CreateTeamForm } from "../forms/create-team-form";
import { JoinTeamForm } from "../forms/join-team-form";
import { useCreateTeam, useGetTeams } from "../hooks";
import type {
  CreateTeamFormValues,
  JoinTeamFormValues,
} from "../schemas/team.schema";
import { TeamMainPanel } from "./team-main-panel";
import { TeamSidebar } from "./team-sidebar";
import { ITeam } from "../types";
import PageSkeleton from "@/components/page-skeleton";
import { useUser } from "@/hooks/useUser";

type TeamSetupView = "overview" | "create" | "join";

function TeamSetupFlow() {
  const router = useRouter();
  const { user } = useUser();
  const { data: teams = [], isLoading } = useGetTeams();
  const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
  const { mutate: createTeam, isPending: isCreatePending } = useCreateTeam();
  const [view, setView] = useState<TeamSetupView>("overview");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setSelectedTeam(
      teams.find((team) => team.id === user?.currentTeamId) ?? null,
    );
  }, [teams, user?.currentTeamId]);

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

  const viewConfig: Record<TeamSetupView, React.ReactNode> = {
    create: (
      <CreateTeamForm
        onCancel={() => setView("overview")}
        onSubmit={handleCreateTeam}
        isPending={isCreatePending}
      />
    ),
    join: (
      <JoinTeamForm
        onCancel={() => setView("overview")}
        onSubmit={handleJoinTeam}
        isPending={isPending}
      />
    ),
    overview: <TeamMainPanel selectedTeam={selectedTeam} />,
  };

  const mainContent = viewConfig[view];

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <Card className="gap-0 py-0 md:min-h-167.5">
      <div className="flex flex-col divide-y lg:flex-row lg:divide-x lg:divide-y-0 h-full">
        <TeamSidebar
          onSelectView={setView}
          onPersonalAccount={handlePersonalAccount}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          user={user}
          teams={teams}
          isLoading={isLoading}
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
