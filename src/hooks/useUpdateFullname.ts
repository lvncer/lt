"use client";

import { useState } from "react";

/**
 * ユーザーのフルネーム更新機能を提供するカスタムフック
 * @returns updateFullname関数と状態管理
 */
export function useUpdateFullname() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	/**
	 * ユーザーのフルネームを更新する
	 * @param clerkUserId - ClerkのユーザーID
	 * @param neonUserId - NeonデータベースのユーザーID
	 * @param newFullName - 新しいフルネーム
	 * @returns Promise<void>
	 */
	const updateFullname = async (
		clerkUserId: string,
		neonUserId: number,
		newFullName: string,
	): Promise<void> => {
		setIsLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch("/api/update-fullname", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					clerkUserId,
					neonUserId,
					newFullName,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to update fullname");
			}

			setSuccess(true);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return { updateFullname, isLoading, error, success };
}
