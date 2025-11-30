import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  X,
  Circle,
} from "lucide-react";

import { cn } from "@/lib/utils";

// -------------------------------------------------------------------------
// 1. 스타일 정의 (CVA) - Dark Mode Support Added
// Light Mode: Legacy Colors (bum-*)
// Dark Mode: Primitive Tokens (blue-900, text-100 etc.) for High Contrast
// -------------------------------------------------------------------------
const alertVariants = cva(
  "relative w-full flex items-start gap-2 rounded-[3px] border p-[10px_12px] text-sm [&>svg]:text-current",
  {
    variants: {
      variant: {
        // [Default] Gray
        // Light: bg-gray-100 / border-gray-400 / text-gray-700
        // Dark: bg-gray-800 / border-gray-700 / text-gray-100
        default:
          "bg-bum-gray-100 border-bum-gray-border text-bum-gray-700 " +
          "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100",

        // [Info] Blue
        // Light: bg-blue-50 / border-blue-200 / text-blue-main
        // Dark: bg-blue-900 / border-blue-800 / text-blue-100
        info:
          "bg-bum-blue-light border-bum-blue-border text-bum-blue-main " +
          "dark:bg-blue-900 dark:border-blue-800 dark:text-blue-100",

        // [Success] Green
        // Dark: bg-green-900 / border-green-800 / text-green-100
        success:
          "bg-bum-green-light border-bum-green-border text-bum-green-main " +
          "dark:bg-green-900 dark:border-green-800 dark:text-green-100",

        // [Warning] Orange
        // Dark: bg-orange-900 / border-orange-800 / text-orange-100
        warning:
          "bg-bum-orange-light border-bum-orange-border text-bum-orange-main " +
          "dark:bg-orange-900 dark:border-orange-800 dark:text-orange-100",

        // [Error] Red
        // Dark: bg-red-900 / border-red-800 / text-red-100
        error:
          "bg-bum-red-light border-bum-red-border text-bum-red-main " +
          "dark:bg-red-900 dark:border-red-800 dark:text-red-100",

        // [Destructive] Red (Alias)
        destructive:
          "bg-bum-red-light border-bum-red-border text-bum-red-main " +
          "dark:bg-red-900 dark:border-red-800 dark:text-red-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  showIcon?: boolean;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "default",
      title,
      showIcon = true,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const getIcon = () => {
      const iconProps = { className: "h-5 w-5 shrink-0" };
      switch (variant) {
        case "info":
          return <Info {...iconProps} />;
        case "success":
          return <CheckCircle {...iconProps} />;
        case "warning":
          return <AlertTriangle {...iconProps} />;
        case "error":
        case "destructive":
          return <XCircle {...iconProps} />;
        default:
          return (
            <Circle {...iconProps} className="h-5 w-5 shrink-0 fill-current" />
          );
      }
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {showIcon && getIcon()}
        <div className="flex-1 grid gap-1">
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{children}</AlertDescription>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto shrink-0 -mr-1 -mt-1 p-1 opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 font-bold leading-none tracking-tight text-[15px]",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-[14px] leading-relaxed [&_p]:leading-relaxed",
      className
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
3;
