import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/Button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "danger",
        "success",
        "outline",
        "ghost",
        "link",
      ],
      description: "버튼의 스타일 변형",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "icon"],
      description: "버튼 크기 (Legacy 호환)",
    },
    fullWidth: {
      control: "boolean",
      description: "너비 100% 채우기",
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Delete Action",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Publish Post",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="md">Medium (Default)</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
