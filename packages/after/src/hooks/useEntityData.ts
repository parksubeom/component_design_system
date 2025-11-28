/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { userService } from "@/services/userService";
import { postService } from "@/services/postService";
import type { User } from "@/services/userService";
import type { Post } from "@/services/postService";

export type EntityType = "user" | "post";
export type Entity = User | Post;

export const useEntityData = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      const result =
        entityType === "user"
          ? await userService.getAll()
          : await postService.getAll();
      setData(result);
      setError(null);
    } catch (err: any) {
      setError(err);
    }
  }, [entityType]);

  // 타입이 바뀌면 데이터 다시 로드
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    entityType,
    setEntityType,
    data,
    loadData,
    error,
    setError, // 에러 초기화용
  };
};
