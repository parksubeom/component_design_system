import * as React from "react";
import { cn } from "@/lib/utils";

// -------------------------------------------------------------------------
// 1. Table Root (Primitives)
// -------------------------------------------------------------------------
interface TableProps extends React.ComponentProps<"table"> {
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
}

function Table({ className, striped, bordered, ...props }: TableProps) {
  return (
    <div className="relative w-full overflow-x-auto table-container">
      <table
        className={cn(
          "w-full border-collapse text-[0.875rem] bg-background font-sans", // ✅ bg-white -> bg-background

          // [Striped]: 짝수 행 배경색을 semantic token (bg-muted/50)으로 처리
          striped && "[&_tbody_tr:nth-child(even)]:bg-muted/50",

          // [Bordered]: border-border (Dark Mode에서 어두운 보더로 자동 전환)
          bordered &&
            "border border-border [&_th]:border [&_th]:border-border [&_td]:border [&_td]:border-border",

          className
        )}
        {...props}
      />
    </div>
  );
}

// -------------------------------------------------------------------------
// 2. Table Header (Thead)
// -------------------------------------------------------------------------
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      // ✅ thead 배경색을 semantic token (bg-muted)으로 처리
      className={cn("bg-muted [&_tr]:border-b", className)}
      {...props}
    />
  );
}

// ... TableBody, TableFooter (유지) ...

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      className={cn("[&_tr:last-child_td]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

// -------------------------------------------------------------------------
// 3. Table Row (Tr)
// -------------------------------------------------------------------------
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  );
}

// -------------------------------------------------------------------------
// 4. Table Head Cell (Th) - Semantic Colors Applied
// -------------------------------------------------------------------------
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        // padding: 16px
        "p-4 text-left align-middle",
        // font-weight: 500, font-size: 0.75rem
        "font-medium text-[0.75rem]",
        // color: rgba(0, 0, 0, 0.6) -> text-muted-foreground (semantic)
        "text-muted-foreground",
        // text-transform: uppercase, letter-spacing: 0.03em
        "uppercase tracking-[0.03em]",
        // border-bottom: 2px solid rgba(0, 0, 0, 0.12) -> border-border
        "border-b-2 border-border",

        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}

// -------------------------------------------------------------------------
// 5. Table Data Cell (Td) - Semantic Colors Applied
// -------------------------------------------------------------------------
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        // padding: 16px
        "p-4 align-middle",
        // color: rgba(0, 0, 0, 0.87) -> text-foreground (semantic)
        "text-foreground",
        // border-bottom: 1px solid rgba(0, 0, 0, 0.08) -> border-muted
        "border-b border-muted",

        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
