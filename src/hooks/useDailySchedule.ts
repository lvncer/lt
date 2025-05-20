"use client";

import useSWR from "swr";
import { Talk } from "@/types/talk";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * 指定された日付のトークスケジュールを取得するためのフック
 * @param date - YYYY-MM-DD形式の日付
 * @returns トーク一覧、ローディング状態、エラー状態を含むオブジェクト
 */
export function useDailySchedule(date?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    date ? `/api/daily-schedule?date=${date}` : null,
    fetcher
  );

  return {
    talks: (data as Talk[]) || [],
    isLoading,
    isError: !!error,
    mutate, // 再フェッチのための関数
  };
}

/**
 * 日付ベースのスケジュール更新用フック
 * @returns スケジュール更新関数とローディング状態
 */
export function useUpdateSchedule() {
  const [isUpdating, setIsUpdating] = useState(false);

  // 複数のトークの開始時刻を一括更新するための関数
  const updateSchedule = async (
    talks: Pick<Talk, "id" | "presentation_start_time">[]
  ) => {
    if (!talks || talks.length === 0) return false;

    setIsUpdating(true);
    try {
      const response = await fetch("/api/daily-schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ talks }),
      });

      if (!response.ok) {
        throw new Error("スケジュールの更新に失敗しました");
      }

      return true;
    } catch (error) {
      console.error("スケジュール更新エラー:", error);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateSchedule, isUpdating };
}
