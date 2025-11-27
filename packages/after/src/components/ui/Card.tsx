import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// -------------------------------------------------------------------------
// 1. Card Style Definition (CVA)
// -------------------------------------------------------------------------
const cardVariants = cva(
  // Base Styles
  // ✅ [Fix] 다크모드 시 텍스트 흰색 통일 (dark:text-white 추가)
  "rounded-[3px] border bg-card text-card-foreground dark:text-white",
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

        // [Stats] 통계 카드용
        stats: "p-4 border border-border rounded-md",
      },
      // [Color] 배경색/테두리색 테마
      color: {
        default: "bg-white border-bum-gray-300",
        blue: "bg-bum-blue-light border-bum-blue-border",
        green: "bg-bum-green-light border-bum-green-border",
        orange: "bg-bum-orange-light border-bum-orange-border",
        red: "bg-bum-red-light border-bum-red-border",
        gray: "bg-bum-gray-light border-bum-gray-border",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "default",
    },
  }
);

// -------------------------------------------------------------------------
// 2. Main Card Component
// -------------------------------------------------------------------------
interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, color, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, color }), className)}
      {...props}
    />
  );
}

// -------------------------------------------------------------------------
// 3. Custom Sub-Components (For ManagementPage Stats)
// -------------------------------------------------------------------------

// 라벨: "전체", "활성" 등
function CardStatsLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "text-[12px] text-bum-gray-600 mb-1",
        "dark:text-white", // ✅ 다크모드 강제 화이트
        className
      )}
      {...props}
    />
  );
}

// 값: "10", "5" 등
function CardStatsValue({
  className,
  color,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  color?: "blue" | "green" | "orange" | "red" | "gray";
}) {
  // 색상별 텍스트 컬러 매핑
  const textColors = {
    blue: "text-bum-blue-main",
    green: "text-bum-green-main",
    orange: "text-bum-orange-main",
    red: "text-bum-red-main",
    gray: "text-bum-gray-700",
  };

  return (
    <div
      className={cn(
        "text-[24px] font-bold",
        color ? textColors[color] : "text-bum-gray-800",
        "dark:text-white", // ✅ 다크모드 강제 화이트 (기존 컬러 덮어씀)
        className
      )}
      {...props}
    />
  );
}

// -------------------------------------------------------------------------
// 4. Standard Shadcn Sub-Components
// -------------------------------------------------------------------------

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardStatsLabel,
  CardStatsValue,
};
