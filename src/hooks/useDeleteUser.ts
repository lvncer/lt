"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function useDeleteUser() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const deleteUser = async () => {
    if (!user) {
      toast({
        title: "エラー",
        description: "ユーザーが認証されていません。",
        variant: "destructive",
      });
      return false;
    }

    setIsDeleting(true);

    try {
      const response = await fetch("/api/user-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete user account");
      }

      toast({
        title: "アカウント削除完了",
        description: "アカウントとすべての投稿が正常に削除されました。",
      });

      // Clerkからサインアウト（削除ではなくサインアウトのみ）
      await signOut();

      // ホームページにリダイレクト
      router.push("/");

      return true;
    } catch (error) {
      console.error("Delete user error:", error);
      toast({
        title: "削除エラー",
        description:
          error instanceof Error
            ? error.message
            : "アカウントの削除に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteUser,
    isDeleting,
  };
}
