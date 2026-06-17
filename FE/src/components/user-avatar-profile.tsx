import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  user: User | null;
}

export const getBadge = (value: boolean) => {
  switch (value) {
    case true:
      return (
        <Badge className="text-[9px]" variant="default">
          Verified
        </Badge>
      );
    default:
      return (
        <Badge className="text-[9px]" variant="destructive">
          Unverified
        </Badge>
      );
  }
};

export function UserAvatarProfile({
  className,
  showInfo = false,
  user,
}: UserAvatarProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className={className}>
        <AvatarImage src={user?.avatar || ""} alt={user?.fullName || ""} />
        <AvatarFallback className="rounded-lg">
          {user?.fullName?.slice(0, 2)?.toUpperCase() || "CN"}
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <div className="flex items-center justify-between">
            <span className="truncate font-semibold">
              {user?.fullName || ""}
            </span>

            {getBadge(user?.isVerified || false)}
          </div>
          <span className="truncate text-xs">{user?.email || ""}</span>
        </div>
      )}
    </div>
  );
}
