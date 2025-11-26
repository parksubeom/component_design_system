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
// 1. 스타일 정의 (CVA) - Legacy CSS Porting
// -------------------------------------------------------------------------
const alertVariants = cva(
  // Base Styles
  // flex, gap-2(8px), p-3(10px 12px), rounded-[3px]
  "relative w-full flex items-start gap-2 rounded-[3px] border p-[10px_12px] text-sm [&>svg]:text-current",
  {
    variants: {
      variant: {
        // [Default] #f5f5f5 / #bdbdbd / #424242
        default: "bg-bum-gray-100 border-bum-gray-border text-bum-gray-700",

        // [Info] #e3f2fd / #90caf9 / #0d47a1
        info: "bg-bum-blue-light border-bum-blue-border text-[#0d47a1]",

        // [Success] #e8f5e9 / #81c784 / #1b5e20
        success: "bg-bum-green-light border-bum-green-border text-[#1b5e20]",

        // [Warning] #fff3e0 / #ffb74d / #e65100
        warning: "bg-bum-orange-light border-bum-orange-border text-[#e65100]",

        // [Error] #ffebee / #e57373 / #b71c1c
        error: "bg-bum-red-light border-bum-red-border text-[#b71c1c]",

        // Shadcn Destructive alias (Error와 동일하게 처리)
        destructive: "bg-bum-red-light border-bum-red-border text-[#b71c1c]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// -------------------------------------------------------------------------
// 2. Component Implementation (Legacy Compatible)
// 기존의 title, onClose, showIcon Props를 지원합니다.
// -------------------------------------------------------------------------
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
    // Variant에 따른 아이콘 결정
    const getIcon = () => {
      const iconProps = { className: "h-5 w-5 shrink-0" }; // font-size: 20px 대응
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
          ); // Dot
      }
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {/* Icon Area */}
        {showIcon && getIcon()}

        {/* Content Area (flex: 1) */}
        <div className="flex-1 grid gap-1">
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{children}</AlertDescription>
        </div>

        {/* Close Button Area */}
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

// -------------------------------------------------------------------------
// 3. Sub Components (Standard Shadcn)
// -------------------------------------------------------------------------
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  // font-weight: bold, font-size: 15px, margin-bottom: 4px
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
  // font-size: 14px, line-height: 1.5
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
