import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // [Base Styles]
          // flex, w-full, bg-background
          "flex w-full bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",

          // [Legacy Style Porting]
          // min-height: 6em -> min-h-[6em]
          // padding: 16.5px 14px -> py-[16.5px] px-[14px]
          // font-size: 16px -> text-[16px]
          // border-radius: 4px -> rounded-[4px] (레거시 textarea는 4px였음)
          // border: 1px solid ... -> border border-bum-gray-300
          "min-h-[6em] py-[16.5px] px-3.5 text-[16px] rounded-lg border border-bum-gray-300 text-bum-gray-800",

          // [Focus State]
          // border-color: #1976d2 -> focus-visible:border-bum-blue-main
          // border-width: 2px -> focus-visible:ring-2 (Shadcn 표준에 맞춤)
          "focus-visible:ring-2 focus-visible:ring-bum-blue-main focus-visible:border-bum-blue-main",

          // [Error State Support] (부모에서 error 클래스를 줄 경우)
          "aria-[invalid=true]:border-bum-red-main aria-[invalid=true]:focus-visible:ring-bum-red-main",

          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
