import React from "react";
// ✅ 1. UI Components (BDS)
import { Alert, Modal } from "../components/ui"; // index.ts export 확인 필요
import { Card, CardStatsLabel, CardStatsValue } from "@/components/ui/Card";
import { DataTable } from "@/components/domain/DataTable";
import { Button } from "@/components/ui/Button"; // UI 버튼

// ✅ 2. Domain Components (Adapters)
import { ActionButton } from "@/components/domain/ActionButton";
import { UserForm } from "@/components/domain/UserForm";
import { PostForm } from "@/components/domain/PostForm";


// ✅ 3. Hooks & Services
import { useManagementPage } from "@/hooks/useManagementPage";
import type { User } from "@/services/userService";
import type { Post } from "@/services/postService";

// ✅ 4. Styles (Tokens)
import "../styles/components.css";

export const ManagementPage: React.FC = () => {
  // Hook: 모든 로직 가져오기
  const { state, actions, computed, table } = useManagementPage();

  // State 구조 분해
  const {
    entityType,
    data,
    formData,
    isCreateModalOpen,
    isEditModalOpen,
    selectedItem,
    showSuccessAlert,
    alertMessage,
    showErrorAlert,
    errorMessage,
    isEditMode,
  } = state;
  const { modalTitle, submitLabel } = computed;
  // View Logic: 통계 데이터 계산
  const statsList = (() => {
    if (entityType === "user") {
      const users = data as User[];
      return [
        { label: "전체", value: users.length, color: "blue" },
        { label: "활성", value: users.filter((u) => u.status === "active").length, color: "green" },
        { label: "비활성", value: users.filter((u) => u.status === "inactive").length, color: "orange" },
        { label: "정지", value: users.filter((u) => u.status === "suspended").length, color: "red" },
        { label: "관리자", value: users.filter((u) => u.role === "admin").length, color: "gray", textColorOverride: "text-bum-blue-main" },
      ];
    } else {
      const posts = data as Post[];
      return [
        { label: "전체", value: posts.length, color: "blue" },
        { label: "게시됨", value: posts.filter((p) => p.status === "published").length, color: "green" },
        { label: "임시저장", value: posts.filter((p) => p.status === "draft").length, color: "orange" },
        { label: "보관됨", value: posts.filter((p) => p.status === "archived").length, color: "red" },
        { label: "총 조회수", value: posts.reduce((sum, p) => sum + p.views, 0), color: "gray", textColorOverride: "text-bum-gray-700" },
      ];
    }
  })();

  return (
    <div className="min-h-screen bg-bum-bg-page">
      <div className="max-w-[1200px] mx-auto p-5">
        {/* Header Section */}
        <div className="mb-5">
          <h1 className="text-[24px] font-bold mb-[5px] text-bum-gray-800">
            관리 시스템
          </h1>
          <p className="text-bum-gray-600 text-[14px]">
            사용자와 게시글을 관리하세요
          </p>
        </div>

        {/* Content Card */}
        <Card className="p-2.5 shadow-none border-bum-gray-300 bg-white">
          
          {/* Tabs */}
          <div className="mb-[15px] border-b-2 border-bum-gray-350 pb-[5px] flex gap-[5px]">
            <Button
              variant={entityType === "post" ? "primary" : "secondary"}
              size="sm"
              onClick={() => actions.setEntityType("post")}
            >
              게시글
            </Button>
            <Button
              variant={entityType === "user" ? "primary" : "secondary"}
              size="sm"
              onClick={() => actions.setEntityType("user")}
            >
              사용자
            </Button>
          </div>

          <div>
            {/* Toolbar */}
            <div className="mb-[15px] flex justify-end">
              <ActionButton
                action="create"
                entityType={entityType}
                variant="primary"
                size="md"
                onClick={actions.openCreateModal}
              >새로 만들기
                </ActionButton>
            </div>

            {/* Alerts */}
            {showSuccessAlert && (
              <div className="mb-2.5">
                <Alert
                  variant="success"
                  title="성공"
                  onClose={() => actions.setShowSuccessAlert(false)}
                >
                  {alertMessage}
                </Alert>
              </div>
            )}
            {showErrorAlert && (
              <div className="mb-2.5">
                <Alert
                  variant="error"
                  title="오류"
                  onClose={() => actions.setShowErrorAlert(false)}
                >
                  {errorMessage}
                </Alert>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-[15px]">
              {statsList.map((stat, idx) => (
                <Card key={idx} variant="stats" color={stat.color as any}>
                  <CardStatsLabel>{stat.label}</CardStatsLabel>
                  <CardStatsValue
                    color={stat.color as any}
                    className={stat.textColorOverride}
                  >
                    {stat.value}
                  </CardStatsValue>
                </Card>
              ))}
            </div>

            {/* Table */}
            <div className="border border-bum-gray-300 bg-white overflow-auto">
              <DataTable
                columns={table.columns}
                data={data}
                striped
                hover
                searchable
                sortable
                pageSize={10}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={actions.closeModal}
        title={modalTitle}
        size="large"
        confirmText={submitLabel}
        onConfirm={actions.handleSubmit}
      >
        <div className="space-y-4">
          {isEditMode && selectedItem && (
            <Alert variant="info">
              ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
              {entityType === "post" &&
                ` | 조회수: ${(selectedItem as Post).views}`}
            </Alert>
          )}

          {/* Forms*/}
          {entityType === "user" ? (
            <UserForm formData={formData} setFormData={actions.setFormData} />
          ) : (
            <PostForm formData={formData} setFormData={actions.setFormData} />
          )}
        </div>
      </Modal>
    </div>
  );
};