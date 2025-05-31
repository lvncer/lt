"use client";

import useSWR from "swr";
import { useAuth } from "@clerk/nextjs";

/**
 * ClerkユーザーIDからNeonデータベースのユーザーIDを取得するfetcher関数
 * @param clerkId - ClerkのユーザーID
 * @returns NeonデータベースのユーザーID
 */
const fetcher = async (clerkId: string): Promise<number> => {
  const res = await fetch("/api/user-id", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clerkId }),
  });

  if (!res.ok) {
    throw new Error("ユーザーIDの取得に失敗しました");
  }

  const data = await res.json();
  return data.id;
};

/**
 * ClerkユーザーIDからNeonデータベースのユーザーIDを取得するカスタムフック
 * @returns neonid（NeonデータベースのユーザーID）、ローディング状態、エラー状態
 */
export function useUserId() {
  const { userId } = useAuth();

  const { data, error, isLoading } = useSWR<number>(
    userId ? ["userId", userId] : null,
    () => fetcher(userId!)
  );

  return {
    neonid: data,
    isLoading,
    isError: !!error,
  };
}
