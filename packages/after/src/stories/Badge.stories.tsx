import type { Meta, StoryObj } from "@storybook/react";
// ✅ Import Path 수정: badge -> Badge
import { Badge } from "@/components/ui/Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
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
        "destructive",
        "outline",
        "success",
        "warning",
        "info",
      ],
      description: "뱃지의 의미론적 색상 (Legacy Colors 적용됨)",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "레거시 패딩/폰트 사이즈",
    },
    pill: {
      control: "boolean",
      description: "알약 모양 (border-radius: 10px)",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <span className="w-24 text-sm text-muted-foreground">Primary:</span>
        <Badge {...args} variant="primary">
          Development
        </Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="w-24 text-sm text-muted-foreground">Secondary:</span>
        <Badge {...args} variant="secondary">
          Archived (Solid Gray)
        </Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="w-24 text-sm text-muted-foreground">Success:</span>
        <Badge {...args} variant="success">
          Published
        </Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="w-24 text-sm text-muted-foreground">Warning:</span>
        <Badge {...args} variant="warning">
          Draft
        </Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="w-24 text-sm text-muted-foreground">Danger:</span>
        <Badge {...args} variant="destructive">
          Rejected
        </Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="w-24 text-sm text-muted-foreground">Info:</span>
        <Badge {...args} variant="info">
          Pending
        </Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="w-24 text-sm text-muted-foreground">Outline:</span>
        <Badge {...args} variant="outline">
          Guest
        </Badge>
      </div>
    </div>
  ),
  args: {
    size: "md",
    pill: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm" variant="primary">
        Small
      </Badge>
      <Badge size="md" variant="primary">
        Medium (Default)
      </Badge>
      <Badge size="lg" variant="primary">
        Large
      </Badge>
    </div>
  ),
};

export const PillShape: Story = {
  args: {
    variant: "success",
    children: "Rounded Pill",
    pill: true,
  },
};
