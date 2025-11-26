import React from "react";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormTextarea } from "@/components/ui/FormTextarea";
import { ValidatedInput } from "@/components/domain/ValidatedInput";

interface PostFormProps {
  formData: any;
  setFormData: (data: any) => void;
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
        onChange={(value) => setFormData({ ...formData, content: value })}
        label="내용"
        placeholder="게시글 내용을 입력하세요"
        rows={6}
      />
    </>
  );
};
