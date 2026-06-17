"use client";

import { Icons } from "@/components/icons";
import Image from "next/image";
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
import { useUser } from "@/hooks/useUser";
import { TEAM_PATHS } from "@/config/paths.config";
import { useGetInfoTeam } from "@/features/teams/hooks/useGetInfoTeam";
import { Skeleton } from "./ui/skeleton";

export function OrgSwitcher() {
  const { isMobile, state } = useSidebar();
  const router = useRouter();

  const user = useUser();
  const { data, isPending: loading } = useGetInfoTeam();

  const teamInfo = data?.data;

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

  if (!user?.teamId || !teamInfo) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            onClick={() => router.push(TEAM_PATHS.TEAMS)}
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg">
              <Icons.add className="size-4" />
            </div>

            <div
              className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${
                state === "collapsed"
                  ? "invisible max-w-0 overflow-hidden opacity-0"
                  : "visible max-w-full opacity-100"
              }`}
            >
              <span className="truncate font-medium">Create your team</span>

              <span className="text-muted-foreground truncate text-xs">
                Get started
              </span>
            </div>

            <Icons.chevronsUpDown
              className={`ml-auto ${
                state === "collapsed" ? "invisible max-w-0 opacity-0" : ""
              }`}
            />
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
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                <Icons.galleryVerticalEnd className="size-4" />
              </div>

              <div
                className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${
                  state === "collapsed"
                    ? "invisible max-w-0 overflow-hidden opacity-0"
                    : "visible max-w-full opacity-100"
                }`}
              >
                <span className="truncate font-medium">{teamInfo.name}</span>

                <span className="text-muted-foreground truncate text-xs">
                  {teamInfo.slug}
                </span>
              </div>

              <Icons.chevronsUpDown
                className={`ml-auto ${
                  state === "collapsed" ? "invisible max-w-0 opacity-0" : ""
                }`}
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              {teamInfo?.slug}
            </DropdownMenuLabel>
            <DropdownMenuItem className="gap-2 p-2">
              <Icons.galleryVerticalEnd className="size-4" />
              {teamInfo?.name}
              <DropdownMenuShortcut>#{teamInfo?.id}</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => router.push(TEAM_PATHS.TEAMS)}
              className="gap-2 p-2"
            >
              <Icons.add className="size-4" />
              Switch team
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
