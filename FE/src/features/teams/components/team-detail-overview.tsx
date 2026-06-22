"use client";

import { Icons } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
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

const TeamDetailOverview = () => {
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
};

export { TeamDetailOverview };
