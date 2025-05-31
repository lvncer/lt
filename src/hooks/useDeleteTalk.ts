"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUserId } from "@/hooks/useUserId";

/**
 * トーク削除機能を提供するカスタムフック
 * @returns deleteTalk関数とisDeleting状態
 */
export function useDeleteTalk() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const { neonid: neonUserId } = useUserId();

  /**
   * 指定されたトークを削除する
   * @param talkId - 削除するトークのID
   * @returns 削除成功時はtrue、失敗時はfalse
   */
  const deleteTalk = async (talkId: number): Promise<boolean> => {
    setIsDeleting(true);

    try {
      if (!neonUserId) {
        throw new Error("User not authenticated");
      }

      const response = await fetch("/api/talks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: talkId, userId: neonUserId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete talk");
      }

      toast({
        title: "削除完了",
        description: "トークが正常に削除されました。",
      });

      // ページをリロードしてデータを更新
      window.location.reload();

      return true;
    } catch (error) {
      console.error("Delete talk error:", error);
      toast({
        title: "削除エラー",
        description:
          error instanceof Error
            ? error.message
            : "トークの削除に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteTalk,
    isDeleting,
  };
}
