import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ITeamMember } from "@/features/teams/types";
import { cn } from "@/lib/utils";

const AVATAR_COLOR = "bg-violet-100 text-violet-700";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

interface JobCardAvatarGroupProps {
  assignee?: ITeamMember;
  className?: string;
}

export function JobCardAvatarGroup({ assignee, className }: JobCardAvatarGroupProps) {
  if (!assignee) {
    return null;
  }

  return (
    <div className={cn("flex items-center", className)}>
      <Avatar className="border-background size-7 border-2">
        {assignee.avatar ? (
          <AvatarImage src={assignee.avatar} alt={assignee.fullName} />
        ) : null}
        <AvatarFallback className={cn("text-[10px] font-semibold", AVATAR_COLOR)}>
          {getInitials(assignee.fullName)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
