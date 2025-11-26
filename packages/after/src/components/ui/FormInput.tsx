import React from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ✅ [Fix] onChange 타입을 React.InputHTMLAttributes에서 제외하고 string으로 재정의
export interface FormInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "width" | "onChange"
  > {
  label?: string;
  error?: string;
  helpText?: string;
  width?: "small" | "medium" | "large" | "full";
  // ✅ Legacy Interface: (value: string) => void
  onChange?: (value: string) => void;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      className,
      label,
      error,
      helpText,
      width = "full",
      required,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const widthClasses = {
      small: "w-[200px]",
      medium: "w-[300px]",
      large: "w-[400px]",
      full: "w-full",
    };

    return (
      <div className={cn("mb-4", widthClasses[width], className)}>
        {label && (
          <Label
            htmlFor={id || props.name}
            className={cn(
              "block mb-1.5 text-[13px] font-bold text-bum-gray-800 font-sans",
              error && "text-bum-red-main"
            )}
          >
            {label}
            {required && <span className="text-bum-red-main ml-0.5">*</span>}
          </Label>
        )}

        <Input
          ref={ref}
          id={id || props.name}
          className={cn(
            "h-auto py-2 px-2.5 rounded-[3px] border-bum-gray-300 text-[14px] text-black placeholder:text-bum-gray-400",
            "focus-visible:ring-2 focus-visible:ring-bum-blue-main focus-visible:border-bum-blue-main",
            "disabled:bg-bum-gray-100 disabled:cursor-not-allowed",
            error && "border-bum-red-main focus-visible:ring-bum-red-main"
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
FormInput.displayName = "FormInput";
