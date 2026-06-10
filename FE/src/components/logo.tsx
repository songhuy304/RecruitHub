import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
  withText?: boolean;
  isLink?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className,
  withText = true,
  isLink = true,
}) => {
  return (
    <div className={cn("text-sidebar-foreground relative z-20 ", className)}>
      <Link
        href={isLink ? "/" : "#"}
        className="flex items-center text-lg font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        {withText && <span>RecruitHub</span>}
      </Link>
    </div>
  );
};

export { Logo };
