"use client";

import { APP_NAME } from "@/config/app.config";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { AccountActionRow } from "./account-action-row";
import { TeamSetupCard } from "./team-setup-card";

type TeamSetupView = "choose" | "create" | "join";

interface AccountChooserCardProps {
  onSelectView: (view: TeamSetupView) => void;
  onPersonalAccount: () => void;
}

function AccountChooserCard({
  onSelectView,
  onPersonalAccount,
}: AccountChooserCardProps) {
  const initial = "P".toUpperCase();

  return (
    <TeamSetupCard>
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold">
          Choose an account
        </CardTitle>
        <CardDescription>to continue to {APP_NAME}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col px-2">
        <AccountActionRow
          label="Personal account"
          onClick={onPersonalAccount}
          icon={
            <Avatar className="size-10 rounded-lg">
              <AvatarFallback className="bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
                {initial}
              </AvatarFallback>
            </Avatar>
          }
        />

        <AccountActionRow
          label="Create your team"
          muted
          onClick={() => onSelectView("create")}
          icon={
            <div className="border-muted-foreground/40 flex size-10 items-center justify-center rounded-full border border-dashed">
              <Icons.add className="text-muted-foreground size-5" />
            </div>
          }
        />

        <AccountActionRow
          label="Join team"
          muted
          onClick={() => onSelectView("join")}
          icon={
            <div className="border-muted-foreground/40 flex size-10 items-center justify-center rounded-full border border-dashed">
              <Icons.teams className="text-muted-foreground size-5" />
            </div>
          }
        />
      </CardContent>
    </TeamSetupCard>
  );
}

export { AccountChooserCard };
export type { TeamSetupView };
