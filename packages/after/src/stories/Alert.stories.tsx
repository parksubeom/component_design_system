import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "@/components/ui/Alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "info",
        "success",
        "warning",
        "error",
        "destructive",
      ],
      description: "알림의 의미론적 색상 스타일",
    },
    title: {
      control: "text",
      description: "알림 제목",
    },
    showIcon: {
      control: "boolean",
      description: "아이콘 표시 여부",
    },
    onClose: {
      action: "closed",
      description: "닫기 버튼 클릭 핸들러 (설정 시 닫기 버튼 표시)",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 형태 (Default)
export const Default: Story = {
  args: {
    variant: "default",
    title: "기본 알림",
    children: "일반적인 시스템 알림 메시지입니다.",
  },
};

// 2. 정보 (Info)
export const Info: Story = {
  args: {
    variant: "info",
    title: "안내",
    children: "새로운 기능이 업데이트되었습니다. 확인해보세요.",
  },
};

// 3. 성공 (Success)
export const Success: Story = {
  args: {
    variant: "success",
    title: "성공",
    children: "요청하신 작업이 성공적으로 완료되었습니다.",
  },
};

// 4. 경고 (Warning)
export const Warning: Story = {
  args: {
    variant: "warning",
    title: "주의",
    children: "이 작업은 되돌릴 수 없습니다. 신중하게 진행하세요.",
  },
};

// 5. 오류 (Error)
export const Error: Story = {
  args: {
    variant: "error",
    title: "오류 발생",
    children: "서버와 통신 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
};

// 6. 파괴적 (Destructive) - Error와 동일한 스타일
export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "삭제됨",
    children: "데이터가 영구적으로 삭제되었습니다.",
  },
};

// 7. 아이콘 없음 (No Icon)
export const NoIcon: Story = {
  args: {
    variant: "info",
    title: "아이콘 없는 알림",
    children: "아이콘 공간 없이 텍스트만 표시됩니다.",
    showIcon: false,
  },
};

// 8. 닫기 버튼 없음 (No Close Button)
export const NoCloseButton: Story = {
  args: {
    variant: "success",
    title: "닫기 버튼 없음",
    children: "onClose props를 전달하지 않으면 닫기 버튼이 숨겨집니다.",
    onClose: undefined,
  },
};

// 9. 제목 없음 (Description Only)
export const DescriptionOnly: Story = {
  args: {
    variant: "default",
    children: "제목 없이 내용만 있는 간단한 알림입니다.",
  },
};

// 10. 모든 변형 비교 (Gallery)
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <Alert variant="default" title="Default" onClose={() => {}}>
        기본 스타일입니다. (Gray)
      </Alert>
      <Alert variant="info" title="Info" onClose={() => {}}>
        정보 제공용 스타일입니다. (Blue)
      </Alert>
      <Alert variant="success" title="Success" onClose={() => {}}>
        성공 메시지용 스타일입니다. (Green)
      </Alert>
      <Alert variant="warning" title="Warning" onClose={() => {}}>
        경고 메시지용 스타일입니다. (Orange)
      </Alert>
      <Alert variant="error" title="Error" onClose={() => {}}>
        에러 메시지용 스타일입니다. (Red)
      </Alert>
    </div>
  ),
};
