import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/Button';

// ----------------------------------------------------------------------
// 1. Interface Definition
// ----------------------------------------------------------------------
interface ActionButtonProps extends Omit<ButtonProps, 'children'> {
  children?: React.ReactNode; 
  
  // ✅ [Fix] 'restore' 타입 추가
  entityType?: 'user' | 'post';
  action?: 'create' | 'edit' | 'delete' | 'publish' | 'archive' | 'restore';
  entity?: any; 
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  disabled,
  variant,
  entityType,
  action,
  entity,
  ...props
}) => {
  
  let computedDisabled = disabled;
  let computedVariant = variant || 'primary';
  let computedChildren = children;

  if (entityType && action && entity) {
    
    // [Rule 1] Auto-Disabled Logic
    if (entityType === 'user' && action === 'delete' && entity.role === 'admin') {
      computedDisabled = true;
    }
    // (기존 로직 유지...)
    if (entityType === 'post' && action === 'publish' && entity.status === 'published') {
      computedDisabled = true;
    }
    if (entityType === 'post' && action === 'archive' && entity.status !== 'published') {
      computedDisabled = true;
    }
    // ✅ 복원(restore)은 보관된(archived) 상태에서만 가능
    if (entityType === 'post' && action === 'restore' && entity.status !== 'archived') {
      computedDisabled = true;
    }

    // [Rule 2] Auto-Labeling
    if (!children) {
      const labelMap: Record<string, string> = {
        create: `새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`,
        edit: '수정',
        delete: '삭제',
        publish: '게시',
        archive: '보관',
        // ✅ [Fix] 복원 라벨 추가
        restore: '복원',
      };
      computedChildren = labelMap[action] || '';
    }

    // [Rule 3] Auto-Variant
    if (action === 'delete') computedVariant = 'danger';
    if (action === 'publish') computedVariant = 'success';
    if (action === 'archive') computedVariant = 'secondary';
    // ✅ [Fix] 복원 버튼 스타일 (눈에 띄면서도 구분되게)
    if (action === 'restore') computedVariant = 'outline'; 
  }

  return (
    <Button
      {...props}
      variant={computedVariant}
      disabled={computedDisabled}
    >
      {computedChildren}
    </Button>
  );
};