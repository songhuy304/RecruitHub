"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getTeamRoleLabel } from "@/constants/options";
import { ETEAM_ROLE } from "@/enums";
import { ITeamMember } from "@/features/teams/types";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

interface MemberOptionRowProps {
  member: ITeamMember;
  showYouBadge?: boolean;
  className?: string;
}

export function MemberOptionRow({
  member,
  showYouBadge,
  className,
}: MemberOptionRowProps) {
  const t = useTranslations();

  return (
    <div className={cn("flex w-full items-center justify-between gap-3", className)}>
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="border-border/60 size-5 shrink-0 border">
          {member.avatar ? (
            <AvatarImage src={member.avatar} alt={member.fullName} />
          ) : null}
          <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
            {getInitials(member.fullName)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 space-y-0.5">
          <h4 className="text-foreground truncate text-sm font-medium">
            {member.fullName}
          </h4>
        </div>
      </div>
      {showYouBadge ? (
        <Badge
          variant="secondary"
          className="shrink-0 rounded-sm border border-violet-200 bg-violet-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-violet-700 uppercase hover:bg-violet-100"
        >
          {t("Jobs.hiring-team-you")}
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          className="text-muted-foreground shrink-0 rounded-sm border bg-muted px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase hover:bg-muted"
        >
          {getTeamRoleLabel(member.teamRole)}
        </Badge>
      )}
    </div>
  );
}
