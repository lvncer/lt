"use client";

import useSWR from "swr";

/**
 * API レスポンス型定義
 */
interface GetFullnameResponse {
	hashedFullName: string;
}

/**
 * API fetcher関数
 * @param url - APIエンドポイントURL
 * @returns APIレスポンス
 */
const fetcher = (url: string): Promise<GetFullnameResponse> =>
	fetch(url).then((res) => res.json());

/**
 * ユーザーのフルネーム（ハッシュ化済み）を取得するカスタムフック
 * @param userId - ClerkのユーザーID（string or number）
 * @returns fullname（ハッシュ化済みフルネーム）、ローディング状態、エラー状態
 */
export function useGetFullname(userId: string | number) {
	const { data, error, isLoading } = useSWR<GetFullnameResponse>(
		userId ? `/api/get-fullname?userId=${userId}` : null,
		fetcher,
	);

	return {
		fullname: data?.hashedFullName,
		isLoading,
		isError: !!error,
	};
}
