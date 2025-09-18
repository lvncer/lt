"use client";

import useSWR from "swr";
import { LtSession } from "@/types/talk";
import { useMemo } from "react";

interface CachedSessionData {
	[sessionId: string]: unknown;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSessionsData() {
	const { data: sessions, isLoading: isSessionsLoading } = useSWR<LtSession[]>(
		"/api/schedule-dates",
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 5 * 60 * 1000, // 5 minutes
		},
	);

	const cachedData: CachedSessionData = useMemo(() => ({}), []);

	const preloadSessionData = async (sessionId: number) => {
		if (!sessions) return;

		// Pre-fetch data for the target session if not already cached
		if (!cachedData[sessionId.toString()]) {
			try {
				const response = await fetch(
					`/api/daily-schedule?sessionId=${sessionId}`,
				);
				if (response.ok) {
					const data = await response.json();
					cachedData[sessionId.toString()] = data;
				}
			} catch (error) {
				console.error("Failed to preload session data:", error);
			}
		}
	};

	const getCachedSessionData = (sessionId: string) => {
		return cachedData[sessionId] || null;
	};

	const clearCache = () => {
		Object.keys(cachedData).forEach((key) => {
			delete cachedData[key];
		});
	};

	// エラーオブジェクトが返された場合は空配列を返す
	const safeSessions = Array.isArray(sessions) ? sessions : [];

	return {
		sessions: safeSessions,
		isSessionsLoading,
		preloadSessionData,
		getCachedSessionData,
		clearCache,
	};
}
