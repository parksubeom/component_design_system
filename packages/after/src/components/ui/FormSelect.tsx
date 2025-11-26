import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// -------------------------------------------------------------------------
// 1. Interface Definition (Legacy Compatible)
// 기존 FormSelect가 받던 Props를 그대로 지원합니다.
// -------------------------------------------------------------------------
interface Option {
  value: string;
  label: string;
}

export interface FormSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  size?: "sm" | "md" | "lg"; // Legacy width prop mapping
  className?: string;
}

export const FormSelect = React.forwardRef<HTMLButtonElement, FormSelectProps>(
  (
    {
      name,
      value,
      onChange,
      options,
      label,
      placeholder = "카테고리 선택",
      required = false,
      disabled = false,
      error,
      helpText,
      size = "md", // 사실상 width 역할을 함
      className,
    },
    ref
  ) => {
    // Legacy Size(Width) Mapping
    // 기존 FormInput의 width prop과 유사하게 매핑
    const widthClasses = {
      sm: "w-[200px]",
      md: "w-full", // 기본적으로 full width로 동작하되 필요시 조정
      lg: "w-full",
    };

    // size prop이 sm일 때만 고정 너비를 주고, 나머지는 full width로 처리하는 것이 일반적이었음
    const containerWidth = size === "sm" ? widthClasses.sm : "w-full";

    return (
      <div className={cn("mb-4", containerWidth, className)}>
        {/* Label Area */}
        {label && (
          <Label
            className={cn(
              "block mb-1.5 text-[13px] font-bold text-bum-gray-800 font-sans",
              error && "text-bum-red-main"
            )}
          >
            {label}
            {required && <span className="text-bum-red-main ml-0.5">*</span>}
          </Label>
        )}

        {/* Select Component */}
        <Select
          value={value}
          onValueChange={onChange}
          disabled={disabled}
          name={name}
        >
          <SelectTrigger
            ref={ref}
            className={cn(
              // [Legacy Style Match]
              // h-auto, py-[8px], px-[10px]: 레거시 패딩
              // rounded-[3px]: 레거시 둥글기
              // border-bum-gray-300: 레거시 보더 색상 (#ccc)
              "flex h-auto w-full items-center justify-between rounded-[3px] border border-bum-gray-300 bg-background px-2.5 py-2 text-[14px] text-black ring-offset-background placeholder:text-bum-gray-400",
              // Focus State (#1976d2)
              "focus:outline-none focus:ring-2 focus:ring-bum-blue-main focus:ring-offset-0 focus:border-bum-blue-main",
              // Disabled State
              "disabled:cursor-not-allowed disabled:bg-bum-gray-100 disabled:opacity-100",
              // Error State
              error && "border-bum-red-main focus:ring-bum-red-main"
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-[14px] focus:bg-bum-blue-light focus:text-bum-blue-main" // 옵션 선택 시 스타일
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Helper / Error Text */}
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

FormSelect.displayName = "FormSelect";
