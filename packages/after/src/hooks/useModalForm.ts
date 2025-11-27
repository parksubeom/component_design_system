import { useState } from "react";
import type { Entity } from "./useEntityData";

export const useModalForm = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [formData, setFormData] = useState<any>({});

  const openCreate = () => {
    setFormData({});
    setSelectedItem(null);
    setIsCreateOpen(true);
  };

  const openEdit = (item: Entity, initialData: any) => {
    setSelectedItem(item);
    setFormData(initialData);
    setIsEditOpen(true);
  };

  const close = () => {
    setIsCreateOpen(false);
    setIsEditOpen(false);
    setFormData({});
    setSelectedItem(null);
  };

  return {
    isOpen: isCreateOpen || isEditOpen,
    isEditMode: isEditOpen,
    isCreateOpen,
    isEditOpen,
    selectedItem,
    formData,
    setFormData,
    openCreate,
    openEdit,
    close,
  };
};