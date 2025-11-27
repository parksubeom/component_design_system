import React, { useState, useEffect } from "react";
import { Alert, Modal } from "../components/ui";
import { Card, CardStatsLabel, CardStatsValue } from "@/components/ui/Card";
import { DataTable } from "../components/domain/DataTable";
import { ActionButton as Button } from "@/components/domain/ActionButton";
import { UserForm } from "@/components/domain/UserForm";
import { PostForm } from "@/components/domain/PostForm";
import type { Column } from "@/components/domain/DataTable";
import { StatusBadge } from "@/components/domain/StatusBadge";
import { userService } from "../services/userService";
import { postService } from "../services/postService";
import type { User } from "../services/userService";
import type { Post } from "../services/postService";
import "../styles/components.css";

type EntityType = "user" | "post";
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
    setFormData({});
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType]);

  const loadData = async () => {
    try {
      let result: Entity[];

      if (entityType === "user") {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }

      setData(result);
    } catch (error: any) {
      setErrorMessage("데이터를 불러오는데 실패했습니다");
      setShowErrorAlert(true);
    }
  };

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
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage(
        `${entityType === "user" ? "사용자" : "게시글"}가 생성되었습니다`
      );
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
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      const post = item as Post;
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
        status: post.status,
      });
    }

    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      if (entityType === "user") {
        await userService.update(selectedItem.id, formData);
      } else {
        await postService.update(selectedItem.id, formData);
      }

      await loadData();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedItem(null);
      setAlertMessage(
        `${entityType === "user" ? "사용자" : "게시글"}가 수정되었습니다`
      );
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "수정에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      if (entityType === "user") {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      setAlertMessage("삭제되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "삭제에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleStatusAction = async (
    id: number,
    action: "publish" | "archive" | "restore"
  ) => {
    if (entityType !== "post") return;

    try {
      if (action === "publish") {
        await postService.publish(id);
      } else if (action === "archive") {
        await postService.archive(id);
      } else if (action === "restore") {
        await postService.restore(id);
      }

      await loadData();
      const message =
        action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "작업에 실패했습니다");
      setShowErrorAlert(true);
    }
  };
  const isEditMode = isEditModalOpen;
  const entityName = entityType === "user" ? "사용자" : "게시글";

  // 1. 모달 제목 (Header)
  const modalTitle = isEditMode 
    ? `${entityName} 수정` 
    : `새 ${entityName} 만들기`;

  // 2. 확인 버튼 텍스트 (Footer)
  const submitLabel = isEditMode ? "수정 완료" : "생성";

  // 3. 확인 버튼 함수 (Footer)
  const handleSubmit = isEditMode ? handleUpdate : handleCreate
  //Table 컴포넌트에 로직을 위임하여 간소화
  const renderTableColumns = (): Column<Entity>[] => {
    const renderActions = (row: Entity) => (
      <div className="flex gap-2 flex-wrap">
        {/* 1. 수정 버튼 (Edit) */}
        <Button
          action="edit"
          size="sm"
          entityType={entityType} // ✅ 추가됨
          entity={row} // ✅ 추가됨
          onClick={() => handleEdit(row)}
        />

        {entityType === "post" && (
          <>
            {/* 2. 게시 버튼 (Publish -> Success Color) */}
            {(row as Post).status === "draft" && (
              <Button
                action="publish"
                size="sm"
                entityType={entityType}
                entity={row}
                onClick={() => handleStatusAction(row.id, "publish")}
              />
            )}

            {/* 3. 보관 버튼 (Archive -> Secondary Color) */}
            {(row as Post).status === "published" && (
              <Button
                action="archive"
                size="sm"
                entityType={entityType} // ✅ 추가됨 (이게 있어야 secondary로 변함)
                entity={row} // ✅ 추가됨
                onClick={() => handleStatusAction(row.id, "archive")}
              />
            )}

            {/* 4. 복원 버튼 (Restore -> Outline Style) */}
            {(row as Post).status === "archived" && (
              <Button
                action="restore"
                size="sm"
                entityType={entityType} // ✅ 추가됨 (이게 있어야 outline으로 변함)
                entity={row} // ✅ 추가됨
                onClick={() => handleStatusAction(row.id, "restore")}
              />
            )}
          </>
        )}

        {/* 5. 삭제 버튼 (Delete -> Danger Color) */}
        {/* 이건 기존에도 잘 되고 있었습니다 */}
        <Button
          action="delete"
          size="sm"
          entityType={entityType}
          entity={row}
          onClick={() => handleDelete(row.id)}
        />
      </div>
    );
    if (entityType === "user") {
      // 3. User 컬럼 정의: row를 'User'로 명시
      return [
        { key: "id", header: "ID", width: "60px" },
        { key: "username", header: "사용자명", width: "150px" },
        { key: "email", header: "이메일" },
        {
          key: "role",
          header: "역할",
          width: "120px",
          render: (row: Entity) => (
            <StatusBadge userRole={(row as User).role} />
          ),
        },
        {
          key: "status",
          header: "상태",
          width: "120px",
          render: (row: Entity) => (
            <StatusBadge status={(row as User).status} pill />
          ),
        },
        { key: "createdAt", header: "생성일", width: "120px" },
        { key: "lastLogin", header: "마지막 로그인", width: "140px" },
        {
          key: "actions",
          header: "관리",
          width: "200px",
          render: renderActions,
        },
      ];
    } else {
      // 4. Post 컬럼 정의: row를 'Post'로 명시 (여기선 Entity로 통일하고 내부 캐스팅)
      return [
        { key: "id", header: "ID", width: "60px" },
        { key: "title", header: "제목" },
        { key: "author", header: "작성자", width: "120px" },
        {
          key: "category",
          header: "카테고리",
          width: "140px",
          render: (row: Entity) => {
            const postRow = row as Post;
            const variantMap: any = {
              development: "primary",
              design: "info",
              accessibility: "destructive",
            };
            return (
              <StatusBadge
                variant={variantMap[postRow.category] || "secondary"}
                pill
              >
                {postRow.category}
              </StatusBadge>
            );
          },
        },
        {
          key: "status",
          header: "상태",
          width: "120px",
          render: (row: Entity) => (
            <StatusBadge status={(row as Post).status} />
          ),
        },
        {
          key: "views",
          header: "조회수",
          width: "100px",
          render: (row: Entity) => (row as Post).views?.toLocaleString() || "0",
        },
        { key: "createdAt", header: "작성일", width: "120px" },
        {
          key: "actions",
          header: "관리",
          width: "250px",
          render: renderActions,
        },
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-5">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1 text-gray-800">관리 시스템</h1>
          <p className="text-gray-600 text-sm">사용자와 게시글을 관리하세요</p>
        </div>

        <Card className="bg-white border border-gray-200 p-2.5">
          <div className="mb-[15px] border-b-2 border-bum-gray-350 pb-[5px] flex gap-[5px]">
            <Button
              variant={entityType === "post" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setEntityType("post")}
            >
              게시글
            </Button>
            <Button
              variant={entityType === "user" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setEntityType("user")}
            >
              사용자
            </Button>
          </div>

          <div>
            <div className="mb-4 flex justify-end">
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsCreateModalOpen(true)}
              >
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div className="mb-2.5">
                <Alert
                  variant="success"
                  title="성공"
                  onClose={() => setShowSuccessAlert(false)}
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
                  onClose={() => setShowErrorAlert(false)}
                >
                  {errorMessage}
                </Alert>
              </div>
            )}

            {/* Stats Grid: Card Component & Map Migration */}
            {(() => {
              // 1. 통계 데이터 정의 (UI에 필요한 정보만 추상화)
              const statsList =
                entityType === "user"
                  ? [
                      {
                        label: "전체",
                        value: (data as User[]).length,
                        color: "blue",
                      },
                      {
                        label: "활성",
                        value: (data as User[]).filter(
                          (u) => u.status === "active"
                        ).length,
                        color: "green",
                      },
                      {
                        label: "비활성",
                        value: (data as User[]).filter(
                          (u) => u.status === "inactive"
                        ).length,
                        color: "orange",
                      },
                      {
                        label: "정지",
                        value: (data as User[]).filter(
                          (u) => u.status === "suspended"
                        ).length,
                        color: "red",
                      },
                      // 관리자는 회색 박스지만 텍스트는 파란색인 특수 케이스
                      {
                        label: "관리자",
                        value: (data as User[]).filter(
                          (u) => u.role === "admin"
                        ).length,
                        color: "gray",
                        textColorOverride: "text-bum-blue-main",
                      },
                    ]
                  : [
                      {
                        label: "전체",
                        value: (data as Post[]).length,
                        color: "blue",
                      },
                      {
                        label: "게시됨",
                        value: (data as Post[]).filter(
                          (p) => p.status === "published"
                        ).length,
                        color: "green",
                      },
                      {
                        label: "임시저장",
                        value: (data as Post[]).filter(
                          (p) => p.status === "draft"
                        ).length,
                        color: "orange",
                      },
                      {
                        label: "보관됨",
                        value: (data as Post[]).filter(
                          (p) => p.status === "archived"
                        ).length,
                        color: "red",
                      },
                      {
                        label: "총 조회수",
                        value: (data as Post[]).reduce(
                          (sum, p) => sum + p.views,
                          0
                        ),
                        color: "gray",
                        textColorOverride: "text-bum-gray-700",
                      },
                    ];

              // 2. 렌더링 (Card 컴포넌트 재사용)
              return (
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
              );
            })()}

            <div className="border border-gray-200 bg-white overflow-x-auto">
              <DataTable
                columns={renderTableColumns()}
                data={data}
                striped
                hover
              />
            </div>
          </div>
        </Card>
      </div>

      <Modal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        size="large"
        
        // Footer 설정: 함수와 텍스트만 넘김
        onConfirm={handleSubmit}
        confirmText={submitLabel}
      >
        {/* Content */}
        <div className="space-y-4">
          {isEditMode && selectedItem && (
            <Alert variant="info">
              ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
              {entityType === "post" && ` | 조회수: ${(selectedItem as Post).views}`}
            </Alert>
          )}

          {entityType === "user" ? (
            <UserForm formData={formData} setFormData={setFormData} />
          ) : (
            <PostForm formData={formData} setFormData={setFormData} />
          )}
        </div>
      </Modal>
    </div>
  );
};
