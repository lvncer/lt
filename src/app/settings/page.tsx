"use client";

import { useState } from "react";
import { ArrowLeft, Trash2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useGetFullname } from "@/hooks/useGetFullname";
import { useUserId } from "@/hooks/useUserId";

export default function SettingsPage() {
  const { user } = useUser();
  const { deleteUser, isDeleting } = useDeleteUser();
  const { neonid: userId } = useUserId();
  const { fullname } = useGetFullname(userId || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  if (!user) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (confirmText !== "DELETE") {
      return;
    }

    const success = await deleteUser();
    if (success) {
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setConfirmText("");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          ダッシュボードに戻る
        </Link>
      </Button>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">設定</h1>
          <p className="text-muted-foreground">
            アカウント設定を管理できます。
          </p>
        </div>

        {/* アカウント情報 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>アカウント情報</CardTitle>
            <CardDescription>
              現在のアカウント情報を確認できます。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                表示名
              </label>
              <p className="text-sm text-gray-900">
                {fullname || user.username || "未設定"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <p className="text-sm text-gray-900">
                {user.emailAddresses[0]?.emailAddress || "未設定"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 危険な操作 */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              危険な操作
            </CardTitle>
            <CardDescription>
              以下の操作は取り消すことができません。慎重に行ってください。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  アカウントを削除
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  アカウントを完全に削除します。すべてのLT投稿も同時に削除され、この操作は取り消せません。
                </p>
                <Button
                  variant="destructive"
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  className="flex items-center gap-2 cursor-pointer bg-red-500 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  {isDeleting ? "削除中..." : "アカウントを削除"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 削除確認ダイアログ */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <h3 className="text-lg font-semibold text-red-600">
                  アカウントを削除しますか？
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  この操作により以下が実行されます：
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>アカウントの完全削除</li>
                  <li>すべてのLT投稿の削除</li>
                  <li>関連するすべてのデータの削除</li>
                </ul>

                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-800 font-medium">
                    ⚠️ この操作は取り消せません
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    確認のため「DELETE」と入力してください：
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="DELETE"
                    disabled={isDeleting}
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-6">
                <Button
                  variant="outline"
                  onClick={handleDeleteCancel}
                  disabled={isDeleting}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  キャンセル
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting || confirmText !== "DELETE"}
                  className="cursor-pointer bg-red-500 hover:bg-red-700"
                >
                  {isDeleting ? "削除中..." : "完全に削除する"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
