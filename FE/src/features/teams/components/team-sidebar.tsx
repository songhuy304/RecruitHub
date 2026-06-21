"use client";

import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { APP_NAME } from "@/config/app.config";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/useRedux";
import { selectTeamInfo } from "@/store";
import { useGetTeams, useSwitchTeam } from "../hooks";
import type { ITeam } from "../types";
import { toast } from "sonner";

interface TeamSidebarProps {
  onSelectView: (view: "create" | "join") => void;
  onPersonalAccount: () => void;
}

function TeamAvatar({
  team,
  active = false,
  size = "md",
}: {
  team: ITeam;
  active?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const initial = team.name.charAt(0).toUpperCase();

  return (
    <Avatar
      className={cn(
        "shrink-0 rounded-lg",
        size === "sm" && "size-8",
        size === "md" && "size-10",
        size === "lg" && "size-14"
      )}
    >
      <AvatarFallback
        className={cn(
          "rounded-lg font-semibold",
          size === "lg" ? "text-xl" : "text-sm",
          active
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {initial}
      </AvatarFallback>
    </Avatar>
  );
}

function TeamSidebarItem({
  team,
  isActive,
  onSelect,
}: {
  team: ITeam;
  isActive: boolean;
  onSelect: (teamId: number) => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => onSelect(team.id)}
      className={cn(
        "h-auto w-full justify-start gap-3 rounded-lg px-3 py-2.5",
        isActive && "bg-accent"
      )}
    >
      <TeamAvatar team={team} active={isActive} size="sm" />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
        <div className="flex w-full items-center gap-2">
          <Typography as="span" variant="label-sm" className="truncate">
            {team.name}
          </Typography>
          {isActive && (
            <Badge className="border-emerald-500/30 bg-emerald-500/15 px-1.5 py-0 text-[10px] text-emerald-500">
              Active
            </Badge>
          )}
        </div>
        {!isActive && (
          <Typography
            as="span"
            variant="paragraph-xs"
            className="text-muted-foreground"
          >
            {team.slug}
          </Typography>
        )}
      </div>
      {isActive ? (
        <Icons.chevronUp className="text-muted-foreground size-4 shrink-0" />
      ) : (
        <Icons.chevronRight className="text-muted-foreground size-4 shrink-0 opacity-0 group-hover:opacity-100" />
      )}
    </Button>
  );
}

function TeamSidebar({ onSelectView, onPersonalAccount }: TeamSidebarProps) {
  const activeTeam = useAppSelector(selectTeamInfo);
  const { data: teams = [], isLoading } = useGetTeams();
  const { mutateAsync: switchTeam, isPending: isSwitching } = useSwitchTeam();

  const visibleTeams = teams.slice(0, 5);

  const handleSwitchTeam = async (teamId: number) => {
    if (activeTeam?.id === teamId || isSwitching) return;

    try {
      await switchTeam(teamId);
      toast.success("Switched team");
    } catch {
      toast.error("Failed to switch team");
    }
  };

  return (
    <aside className="flex w-full shrink-0 flex-col lg:w-80 h-full">
      <div className="mt-4 px-5">
        <div className="mb-2 flex items-center justify-between">
          <Typography
            as="span"
            variant="subheading-2xs"
            className="text-muted-foreground"
          >
            YOUR TEAMS
          </Typography>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => onSelectView("create")}
          >
            <Icons.add className="size-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-0.5">
          {isLoading ? (
            <div className="flex flex-col gap-2 py-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-muted h-12 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : visibleTeams.length === 0 ? (
            <Typography
              as="p"
              variant="paragraph-sm"
              className="text-muted-foreground px-3 py-4 text-center"
            >
              No teams yet
            </Typography>
          ) : (
            visibleTeams.map((team) => (
              <TeamSidebarItem
                key={team.id}
                team={team}
                isActive={activeTeam?.id === team.id}
                onSelect={handleSwitchTeam}
              />
            ))
          )}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2 border-t p-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSelectView("create")}
          className="h-auto flex-col items-start gap-1 rounded-lg px-4 py-3 text-left"
        >
          <div className="flex w-full items-center gap-2">
            <Icons.add className="size-4" />
            <Typography as="span" variant="label-sm">
              Create your team
            </Typography>
          </div>
          <Typography
            as="span"
            variant="paragraph-xs"
            className="text-muted-foreground pl-6"
          >
            Start a new team and invite members
          </Typography>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => onSelectView("join")}
          className="h-auto flex-col items-start gap-1 rounded-lg px-4 py-3 text-left"
        >
          <div className="flex w-full items-center gap-2">
            <Icons.user className="size-4" />
            <Typography as="span" variant="label-sm">
              Join team
            </Typography>
          </div>
          <Typography
            as="span"
            variant="paragraph-xs"
            className="text-muted-foreground pl-6"
          >
            Join an existing team with an invite
          </Typography>
        </Button>
      </div>
    </aside>
  );
}

export { TeamSidebar, TeamAvatar };
