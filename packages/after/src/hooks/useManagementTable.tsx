import  type { Column } from "@/components/domain/DataTable";
import { ActionButton } from "@/components/domain/ActionButton";
import { StatusBadge } from "@/components/domain/StatusBadge";
import type { User } from "@/services/userService";
import type { Post } from "@/services/postService";

// 타입 정의 (Entity 공통 타입)
type Entity = User | Post;
type EntityType = "user" | "post";

interface UseManagementTableProps {
  entityType: EntityType;
  onEdit: (item: Entity) => void;
  onDelete: (id: number) => void;
  onStatusAction: (id: number, action: "publish" | "archive" | "restore") => void;
}

export const useManagementTable = ({
  entityType,
  onEdit,
  onDelete,
  onStatusAction,
}: UseManagementTableProps) => {
  
  // 1. 액션 버튼 렌더러 (Logic Encapsulation)
  const renderActions = (row: Entity) => (
    <div className="flex gap-2 flex-wrap">
      <ActionButton 
        action="edit" 
        size="sm" 
        entityType={entityType} 
        entity={row} 
        onClick={() => onEdit(row)} 
      />
      
      {entityType === "post" && (
        <>
          {(row as Post).status === 'draft' && (
             <ActionButton action="publish" size="sm" entityType={entityType} entity={row} onClick={() => onStatusAction(row.id, "publish")} />
          )}
          {(row as Post).status === 'published' && (
             <ActionButton action="archive" size="sm" entityType={entityType} entity={row} onClick={() => onStatusAction(row.id, "archive")} />
          )}
          {(row as Post).status === 'archived' && (
             <ActionButton action="restore" size="sm" entityType={entityType} entity={row} onClick={() => onStatusAction(row.id, "restore")} />
          )}
        </>
      )}
      
      <ActionButton 
        action="delete" 
        size="sm" 
        entityType={entityType} 
        entity={row} 
        onClick={() => onDelete(row.id)} 
      />
    </div>
  );

  // 2. 컬럼 정의 (Configuration)
  const columns: Column<Entity>[] = entityType === "user" 
    ? [
        { key: "id", header: "ID", width: "60px" },
        { key: "username", header: "사용자명", width: "150px" },
        { key: "email", header: "이메일" },
        { 
          key: "role", header: "역할", width: "120px", 
          render: (row) => <StatusBadge userRole={(row as User).role} /> 
        },
        { 
          key: "status", header: "상태", width: "120px", 
          render: (row) => <StatusBadge status={(row as User).status} pill /> 
        },
        { key: "createdAt", header: "생성일", width: "120px" },
        { key: "lastLogin", header: "마지막 로그인", width: "140px" },
        { key: "actions", header: "관리", width: "200px", render: renderActions },
      ]
    : [
        { key: "id", header: "ID", width: "60px" },
        { key: "title", header: "제목" },
        { key: "author", header: "작성자", width: "120px" },
        { 
          key: "category", header: "카테고리", width: "140px", 
          render: (row) => {
            const postRow = row as Post;
            const variantMap: any = { development: 'primary', design: 'info', accessibility: 'destructive' };
            return <StatusBadge variant={variantMap[postRow.category] || 'secondary'} pill>{postRow.category}</StatusBadge>;
          }
        },
        { 
          key: "status", header: "상태", width: "120px", 
          render: (row) => <StatusBadge status={(row as Post).status} /> 
        },
        { 
          key: "views", header: "조회수", width: "100px", 
          render: (row) => (row as Post).views?.toLocaleString() || "0" 
        },
        { key: "createdAt", header: "작성일", width: "120px" },
        { key: "actions", header: "관리", width: "250px", render: renderActions },
      ];

  return columns;
};