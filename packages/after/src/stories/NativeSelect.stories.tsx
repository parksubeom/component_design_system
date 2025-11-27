import type { Meta, StoryObj } from "@storybook/react";
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "@/components/ui/NativeSelect"; // 파일명 대소문자 주의
import { Label } from "@/components/ui/Label";

const meta = {
  title: "UI/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[400px] p-6 border rounded-lg bg-white">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
  },
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 사용 (Default)
export const Default: Story = {
  render: (args) => (
    <NativeSelect {...args}>
      <NativeSelectOption value="" disabled selected>
        선택해주세요
      </NativeSelectOption>
      <NativeSelectOption value="apple">사과 (Apple)</NativeSelectOption>
      <NativeSelectOption value="banana">바나나 (Banana)</NativeSelectOption>
      <NativeSelectOption value="blueberry">
        블루베리 (Blueberry)
      </NativeSelectOption>
      <NativeSelectOption value="grapes">포도 (Grapes)</NativeSelectOption>
      <NativeSelectOption value="pineapple">
        파인애플 (Pineapple)
      </NativeSelectOption>
    </NativeSelect>
  ),
};

// 2. 라벨과 함께 사용 (With Label)
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="fruit">좋아하는 과일</Label>
      <NativeSelect id="fruit">
        <NativeSelectOption value="apple">사과</NativeSelectOption>
        <NativeSelectOption value="banana">바나나</NativeSelectOption>
        <NativeSelectOption value="orange">오렌지</NativeSelectOption>
      </NativeSelect>
      <p className="text-sm text-muted-foreground">
        가장 좋아하는 과일을 하나만 골라주세요.
      </p>
    </div>
  ),
};

// 3. 그룹핑된 옵션 (With OptGroup)
export const Grouped: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="food">음식 카테고리</Label>
      <NativeSelect id="food">
        <NativeSelectOption value="" disabled selected>
          음식을 선택하세요
        </NativeSelectOption>

        <NativeSelectOptGroup label="과일">
          <NativeSelectOption value="apple">사과</NativeSelectOption>
          <NativeSelectOption value="banana">바나나</NativeSelectOption>
        </NativeSelectOptGroup>

        <NativeSelectOptGroup label="채소">
          <NativeSelectOption value="carrot">당근</NativeSelectOption>
          <NativeSelectOption value="broccoli">브로콜리</NativeSelectOption>
        </NativeSelectOptGroup>

        <NativeSelectOptGroup label="고기">
          <NativeSelectOption value="pork">돼지고기</NativeSelectOption>
          <NativeSelectOption value="beef">소고기</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  ),
};

// 4. 비활성화 상태 (Disabled)
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>선택 불가</Label>
      <NativeSelect {...args}>
        <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
        <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

// 5. 폼 에러 상태 (Invalid)
export const Invalid: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label className="text-destructive">필수 항목</Label>
      <NativeSelect aria-invalid="true">
        <NativeSelectOption value="">선택해주세요</NativeSelectOption>
        <NativeSelectOption value="1">항목 1</NativeSelectOption>
      </NativeSelect>
      <p className="text-sm font-medium text-destructive">
        값을 선택해야 합니다.
      </p>
    </div>
  ),
};
