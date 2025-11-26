import React, { useState } from "react";
import { FormInput, type FormInputProps } from "@/components/ui/FormInput";

// ----------------------------------------------------------------------
// 1. Interface Definition
// ----------------------------------------------------------------------
interface ValidatedInputProps extends FormInputProps {
  fieldType?: "username" | "email" | "postTitle" | "slug" | "normal";
  entityType?: "user" | "post";
  checkBusinessRules?: boolean;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  value,
  onChange,
  fieldType = "normal",
  entityType,
  checkBusinessRules = false,
  error: externalError,
  ...props
}) => {
  const [internalError, setInternalError] = useState("");

  // --------------------------------------------------------------------
  // 2. Validation Logic
  // --------------------------------------------------------------------
  const validateField = (
    val: string | number | readonly string[] | undefined
  ) => {
    const strVal = String(val || "");
    setInternalError("");

    if (!strVal) return;

    // [Username Validation]
    if (fieldType === "username") {
      if (strVal.length < 3) {
        setInternalError("사용자명은 3자 이상이어야 합니다");
      } else if (!/^[a-zA-Z0-9_]+$/.test(strVal)) {
        setInternalError("영문, 숫자, 언더스코어만 사용 가능합니다");
      } else if (strVal.length > 20) {
        setInternalError("사용자명은 20자 이하여야 합니다");
      }

      if (checkBusinessRules) {
        const reservedWords = ["admin", "root", "system", "administrator"];
        if (reservedWords.includes(strVal.toLowerCase())) {
          setInternalError("예약된 사용자명입니다");
        }
      }
    }
    // [Email Validation]
    else if (fieldType === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strVal)) {
        setInternalError("올바른 이메일 형식이 아닙니다");
      }

      if (checkBusinessRules && entityType === "user") {
        if (
          !strVal.endsWith("@company.com") &&
          !strVal.endsWith("@example.com")
        ) {
          setInternalError(
            "회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다"
          );
        }
      }
    }
    // [Post Title Validation]
    else if (fieldType === "postTitle") {
      if (strVal.length < 5) {
        setInternalError("제목은 5자 이상이어야 합니다");
      } else if (strVal.length > 100) {
        setInternalError("제목은 100자 이하여야 합니다");
      }

      if (checkBusinessRules && entityType === "post") {
        const bannedWords = ["광고", "스팸", "홍보"];
        const hasBannedWord = bannedWords.some((word) => strVal.includes(word));
        if (hasBannedWord) {
          setInternalError("제목에 금지된 단어가 포함되어 있습니다");
        }
      }
    }
  };

  // --------------------------------------------------------------------
  // 3. Event Handler (Fix Type Error)
  // ✅ ChangeEvent 대신 string 값을 직접 받습니다.
  // (FormInput이 이미 e.target.value를 추출해서 넘겨주기 때문)
  // --------------------------------------------------------------------
  const handleChange = (newValue: string) => {
    // 1. 부모에게 값 전달 (string)
    if (onChange) onChange(newValue);

    // 2. 내부 검증 실행
    validateField(newValue);
  };

  const displayError = externalError || internalError;

  return (
    <FormInput
      {...props}
      value={value}
      onChange={handleChange} // (value: string) => void 타입 일치!
      error={displayError}
    />
  );
};
