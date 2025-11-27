import { useState, useEffect } from "react";
import { userService } from "@/services/userService";
import { postService } from "@/services/postService";
import { useManagementTable } from "@/hooks/useManagementTable";
import type { User } from "@/services/userService";
import type { Post } from "@/services/postService";

export type EntityType = "user" | "post";
export type Entity = User | Post;

export const useManagementPage = () => {
  // 1. State
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [formData, setFormData] = useState<any>({});

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 2. Data Fetching
  const loadData = async () => {
    try {
      const result = entityType === "user" 
        ? await userService.getAll() 
        : await postService.getAll();
      setData(result);
    } catch (error: any) {
      setErrorMessage("데이터를 불러오는데 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  useEffect(() => {
    loadData();
    handleCloseModal();
  }, [entityType]);

  // 3. Handlers
  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setFormData({});
    setSelectedItem(null);
  };

  const handleCreate = async () => {
    try {
      if (entityType === "user") {
        await userService.create({
          username: formData.username,
          email: formData.email,
          role: formData.role || "user",
          status: formData.status || "active",
        });
      } else {
        await postService.create({
          title: formData.title,
          content: formData.content || "",
          author: formData.author,
          category: formData.category,
          status: formData.status || "draft",
        });
      }
      await loadData();
      handleCloseModal();
      setAlertMessage(`${entityType === "user" ? "사용자" : "게시글"}가 생성되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "생성에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);
    if (entityType === "user") {
      const user = item as User;
      setFormData({ username: user.username, email: user.email, role: user.role, status: user.status });
    } else {
      const post = item as Post;
      setFormData({ title: post.title, content: post.content, author: post.author, category: post.category, status: post.status });
    }
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;
    try {
      if (entityType === "user") await userService.update(selectedItem.id, formData);
      else await postService.update(selectedItem.id, formData);

      await loadData();
      handleCloseModal();
      setAlertMessage(`${entityType === "user" ? "사용자" : "게시글"}가 수정되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "수정에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      if (entityType === "user") await userService.delete(id);
      else await postService.delete(id);

      await loadData();
      setAlertMessage("삭제되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "삭제에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleStatusAction = async (id: number, action: "publish" | "archive" | "restore") => {
    if (entityType !== "post") return;
    try {
      if (action === "publish") await postService.publish(id);
      else if (action === "archive") await postService.archive(id);
      else if (action === "restore") await postService.restore(id);

      await loadData();
      const message = action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "작업에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  // 4. Computed Values (Modal Config)
  const isEditMode = isEditModalOpen;
  const entityName = entityType === "user" ? "사용자" : "게시글";
  const modalTitle = isEditMode ? `${entityName} 수정` : `새 ${entityName} 만들기`;
  const submitLabel = isEditMode ? "수정 완료" : "생성";
  const handleSubmit = isEditMode ? handleUpdate : handleCreate;

  // 5. Table Config (Inner Hook)
  const columns = useManagementTable({
    entityType,
    onEdit: handleEdit,
    onDelete: handleDelete,
    onStatusAction: handleStatusAction,
  });

  // 6. Return Interface
  return {
    state: {
      entityType,
      data,
      isCreateModalOpen,
      isEditModalOpen,
      selectedItem,
      formData,
      showSuccessAlert,
      alertMessage,
      showErrorAlert,
      errorMessage,
      isEditMode,
    },
    actions: {
      setEntityType,
      setFormData,
      openCreateModal: () => setIsCreateModalOpen(true),
      closeModal: handleCloseModal,
      handleSubmit,
      setShowSuccessAlert,
      setShowErrorAlert,
    },
    computed: {
      modalTitle,
      submitLabel,
    },
    table: {
      columns,
    },
  };
};