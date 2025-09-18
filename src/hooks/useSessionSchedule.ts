"use client";

import useSWR from "swr";
import { Talk } from "@/types/talk";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * 指定されたセッションのトークスケジュールを取得するためのフック
 * @param sessionId - セッションID
 * @returns トーク一覧、ローディング状態、エラー状態を含むオブジェクト
 */
export function useSessionSchedule(sessionId?: string | number) {
	const { data, error, isLoading, mutate } = useSWR(
		sessionId ? `/api/daily-schedule?sessionId=${sessionId}` : null,
		fetcher,
	);

	return {
		talks: (data as Talk[]) || [],
		isLoading,
		isError: !!error,
		mutate, // 再フェッチのための関数
	};
}

/**
 * セッションベースのスケジュール更新用フック
 * @returns スケジュール更新関数とローディング状態
 */
export function useSessionScheduleUpdate() {
	// この関数は管理者用なので、既存の POST /api/daily-schedule を使用可能
	// sessionId ベースでのトーク時間更新も同様に機能するはず
}
