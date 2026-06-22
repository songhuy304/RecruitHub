"use client";

import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { Skeleton } from "@/components/ui/skeleton";

import { TEAM_PATHS } from "@/config/paths.config";
import { useGetTeams, useSwitchTeam } from "@/features/teams/hooks";
import { useUser } from "@/hooks/useUser";

import { type ITeam } from "@/features/teams/types"; // sửa path theo project bạn
import { useAppDispatch } from "@/hooks/useRedux";
import { setTokens } from "@/store";
import { TeamAvatar } from "./team-avatar";

export function OrgSwitcher() {
  const { isMobile, state } = useSidebar();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useUser();

  const { data: teams = [], isPending: loading } = useGetTeams();
  const { mutate: switchTeam } = useSwitchTeam();

  const currentTeam = teams.find((team: ITeam) => {
    return team.id === user?.currentTeamId;
  });

  const currentTeamRole = currentTeam
    ? `org:${user?.currentTeam?.teamRole}` || "Get started"
    : "Get started";

  const handleSwitchTeam = (teamId: number) => {
    switchTeam(teamId, {
      onSuccess: (data) => {
        dispatch(setTokens(data.data));
        router.refresh();
      },
    });
  };

  if (loading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Skeleton className="size-8 rounded-lg" />

            <div
              className={`grid flex-1 gap-1 ${
                state === "collapsed" ? "invisible max-w-0 opacity-0" : ""
              }`}
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="
              data-[state=open]:bg-sidebar-accent
              data-[state=open]:text-sidebar-accent-foreground
              "
            >
              {currentTeam?.logoUrl ? (
                <TeamAvatar
                  fallback={currentTeam?.name || "TN"}
                  src={currentTeam?.logoUrl || ""}
                />
              ) : (
                <div
                  className="
                bg-sidebar-primary
                text-sidebar-primary-foreground
                flex size-8 items-center justify-center
                rounded-lg
              "
                >
                  <Icons.galleryVerticalEnd className="size-4" />
                </div>
              )}

              <div
                className={`grid flex-1 text-left text-sm ${
                  state === "collapsed"
                    ? "invisible max-w-0 overflow-hidden opacity-0"
                    : ""
                }`}
              >
                <span className="truncate font-medium">
                  {currentTeam?.name || "Create your team"}
                </span>

                <span className="text-muted-foreground truncate text-xs">
                  {currentTeamRole}
                </span>
              </div>

              <Icons.chevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="
            w-[--radix-dropdown-menu-trigger-width]
            min-w-56 rounded-lg
            "
            align="start"
            side={isMobile ? "bottom" : "right"}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>

            {teams.map((team: ITeam) => {
              const isActive = team.id === user?.currentTeamId;

              return (
                <DropdownMenuItem
                  key={team.id}
                  className="gap-2 p-2"
                  onClick={() => {
                    handleSwitchTeam(team.id);
                  }}
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <Icons.galleryVerticalEnd className="size-3.5" />
                  </div>
                  <span>{team.name}</span>
                  {isActive && <Icons.check className="ml-auto size-4" />}
                  {!isActive && (
                    <DropdownMenuShortcut>#{team.id}</DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => router.push(TEAM_PATHS.TEAMS)}
            >
              <Icons.add className="size-4" />
              Add new team
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
