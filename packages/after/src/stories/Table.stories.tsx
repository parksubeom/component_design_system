import type { Meta, StoryObj } from "@storybook/react";
// ✅ Import Path 수정: table -> Table, badge -> Badge
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";

const meta = {
  title: "UI/Table (Primitives)",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    striped: { control: "boolean" },
    bordered: { control: "boolean" },
    hover: { control: "boolean" },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock Data
const invoices = [
  {
    invoice: "INV001",
    status: "Paid",
    amount: "$250.00",
    method: "Credit Card",
  },
  { invoice: "INV002", status: "Pending", amount: "$150.00", method: "PayPal" },
  {
    invoice: "INV003",
    status: "Unpaid",
    amount: "$350.00",
    method: "Bank Transfer",
  },
  {
    invoice: "INV004",
    status: "Paid",
    amount: "$450.00",
    method: "Credit Card",
  },
  { invoice: "INV005", status: "Paid", amount: "$550.00", method: "PayPal" },
];

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>최근 청구 내역 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">송장 번호</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>지불 방식</TableHead>
          <TableHead className="text-right">금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>
              <Badge
                variant={
                  invoice.status === "Paid"
                    ? "success"
                    : invoice.status === "Pending"
                    ? "warning"
                    : "destructive"
                }
              >
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  args: {
    striped: false,
    bordered: false,
    hover: true,
  },
};

export const StripedAndBordered: Story = {
  ...Default,
  args: {
    striped: true,
    bordered: true,
    hover: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "레거시 테이블 스타일인 `striped`와 `bordered`가 적용된 모습입니다.",
      },
    },
  },
};
