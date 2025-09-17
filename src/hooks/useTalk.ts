"use client";

import useSWR from "swr";
import { Talk } from "@/types/talk";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * 指定されたIDのトークを取得するカスタムフック
 * @param id - トークのID
 * @returns トークデータ、ローディング状態、エラー状態
 */
export function useTalk(id: string | undefined) {
  const { data, error, isLoading } = useSWR<Talk>(
    id ? `/api/talk/${id}` : null,
    fetcher
  );

  return {
    talk: data,
    isLoading,
    isError: !!error,
  };
}

/**
 * トーク更新用のパラメータ型定義（snake_case形式）
 */
interface UpdateTalkParams {
  id: number;
  title: string;
  duration: number;
  topic: string;
  description: string;
  image_url: string;
  session_id: number;
  has_presentation?: boolean;
  presentation_url?: string;
  allow_archive?: boolean;
  archive_url?: string;
  presentation_start_time: string;
}

/**
 * トークを更新する関数
 * @param updatedTalk - 更新するトークデータ（snake_case形式）
 * @returns APIレスポンス
 */
export async function updateTalk(
  updatedTalk: UpdateTalkParams
): Promise<Response> {
  const response = await fetch(`/api/talks`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTalk),
  });

  if (!response.ok) {
    throw new Error("Failed to update talk");
  }

  return response;
}

/**
 * トークを削除する関数
 * @param id - 削除するトークのID
 * @returns APIレスポンス
 */
export async function deleteTalk(id: string): Promise<Response> {
  const response = await fetch(`/api/talks`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete talk");
  }

  return response;
}
