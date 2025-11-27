import React from "react";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormTextarea } from "@/components/ui/FormTextarea";
import { ValidatedInput } from "@/components/domain/ValidatedInput";

// ⚠️ [Assumption] Post 타입은 서비스 파일에서 가져왔다고 가정합니다.
import type { Post } from "@/services/postService";

// ------------------------------------------------------------------
// Type Definition: any 대신 Partial<Post>를 사용하여 타입 안정성 확보
// ------------------------------------------------------------------
interface PostFormProps {
  // 폼은 Post 객체의 모든 필드를 가질 필요는 없고, 일부만 가질 수 있으므로 Partial 사용
  formData: Partial<Post>;
  setFormData: (data: Partial<Post>) => void;
}

export const PostForm: React.FC<PostFormProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <>
      <ValidatedInput
        name="title"
        value={formData.title || ""}
        // formData가 Partial<Post>이므로, title은 Post의 속성만 가질 수 있습니다.
        onChange={(value) => setFormData({ ...formData, title: value })}
        label="제목"
        placeholder="게시글 제목을 입력하세요"
        required
        width="full"
        fieldType="postTitle"
        checkBusinessRules
        entityType="post"
      />
      <div className="grid grid-cols-2 gap-4">
        <ValidatedInput
          name="author"
          value={formData.author || ""}
          // author 속성도 안전하게 사용
          onChange={(value) => setFormData({ ...formData, author: value })}
          label="작성자"
          placeholder="작성자명"
          required
          width="full"
        />
        <FormSelect
          name="category"
          value={formData.category || ""}
          onChange={(value) => setFormData({ ...formData, category: value })}
          options={[
            { value: "development", label: "Development" },
            { value: "design", label: "Design" },
            { value: "accessibility", label: "Accessibility" },
          ]}
          label="카테고리"
          size="md"
        />
      </div>
      <FormTextarea
        name="content"
        value={formData.content || ""}
        // content 속성도 안전하게 사용
        onChange={(value) => setFormData({ ...formData, content: value })}
        label="내용"
        placeholder="게시글 내용을 입력하세요"
        rows={6}
      />
    </>
  );
};
