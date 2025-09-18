"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { LtSession } from "@/types/talk";

// フォームのバリデーションスキーマ
const sessionFormSchema = z.object({
  sessionNumber: z
    .number()
    .min(1, "第○回は1以上の数値で入力してください")
    .max(999, "第○回は999以下で入力してください"),
  date: z.string().min(1, "開催日を入力してください"),
  title: z.string().optional(),
  venue: z.string().min(1, "開催場所を選択してください"),
  startTime: z.string().min(1, "開始時間を入力してください"),
  endTime: z.string().min(1, "終了時間を入力してください"),
});

type SessionFormData = z.infer<typeof sessionFormSchema>;

interface SessionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SessionFormData) => Promise<void>;
  session?: LtSession | null; // 編集時に渡される
  isSubmitting: boolean;
}

const VENUE_OPTIONS = [
  "さいたまIT・WEB専門学校 PBLルーム",
  "さいたまIT・WEB専門学校 2階PC演習室",
  "その他",
];

export default function SessionFormDialog({
  open,
  onOpenChange,
  onSubmit,
  session,
  isSubmitting,
}: SessionFormDialogProps) {
  const isEdit = !!session;

  const form = useForm<SessionFormData>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      sessionNumber: session?.sessionNumber || 1,
      date: session?.date || "",
      title: session?.title || "",
      venue: session?.venue || "",
      startTime: session?.startTime || "16:30",
      endTime: session?.endTime || "18:00",
    },
  });

  // セッション情報が変更されたときにフォームをリセット
  useEffect(() => {
    if (session) {
      form.reset({
        sessionNumber: session.sessionNumber,
        date: session.date,
        title: session.title || "",
        venue: session.venue,
        startTime: session.startTime,
        endTime: session.endTime,
      });
    } else {
      form.reset({
        sessionNumber: 1,
        date: "",
        title: "",
        venue: "",
        startTime: "16:30",
        endTime: "18:00",
      });
    }
  }, [session]);

  const handleSubmit = async (data: SessionFormData) => {
    try {
      await onSubmit(data);
      if (!isEdit) {
        form.reset();
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Session form submit error:", error);
    }
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "セッション編集" : "新規セッション作成"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "セッション情報を編集します"
              : "新しいLTセッションを作成します"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* 第○回 */}
            <FormField
              control={form.control}
              name="sessionNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>第○回</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="999"
                      placeholder="1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || "")
                      }
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    LTセッションの回数を入力してください（例：1, 2, 3...）
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 開催日 */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>開催日</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    セッションの開催日を選択してください
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* タイトル */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タイトル（任意）</FormLabel>
                  <FormControl>
                    <Input placeholder="第1回 LT大会" {...field} />
                  </FormControl>
                  <FormDescription>
                    空欄の場合は「第○回 LT大会」が自動設定されます
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 開催場所 */}
            <FormField
              control={form.control}
              name="venue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>開催場所</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="開催場所を選択してください" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {VENUE_OPTIONS.map((venue) => (
                        <SelectItem key={venue} value={venue}>
                          {venue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    セッションを開催する場所を選択してください
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 時間設定（固定） */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>開始時間</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        readOnly
                        className="bg-gray-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>終了時間</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        readOnly
                        className="bg-gray-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-400 text-white"
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEdit ? "更新" : "作成"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
