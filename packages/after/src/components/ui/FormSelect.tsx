import React from "react";
import { NativeSelect } from "@/components/ui/NativeSelect"; // ✅ 교체됨
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// -------------------------------------------------------------------------
// 1. Interface Definition (Legacy Compatible)
// -------------------------------------------------------------------------
interface Option {
  value: string;
  label: string;
}

export interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'size'> {
  name: string;
  value: string;
  onChange: (value: string) => void; // Legacy Interface
  options: Option[];
  label?: string;
  placeholder?: string;
  error?: string;
  helpText?: string;
  size?: "sm" | "md" | "lg"; // Legacy width support
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      name,
      value,
      onChange,
      options,
      label,
      placeholder = "Select an option...",
      required,
      disabled,
      error,
      helpText,
      size = "md",
      className,
      id,
      ...props
    },
    ref
  ) => {
    // ID 생성 (접근성용)
    const generatedId = React.useId();
    const elementId = id || name || generatedId;

    // Legacy Size Mapping
    const widthClasses = {
      sm: "w-[200px]",
      md: "w-full",
      lg: "w-full",
    };
    const containerWidth = size === 'sm' ? widthClasses.sm : 'w-full';

    return (
      <div className={cn("mb-4", containerWidth, className)}>
        {/* Label */}
        {label && (
          <Label
            htmlFor={elementId}
            className={cn(
              "block mb-1.5 text-[13px] font-bold text-bum-gray-800 font-sans",
              error && "text-bum-red-main"
            )}
          >
            {label}
            {required && <span className="text-bum-red-main ml-0.5">*</span>}
          </Label>
        )}

        {/* ✅ [Native Select] */}
        <NativeSelect
          ref={ref}
          id={elementId}
          name={name}
          value={value}
          disabled={disabled}
          required={required}
          // Event Adapter: ChangeEvent -> string
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            error && "border-bum-red-main focus:ring-bum-red-main"
          )}
          {...props}
        >
          {/* Placeholder Option */}
          <option value="" disabled>
            {placeholder}
          </option>
          
          {/* Options Mapping */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>

        {/* Error / Helper Text */}
        {error && (
          <p className="mt-1 text-[12px] text-bum-red-main font-sans">{error}</p>
        )}
        {helpText && !error && (
          <p className="mt-1 text-[12px] text-bum-gray-600 font-sans">{helpText}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";