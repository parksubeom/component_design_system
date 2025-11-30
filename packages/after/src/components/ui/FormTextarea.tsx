import React from "react";
import { Textarea } from "@/components/ui/TextArea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ✅ [Fix] onChange 타입 재정의
export interface FormTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label?: string;
  error?: string;
  helpText?: string;
  // ✅ Legacy Interface
  onChange?: (value: string) => void;
}

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps
>(
  (
    { className, label, error, helpText, required, id, onChange, ...props },
    ref
  ) => {
    return (
      <div className={cn("mb-4 w-full", className)}>
        {label && (
          <Label
            htmlFor={id || props.name}
            className={cn(
              "block mb-1.5 text-[13px] font-bold",

              // ✅ [FIX 1] 기본 텍스트는 레거시 어두운 색으로 고정
              "text-bum-gray-800",

              // ✅ [FIX 2] 다크 모드에서도 어두운 색을 유지하도록 명시적으로 오버라이드
              "dark:text-bum-gray-800",

              // ✅ [FIX 3] 에러 텍스트도 다크 모드용으로 명시적 오버라이드
              error && "text-bum-red-main dark:text-bum-red-dark"
            )}
          >
            {label}
            {required && <span className="text-bum-red-main ml-0.5">*</span>}
          </Label>
        )}

        <Textarea
          ref={ref}
          id={id || props.name}
          aria-invalid={!!error}
          className={cn(
            "flex min-h-[6em] w-full rounded-[3px] border border-bum-gray-300 bg-background px-[14px] py-[16.5px] text-[16px] text-black placeholder:text-bum-gray-400 resize-y",
            "focus-visible:ring-2 focus-visible:ring-bum-blue-main focus-visible:border-bum-blue-main",
            "disabled:bg-bum-gray-100 disabled:cursor-not-allowed",
            error && "border-bum-red-main focus-visible:ring-bum-red-main",
            className
          )}
          required={required}
          // ✅ [Fix] Event Object -> String Value 변환
          onChange={(e) => onChange?.(e.target.value)}
          {...props}
        />

        {error && (
          <p className="mt-1 text-[12px] text-bum-red-main font-sans">
            {error}
          </p>
        )}
        {helpText && !error && (
          <p className="mt-1 text-[12px] text-bum-gray-600 font-sans">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);
FormTextarea.displayName = "FormTextarea";
