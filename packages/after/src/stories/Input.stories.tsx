import type { Meta, StoryObj } from "@storybook/react";
// ✅ Import Path 수정: input -> Input, label -> Label, button -> Button
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[400px] p-6 border rounded-lg bg-white">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    disabled: { control: "boolean" },
    type: { control: "text" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "텍스트를 입력하세요",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">이메일 주소</Label>
      <Input type="email" id="email" placeholder="user@example.com" />
      <p className="text-sm text-muted-foreground">이메일 형식을 지켜주세요.</p>
    </div>
  ),
};

export const FileInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">프로필 사진</Label>
      <Input id="picture" type="file" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "수정할 수 없는 값",
  },
};

export const WithButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="검색어 입력" />
      <Button type="submit">검색</Button>
    </div>
  ),
};
