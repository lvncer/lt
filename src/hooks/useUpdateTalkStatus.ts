import { useState } from "react";
import { Talk } from "@/types/talk";

/**
 * カスタムフック: トークのステータスを更新するAPIを呼び出します。
 * @returns 関数 updateTalkStatus
 */
export function useUpdateTalkStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * トークのステータスを更新する関数
   * @param id トークのID
   * @param status 更新するステータス ("approved" | "rejected" | "pending")
   * @returns 更新されたトークデータ
   */
  const updateTalkStatus = async (
    id: number,
    status: "approved" | "rejected" | "pending"
  ): Promise<Talk | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/talk/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update talk status");
      }

      const updatedTalk: Talk = await response.json();
      return updatedTalk;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateTalkStatus, loading, error };
}
