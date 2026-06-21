"use client";

import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsUnderline } from "@/components/ui/tabs-underline";
import { Typography } from "@/components/ui/typography";
import { useAppSelector } from "@/hooks/useRedux";
import { selectTeamInfo } from "@/store";
import { ETEAM_TYPE, type ITeam } from "../types";
import { TeamAvatar } from "./team-sidebar";

const MOCK_ACTIVE_TEAM: ITeam = {
  id: 1,
  name: "RecruitHub Team",
  inviteCode: "RH-2024",
  slug: "recruithub-team",
  type: ETEAM_TYPE.ORGANIZATION,
};

const TEAM_STATS = [
  {
    label: "Total team members",
    value: "24",
    icon: Icons.teams,
  },
  {
    label: "Active projects",
    value: "8",
    icon: Icons.workspace,
  },
  {
    label: "Pending invites",
    value: "3",
    icon: Icons.mail,
  },
] as const;

const RECENT_ACTIVITY = [
  {
    id: 1,
    icon: Icons.user,
    title: "A new member joined the team",
    subtitle: "Alex Johnson joined",
    time: "2h ago",
  },
  {
    id: 2,
    icon: Icons.workspace,
    title: 'Project "Q2 Hiring" was created',
    subtitle: "Created by you",
    time: "1d ago",
  },
  {
    id: 3,
    icon: Icons.settings,
    title: "Team settings updated",
    subtitle: "Notification preferences changed",
    time: "3d ago",
  },
] as const;

function StatCard({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="gap-0 py-5">
      <CardContent className="flex items-center justify-between">
        <div>
          <Typography as="p" variant="h3" className="font-bold">
            {value}
          </Typography>
          <Typography
            as="p"
            variant="paragraph-sm"
            className="text-muted-foreground mt-1"
          >
            {label}
          </Typography>
        </div>
        <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
          <Icon className="text-muted-foreground size-5" />
        </div>
      </CardContent>
    </Card>
  );
}

function TeamOverviewContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {TEAM_STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-0 divide-y">
          {RECENT_ACTIVITY.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg">
                <item.icon className="text-muted-foreground size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <Typography as="p" variant="label-sm">
                  {item.title}
                </Typography>
                <Typography
                  as="p"
                  variant="paragraph-sm"
                  className="text-muted-foreground mt-0.5"
                >
                  {item.subtitle}
                </Typography>
              </div>
              <Typography
                as="span"
                variant="paragraph-xs"
                className="text-muted-foreground shrink-0"
              >
                {item.time}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function TeamMainPanel() {
  const activeTeam = useAppSelector(selectTeamInfo);
  const displayTeam = activeTeam ?? MOCK_ACTIVE_TEAM;

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4 pb-4 sm:gap-6">
        <TeamAvatar team={displayTeam} active size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Typography as="h3" variant="h4" className="font-semibold">
              {displayTeam.name}
            </Typography>
            <Badge className="border-emerald-500/30 bg-emerald-500/15 text-emerald-500">
              Active
            </Badge>
          </div>
          <Typography
            as="p"
            variant="paragraph-sm"
            className="text-muted-foreground mt-1"
          >
            You&apos;re currently working in this team
          </Typography>
        </div>
        <Button variant="outline" className="gap-2">
          <Icons.settings className="size-4" />
          Team settings
        </Button>
      </div>

      <TabsUnderline
        defaultValue="overview"
        className="gap-6"
        items={[
          {
            value: "overview",
            label: "Overview",
            content: <TeamOverviewContent />,
          },
          {
            value: "members",
            label: "Members",
            icon: Icons.user,
            content: (
              <Card className="py-12 text-center">
                <Typography
                  as="p"
                  variant="paragraph-sm"
                  className="text-muted-foreground"
                >
                  Members management coming soon.
                </Typography>
              </Card>
            ),
          },
          {
            value: "invites",
            label: "Invites",
            icon: Icons.mail,
            content: (
              <Card className="py-12 text-center">
                <Typography
                  as="p"
                  variant="paragraph-sm"
                  className="text-muted-foreground"
                >
                  Invites management coming soon.
                </Typography>
              </Card>
            ),
          },
          {
            value: "settings",
            label: "Settings",
            icon: Icons.settings,
            content: (
              <Card className="py-12 text-center">
                <Typography
                  as="p"
                  variant="paragraph-sm"
                  className="text-muted-foreground"
                >
                  Team settings coming soon.
                </Typography>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}

export { TeamMainPanel };
