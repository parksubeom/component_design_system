import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "elevated", "flat", "stats"],
      description: "카드의 스타일 변형 (Legacy Styles)",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 사용 예시 (로그인/설정 폼)
export const Default: Story = {
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>프로젝트 생성</CardTitle>
        <CardDescription>
          새로운 프로젝트를 단 한 번의 클릭으로 배포하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">프로젝트 이름</Label>
            <Input id="name" placeholder="Name of your project" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">프레임워크</Label>
            <Input id="framework" placeholder="Select framework" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">취소</Button>
        <Button>배포하기</Button>
      </CardFooter>
    </Card>
  ),
  args: {
    variant: "default",
  },
};

// 2. 모든 Variants 비교 (핵심 검증)
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4 bg-gray-50">
      {/* Default */}
      <Card variant="default" className="w-full">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>Border + Shadow-sm</CardDescription>
        </CardHeader>
        <CardContent>
          가장 기본적인 카드 스타일입니다. (Shadcn Standard)
        </CardContent>
      </Card>

      {/* Bordered (Legacy) */}
      <Card variant="bordered" className="w-full">
        <CardHeader>
          <CardTitle>Bordered</CardTitle>
          <CardDescription>Border Only (No Shadow)</CardDescription>
        </CardHeader>
        <CardContent>
          그림자 없이 테두리만 있는 깔끔한 스타일입니다.
        </CardContent>
      </Card>

      {/* Elevated (Legacy) */}
      <Card variant="elevated" className="w-full">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>Shadow-md (No Border)</CardDescription>
        </CardHeader>
        <CardContent>
          테두리 없이 그림자로 입체감을 주는 스타일입니다.
        </CardContent>
      </Card>

      {/* Flat (Legacy) */}
      <Card variant="flat" className="w-full">
        <CardHeader>
          <CardTitle>Flat</CardTitle>
          <CardDescription>Background Muted</CardDescription>
        </CardHeader>
        <CardContent>
          배경색이 들어가고 테두리/그림자가 없는 스타일입니다.
        </CardContent>
      </Card>
    </div>
  ),
};

// 3. Stats Card (ManagementPage 위젯용)
export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card variant="stats" className="bg-blue-50 border-blue-200">
        <div className="text-xs text-gray-600 mb-1">전체 사용자</div>
        <div className="text-2xl font-bold text-blue-700">1,234</div>
      </Card>
      <Card variant="stats" className="bg-green-50 border-green-200">
        <div className="text-xs text-gray-600 mb-1">활성 사용자</div>
        <div className="text-2xl font-bold text-green-700">890</div>
      </Card>
      <Card variant="stats" className="bg-red-50 border-red-200">
        <div className="text-xs text-gray-600 mb-1">이탈 사용자</div>
        <div className="text-2xl font-bold text-red-700">12</div>
      </Card>
    </div>
  ),
};
