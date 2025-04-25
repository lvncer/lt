import useSWR from "swr";
import { useAuth } from "@clerk/nextjs";

const fetcher = async (clerkId: string) => {
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

export function useUserId() {
  const { userId } = useAuth();

  const { data, error, isLoading } = useSWR(
    userId ? ["userId", userId] : null,
    () => fetcher(userId!)
  );

  return {
    neonid: data,
    isLoading,
    isError: !!error,
  };
}
