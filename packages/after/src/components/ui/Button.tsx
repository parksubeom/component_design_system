import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// -------------------------------------------------------------------------
// 1. 스타일 정의 (CVA)
// Bum Design System의 토큰(--primary, --destructive 등)과 연결됩니다.
// -------------------------------------------------------------------------
const buttonVariants = cva(
  // Base Styles
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // [Primary] --bum-blue-50 (Brand Color)
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",

        // [Destructive] --bum-red-50 (Error/Danger)
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",

        // [Outline] Border only
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",

        // [Secondary] --bum-blue-5 (Subtle Background)
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",

        // [Ghost] Hover effect only
        ghost: "hover:bg-accent hover:text-accent-foreground",

        // [Link] Text only
        link: "text-primary underline-offset-4 hover:underline",

        // [Success] Positive Action (Save, Submit)
        // 현재는 Tailwind 기본 Green을 사용하지만, 추후 --bum-green-50 토큰 추가 권장
        success: "bg-green-600 text-white hover:bg-green-700",
      },
      size: {
        md: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      // [Layout Extension] 100% Width 지원
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// -------------------------------------------------------------------------
// 2. 컴포넌트 구현
// 비즈니스 로직 없이 순수한 UI 렌더링만 담당합니다. (Dumb Component)
// -------------------------------------------------------------------------
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
