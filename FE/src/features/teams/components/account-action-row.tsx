"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface AccountActionRowProps {
  icon: React.ReactNode;
  label: string;
  muted?: boolean;
  onClick?: () => void;
}

function AccountActionRow({
  icon,
  label,
  muted = false,
  onClick,
}: AccountActionRowProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className="h-auto w-full justify-start gap-4 rounded-lg px-4 py-3 group relative"
    >
      <div className="flex size-10 shrink-0 items-center justify-center">
        {icon}
      </div>
      <Typography
        as="span"
        variant="label-sm"
        className={cn(muted && "text-muted-foreground")}
      >
        {label}
      </Typography>

      <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Icons.chevronRight className="text-muted-foreground size-4" />
      </span>
    </Button>
  );
}

export { AccountActionRow };
