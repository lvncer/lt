"use client";

import useSWR from "swr";
import { Talk } from "@/types/talk";

/**
 * Fetches talks for a specific user by user_id.
 * @param userId - The ID of the user whose talks are to be fetched (string or number).
 * @returns SWR response containing the talks data or error.
 */
export function useUserTalks(userId?: string | number) {
	const fetcher = (url: string) => fetch(url).then((res) => res.json());
	const { data, error } = useSWR<Talk[]>(
		userId ? `/api/user-talks/${userId}` : null,
		fetcher,
	);

	return {
		talks: data || [],
		isLoading: !error && !data,
		isError: error,
	};
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useTalks() {
	const { data, error, isLoading } = useSWR<Talk[]>("/api/talks", fetcher);

	return {
		talks: data || [],
		isLoading,
		isError: !!error,
	};
}
