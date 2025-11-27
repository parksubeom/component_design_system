import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// -------------------------------------------------------------------------
// 1. Card Style Definition (Legacy Variants Added)
// -------------------------------------------------------------------------
const cardVariants = cva(
  "rounded-lg bg-card text-card-foreground transition-all",
  {
    variants: {
      variant: {
        // [Default] Shadow + Border (Shadcn Standard)
        default: "border border-border shadow-sm",

        // [Bordered] No Shadow, Only Border (Legacy .card-bordered)
        bordered: "border border-border shadow-none",

        // [Elevated] Stronger Shadow (Legacy .card-elevated)
        elevated: "border-none shadow-md",

        // [Flat] Gray Background, No Border (Legacy .card-flat)
        flat: "border-none shadow-none bg-muted/50",

        // [Stats] 통계 카드용 (ManagementPage에서 쓰일 수 있음)
        stats: "p-4 border border-border rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// -------------------------------------------------------------------------
// 2. Component Implementation
// -------------------------------------------------------------------------
interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
