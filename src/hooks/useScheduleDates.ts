"use client";

import useSWR from "swr";

/**
 * API fetcher関数
 * @param url - APIエンドポイントURL
 * @returns 日付文字列の配列
 */
const fetcher = (url: string): Promise<string[]> =>
  fetch(url).then((res) => res.json());

/**
 * スケジュールが存在する日付一覧を取得するフック
 * @returns 日付の配列、ローディング状態、エラー状態を含むオブジェクト
 */
export function useScheduleDates() {
  const { data, error, isLoading } = useSWR<string[]>(
    "/api/schedule-dates",
    fetcher
  );

  return {
    dates: data || [],
    isLoading,
    isError: !!error,
  };
}
