import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string; // ✅ Title 필수 (헤더가 항상 있어야 하므로)
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  
  // Action Props
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;

  // Custom Footer (Legacy support)
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

  // Scroll Lock
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent 
        className={cn(
          "bg-white text-foreground border-border p-0 gap-0 flex flex-col font-sans",
          "max-h-[90vh] shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)]",
          sizeClasses[size],
          className
        )}
      >
        {/* ✅ [Header] 항상 렌더링 */}
        <DialogHeader className="px-6 py-4 border-b border-[rgba(0,0,0,0.12)] flex-shrink-0 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-[1.25rem] font-medium leading-none text-[rgba(0,0,0,0.87)]">
            {title}
          </DialogTitle>
          
          <DialogDescription className={cn(!description && "sr-only")}>
            {description || title}
          </DialogDescription>
        </DialogHeader>

        {/* ✅ [Body] Scrollable */}
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>

        {/* ✅ [Footer] 항상 렌더링 */}
        <DialogFooter className="px-6 py-4 border-t border-[rgba(0,0,0,0.12)] sm:justify-end gap-2 flex-shrink-0 bg-white">
          {footerContent ? (
            footerContent
          ) : (
            <>
              <Button variant="secondary" size="md" onClick={onClose}>
                {cancelText}
              </Button>
              {/* onConfirm이 있을 때만 확인 버튼 표시 (혹은 항상 표시하고 싶다면 조건 제거) */}
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