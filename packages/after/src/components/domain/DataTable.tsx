/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------
// 1. Interface Definition
// ----------------------------------------------------------------------
export interface Column<T = any> {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  pageSize?: number;
  sortable?: boolean;
  onRowClick?: (row: T) => void;
  className?: string;
  // ❌ searchable prop 삭제됨
}

// ----------------------------------------------------------------------
// 2. Component Implementation
// ----------------------------------------------------------------------

export function DataTable<T extends Record<string, any>>({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = true,
  pageSize = 10,
  sortable = false,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const [tableData, setTableData] = useState<T[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  // ❌ searchTerm state 삭제됨

  // 데이터 변경 시 초기화
  useEffect(() => {
    setTableData(data);
  }, [data]);

  // --------------------------------------------------------------------
  // Logic 1: Sorting
  // --------------------------------------------------------------------
  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection =
      sortColumn === columnKey && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(columnKey);
    setSortDirection(newDirection);

    const sorted = [...tableData].sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return newDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal ?? "");
      const bStr = String(bVal ?? "");
      return newDirection === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    setTableData(sorted);
  };

  // ❌ Logic 2: Filtering (삭제됨)
  // 검색 기능이 사라졌으므로 filteredData 변수도 필요 없습니다.

  // --------------------------------------------------------------------
  // Logic 3: Pagination
  // --------------------------------------------------------------------
  // filteredData 대신 tableData(정렬된 데이터)를 직접 사용합니다.
  const totalPages = Math.ceil(tableData.length / pageSize);
  const paginatedData = tableData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // --------------------------------------------------------------------
  // Rendering
  // --------------------------------------------------------------------
  return (
    <div className={cn("space-y-4", className)}>
      {/* ❌ Search Bar UI 삭제됨 */}

      {/* Table Body */}
      <div className="rounded-md border border-border bg-background overflow-hidden">
        <Table striped={striped} bordered={bordered} hover={hover}>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  style={{ width: col.width }}
                  className={cn(
                    sortable && col.sortable !== false
                      ? "cursor-pointer select-none hover:bg-muted/50"
                      : ""
                  )}
                  onClick={() =>
                    sortable && col.sortable !== false && handleSort(col.key)
                  }
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {sortable && sortColumn === col.key && (
                      <span className="text-xs text-primary">
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    onRowClick && "cursor-pointer hover:bg-muted/50"
                  )}
                >
                  {columns.map((col) => (
                    <TableCell key={`${rowIndex}-${col.key}`}>
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 py-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            이전
          </Button>
          <span className="text-sm font-medium text-muted-foreground">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
}
