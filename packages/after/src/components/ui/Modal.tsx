import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";

  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;

  footerContent?: React.ReactNode;
  description?: string;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  onConfirm,
  confirmText = "확인",
  cancelText = "취소",
  footerContent,
  description,
  className,
}) => {
  const sizeClasses = {
    small: "max-w-[400px]",
    medium: "max-w-[600px]",
    large: "max-w-[900px]",
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          // ✅ [Fix] bg-white -> bg-card (다크모드 대응)
          "bg-card text-foreground border-border p-0 gap-0 flex flex-col font-sans",
          "max-h-[90vh]",
          // 그림자는 유지 (다크모드에서는 배경이 어두워져서 자연스럽게 묻힘)
          "shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)]",
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        <DialogHeader
          // ✅ [Fix] border-[rgba...] -> border-border
          className="px-6 py-4 border-b border-border shrink-0 flex flex-row items-center justify-between space-y-0"
        >
          <DialogTitle
            // ✅ [Fix] text-[rgba...] -> text-foreground
            className="text-[1.25rem] font-medium leading-none text-foreground"
          >
            {title}
          </DialogTitle>

          <DialogDescription className={cn(!description && "sr-only")}>
            {description || title}
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="flex-1 p-6 overflow-y-auto">{children}</div>

        {/* Footer */}
        <DialogFooter
          // ✅ [Fix] bg-white -> bg-card, border-[rgba...] -> border-border
          className="px-6 py-4 border-t border-border sm:justify-end gap-2 shrink-0 bg-card"
        >
          {footerContent ? (
            footerContent
          ) : (
            <>
              <Button variant="secondary" size="md" onClick={onClose}>
                {cancelText}
              </Button>
              {onConfirm && (
                <Button variant="primary" size="md" onClick={onConfirm}>
                  {confirmText}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
