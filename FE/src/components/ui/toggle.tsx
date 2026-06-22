import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-5xl font-medium tracking-tight",
      h2: "text-4xl font-medium tracking-tight",
      h3: "text-3xl font-medium tracking-tight",
      h4: "text-2xl font-medium",
      h5: "text-xl font-medium",
      h6: "text-lg font-medium",

      label: "text-sm font-medium",
      body: "text-base",
      small: "text-sm",
      xs: "text-xs",
    },

    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      success: "text-green-500",
      danger: "text-red-500",
    },

    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },

  defaultVariants: {
    variant: "body",
    color: "default",
    align: "left",
  },
});

type Variant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>;

const defaultTag: Record<Variant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",

  label: "span",
  body: "p",
  small: "p",
  xs: "span",
};

export interface TypographyProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as, variant = "body", className, ...props }, ref) => {
    const Component = as || defaultTag[variant];

    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({
            variant,
            color: props.color,
            align: props.align,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

Typography.displayName = "Typography";
