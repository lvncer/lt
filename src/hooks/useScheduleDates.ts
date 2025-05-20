"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * スケジュールが存在する日付一覧を取得するフック
 * @returns 日付の配列、ローディング状態、エラー状態を含むオブジェクト
 */
export function useScheduleDates() {
  const { data, error, isLoading } = useSWR("/api/schedule-dates", fetcher);

  return {
    dates: (data as string[]) || [],
    isLoading,
    isError: !!error,
  };
}
