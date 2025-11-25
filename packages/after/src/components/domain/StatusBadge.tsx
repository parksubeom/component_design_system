import React from "react";
import { Badge, type BadgeProps } from "@/components/ui/Badge";

// ----------------------------------------------------------------------
// 1. Interface Definition (Legacy Support)
// 기존 Badge가 받던 도메인 Props를 그대로 지원합니다.
// ----------------------------------------------------------------------
interface StatusBadgeProps extends Omit<BadgeProps, "children" | "variant"> {
  children?: React.ReactNode;
  variant?: BadgeProps["variant"]; // 사용자가 직접 지정할 경우를 위해

  // 🚨 Legacy Domain Props
  status?: string; // 'published' | 'draft' ...
  userRole?: string; // 'admin' | 'user' ...
  priority?: string; // 'high' | 'medium' ...
  paymentStatus?: string; // 'paid' | 'pending' ...
  showIcon?: boolean; // (Legacy 호환용 - 아이콘 구현은 생략하거나 추후 추가)
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  variant,
  status,
  userRole,
  priority,
  paymentStatus,
  showIcon, // 필요하다면 아이콘 로직 추가 가능
  ...props
}) => {
  // --------------------------------------------------------------------
  // 2. Logic Processing (Legacy Logic Porting)
  // --------------------------------------------------------------------
  
  let computedVariant: BadgeProps["variant"] = variant || "primary";
  let computedChildren = children;

  // [Rule 1] Status Logic
  if (status) {
    switch (status) {
      case "published":
      case "active": // ManagementPage에서 active 사용됨
        computedVariant = "success";
        computedChildren = computedChildren || "게시됨";
        if (status === "active") computedChildren = "활성";
        break;
      case "draft":
      case "inactive":
        computedVariant = "warning";
        computedChildren = computedChildren || "임시저장";
        if (status === "inactive") computedChildren = "비활성";
        break;
      case "archived":
        computedVariant = "secondary";
        computedChildren = computedChildren || "보관됨";
        break;
      case "pending":
        computedVariant = "info";
        computedChildren = computedChildren || "대기중";
        break;
      case "rejected":
      case "suspended":
        computedVariant = "destructive"; // BDS: danger -> destructive
        computedChildren = computedChildren || "거부됨";
        if (status === "suspended") computedChildren = "정지";
        break;
    }
  }

  // [Rule 2] UserRole Logic
  if (userRole) {
    switch (userRole) {
      case "admin":
        computedVariant = "destructive";
        computedChildren = computedChildren || "관리자";
        break;
      case "moderator":
        computedVariant = "warning";
        computedChildren = computedChildren || "운영자";
        break;
      case "user":
        computedVariant = "primary"; // BDS: primary -> default
        computedChildren = computedChildren || "사용자";
        break;
      case "guest":
        computedVariant = "secondary";
        computedChildren = computedChildren || "게스트";
        break;
    }
  }

  // [Rule 3] Priority Logic
  if (priority) {
    switch (priority) {
      case "high":
        computedVariant = "destructive";
        computedChildren = computedChildren || "높음";
        break;
      case "medium":
        computedVariant = "warning";
        computedChildren = computedChildren || "보통";
        break;
      case "low":
        computedVariant = "info";
        computedChildren = computedChildren || "낮음";
        break;
    }
  }

  // [Rule 4] PaymentStatus Logic
  if (paymentStatus) {
    switch (paymentStatus) {
      case "paid":
        computedVariant = "success";
        computedChildren = computedChildren || "결제완료";
        break;
      case "pending":
        computedVariant = "warning";
        computedChildren = computedChildren || "결제대기";
        break;
      case "failed":
        computedVariant = "destructive";
        computedChildren = computedChildren || "결제실패";
        break;
      case "refunded":
        computedVariant = "secondary";
        computedChildren = computedChildren || "환불됨";
        break;
    }
  }

  // --------------------------------------------------------------------
  // 3. Rendering
  // --------------------------------------------------------------------
  return (
    <Badge variant={computedVariant} {...props}>
      {computedChildren}
    </Badge>
  );
};