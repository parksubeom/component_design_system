import { useState } from "react";
import { userService } from "@/services/userService";
import { postService } from "@/services/postService";
import type { EntityType, Entity } from "./useEntityData";

interface UseEntityActionsProps {
  entityType: EntityType;
  loadData: () => Promise<void>;
  closeModal: () => void;
}

export const useEntityActions = ({ entityType, loadData, closeModal }: UseEntityActionsProps) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleCreate = async (formData: any) => {
    try {
      if (entityType === "user") {
        await userService.create({
          ...formData,
          role: formData.role || "user",
          status: formData.status || "active",
        });
      } else {
        await postService.create({
          ...formData,
          content: formData.content || "",
          status: formData.status || "draft",
        });
      }
      await loadData();
      closeModal();
      setSuccessMessage(`${entityType === "user" ? "사용자" : "게시글"}가 생성되었습니다`);
    } catch (err: any) {
      setActionError(err.message || "생성에 실패했습니다");
    }
  };

  const handleUpdate = async (id: number, formData: any) => {
    try {
      if (entityType === "user") await userService.update(id, formData);
      else await postService.update(id, formData);

      await loadData();
      closeModal();
      setSuccessMessage(`${entityType === "user" ? "사용자" : "게시글"}가 수정되었습니다`);
    } catch (err: any) {
      setActionError(err.message || "수정에 실패했습니다");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      if (entityType === "user") await userService.delete(id);
      else await postService.delete(id);

      await loadData();
      setSuccessMessage("삭제되었습니다");
    } catch (err: any) {
      setActionError(err.message || "삭제에 실패했습니다");
    }
  };

  const handleStatusAction = async (id: number, action: "publish" | "archive" | "restore") => {
    try {
      if (action === "publish") await postService.publish(id);
      else if (action === "archive") await postService.archive(id);
      else if (action === "restore") await postService.restore(id);

      await loadData();
      const msg = action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      setSuccessMessage(`${msg}되었습니다`);
    } catch (err: any) {
      setActionError(err.message || "작업에 실패했습니다");
    }
  };

  return {
    successMessage,
    setSuccessMessage,
    actionError,
    setActionError,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleStatusAction,
  };
};