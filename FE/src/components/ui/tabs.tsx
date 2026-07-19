"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list relative inline-flex flex-1 items-center justify-start text-muted-foreground group-data-[orientation=horizontal]/tabs:h-8 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "rounded-lg bg-muted p-[3px]",
        line: "gap-3 rounded-none bg-transparent p-0 after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-px after:bg-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  tabsTriggerFullWidth?: boolean;
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Base
        "cursor-pointer relative inline-flex h-[calc(100%-1px)] items-center justify-start gap-3 whitespace-nowrap rounded-md border border-transparent px-3 py-2.5 text-sm font-medium text-foreground/60 transition-all",
        "hover:text-foreground duration-300 hover:bg-muted/70",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",

        // Vertical
        "group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start",

        // Default variant
        "group-data-[variant=default]/tabs-list:data-[state=active]:bg-background",
        "group-data-[variant=default]/tabs-list:data-[state=active]:text-foreground",
        "group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm",
        "dark:group-data-[variant=default]/tabs-list:data-[state=active]:border-input",
        "dark:group-data-[variant=default]/tabs-list:data-[state=active]:bg-input/30",

        // Line variant
        "group-data-[variant=line]/tabs-list:rounded-md",
        "group-data-[variant=line]/tabs-list:border-none",
        "group-data-[variant=line]/tabs-list:bg-transparent",
        "group-data-[variant=line]/tabs-list:shadow-none",
        "group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "group-data-[variant=line]/tabs-list:data-[state=active]:text-foreground",

        // underline active
        "after:absolute after:left-0 after:right-0 after:bottom-[-3px] after:z-10 after:h-[2px] after:scale-x-0 after:bg-primary after:transition-transform after:duration-300",
        "group-data-[variant=line]/tabs-list:data-[state=active]:after:scale-x-100",

        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
