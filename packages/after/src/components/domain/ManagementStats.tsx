import React from "react";
import { Card, CardStatsLabel, CardStatsValue } from "@/components/ui/Card";
import type { User } from "@/services/userService";
import type { Post } from "@/services/postService";

interface ManagementStatsProps {
  entityType: "user" | "post";
  data: (User | Post)[];
}

export const ManagementStats: React.FC<ManagementStatsProps> = ({ entityType, data }) => {
  // ✅ [Logic] 통계 데이터 계산 로직을 이곳으로 이동
  const statsList = (() => {
    if (entityType === "user") {
      const users = data as User[];
      return [
        { label: "전체", value: users.length, color: "blue" },
        { label: "활성", value: users.filter((u) => u.status === "active").length, color: "green" },
        { label: "비활성", value: users.filter((u) => u.status === "inactive").length, color: "orange" },
        { label: "정지", value: users.filter((u) => u.status === "suspended").length, color: "red" },
        // 관리자: 회색 박스 + 파란 글씨 (Legacy Style)
        { label: "관리자", value: users.filter((u) => u.role === "admin").length, color: "gray", textColorOverride: "text-bum-blue-main" },
      ];
    } else {
      const posts = data as Post[];
      return [
        { label: "전체", value: posts.length, color: "blue" },
        { label: "게시됨", value: posts.filter((p) => p.status === "published").length, color: "green" },
        { label: "임시저장", value: posts.filter((p) => p.status === "draft").length, color: "orange" },
        { label: "보관됨", value: posts.filter((p) => p.status === "archived").length, color: "red" },
        // 총 조회수: 회색 박스 + 진한 회색 글씨
        { label: "총 조회수", value: posts.reduce((sum, p) => sum + p.views, 0), color: "gray", textColorOverride: "text-bum-gray-700" },
      ];
    }
  })();

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-[10px] mb-[15px]">
      {statsList.map((stat, idx) => (
        <Card key={idx} variant="stats" color={stat.color as any}>
          <CardStatsLabel>{stat.label}</CardStatsLabel>
          <CardStatsValue 
            color={stat.color as any} 
            className={stat.textColorOverride}
          >
            {stat.value}
          </CardStatsValue>
        </Card>
      ))}
    </div>
  );
};