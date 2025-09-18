"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { LtSession } from "@/types/talk";

interface SessionDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  session: LtSession | null;
  isDeleting: boolean;
}

export default function SessionDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  session,
  isDeleting,
}: SessionDeleteDialogProps) {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error("Session delete error:", error);
    }
  };

  if (!session) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>セッションを削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            以下のセッションを削除します。この操作は取り消せません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="font-medium">
              第{session.sessionNumber}回 {session.title || "LT大会"}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              開催日: {session.date}
            </div>
            <div className="text-sm text-gray-600">場所: {session.venue}</div>
          </div>
          <div className="text-red-600 font-medium">
            ⚠️
            このセッションに紐付いているトークは、セッション情報が削除されます（トーク自体は削除されません）。
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            キャンセル
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-red-400 hover:bg-red-700 text-white"
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            削除する
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
