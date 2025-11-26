import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button"; // BDS Button
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

// ----------------------------------------------------------------------
// 1. Interface Definition (Legacy + Modern Support)
// 레거시 모달의 Props를 모두 지원하면서, 편의 기능을 추가했습니다.
// ----------------------------------------------------------------------
interface ModalProps {
  // [Legacy Props] 기존 코드와 호환성 유지
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  showFooter?: boolean; // 레거시 호환 (이제는 footerContent 유무로 판단 가능하지만 유지)
  footerContent?: React.ReactNode; // 레거시 호환 (커스텀 푸터)

  // [Modern Props] 리팩터링된 페이지를 위한 편의 기능
  onConfirm?: () => void; // 확인 버튼 핸들러
  confirmText?: string; // 확인 버튼 텍스트 (기본: "확인")
  cancelText?: string; // 취소 버튼 텍스트 (기본: "취소")

  description?: string; // 접근성용
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  showFooter = false, // 레거시 기본값 false 유지
  footerContent,

  // Modern Defaults
  onConfirm,
  confirmText = "확인",
  cancelText = "취소",

  description,
  className,
}) => {
  // 2. Size Mapping (Legacy CSS: 400px / 600px / 900px)
  const sizeClasses = {
    small: "max-w-[400px]",
    medium: "max-w-[600px]",
    large: "max-w-[900px]",
  };

  // Radix Dialog와 호환을 위한 핸들러 어댑터
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  // 푸터를 보여줄지 결정하는 로직
  // 1. showFooter가 true이고 footerContent가 있을 때 (레거시 방식)
  // 2. onConfirm 함수가 전달되었을 때 (모던 방식 - 자동 버튼 생성)
  const shouldShowFooter = (showFooter && footerContent) || onConfirm;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          // [Base Styles]
          // bg-white, rounded-[4px] (Legacy border-radius)
          // font-sans (Arial/Roboto)
          "bg-white text-foreground border-border p-0 gap-0 flex flex-col font-sans rounded-lg",

          // [Shadow] Legacy box-shadow 완벽 이식
          "shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)]",

          // [Layout] 화면 꽉 참 방지 및 스크롤 처리
          "max-h-[90vh]",

          sizeClasses[size],
          className
        )}
      >
        {/* Header Area */}
        {/* padding: 16px 24px -> py-4 px-6 (Tailwind 기준 1rem=16px, 1.5rem=24px) */}
        {/* border-bottom: 1px solid rgba(0,0,0,0.12) */}
        {title ? (
          <DialogHeader className="px-6 py-4 border-b border-[rgba(0,0,0,0.12)] shrink-0 flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-[1.25rem] font-medium leading-none text-[rgba(0,0,0,0.87)]">
              {title}
            </DialogTitle>

            <DialogDescription className={cn(!description && "sr-only")}>
              {description || title}
            </DialogDescription>

            {/* Close Button (Legacy Style) */}
            <button
              className="rounded-full p-1 opacity-54 hover:opacity-100 hover:bg-[rgba(0,0,0,0.04)] transition-all focus:outline-none"
              onClick={onClose}
            >
              <X className="h-7 w-7 text-[rgba(0,0,0,0.54)]" />{" "}
              {/* Size adjusted for visual match */}
              <span className="sr-only">Close</span>
            </button>
          </DialogHeader>
        ) : (
          <VisuallyHidden.Root>
            <DialogTitle>Modal</DialogTitle>
          </VisuallyHidden.Root>
        )}

        {/* Body Area */}
        {/* padding: 24px -> p-6 */}
        <div className="flex-1 p-6 overflow-y-auto">{children}</div>

        {/* Footer Area */}
        {/* padding: 16px 24px -> px-6 py-4 */}
        {shouldShowFooter && (
          <DialogFooter className="px-6 py-4 border-t border-[rgba(0,0,0,0.12)] sm:justify-end gap-2 shrink-0 bg-white">
            {footerContent ? (
              // Case A: 레거시 커스텀 푸터 (그대로 렌더링)
              footerContent
            ) : (
              // Case B: 자동 생성 버튼 (모던 방식)
              <>
                <Button variant="secondary" size="md" onClick={onClose}>
                  {cancelText}
                </Button>
                <Button variant="primary" size="md" onClick={onConfirm}>
                  {confirmText}
                </Button>
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
