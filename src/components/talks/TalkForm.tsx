"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Info, Calendar,
} from "lucide-react";
import {
  TALK_TOPICS,
  TALK_DURATIONS,
  TALK_IMAGE_URLS,
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useUserId } from "@/hooks/useUserId";
import { useUser } from "@clerk/nextjs";
import { useGetFullname } from "@/hooks/useGetFullname";
import { useAvailableSessions } from "@/hooks/useLtSessions";

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "タイトルは5文字以上で入力してください",
    })
    .max(30, {
      message: "タイトルは30文字以下で入力してください",
    }),
  duration: z.coerce
    .number()
    .min(5, {
      message: "発表時間は5分以上を選択してください",
    })
    .max(20, {
      message: "発表時間は20分以下を選択してください",
    }),
  topic: z.string().min(1, {
    message: "カテゴリーを選択してください",
  }),
  image_url: z.string(),
  session_id: z.number().min(1, {
    message: "セッションを選択してください",
  }),
  description: z
    .string()
    .min(10, {
      message: "内容は10文字以上で入力してください",
    })
    .max(100, {
      message: "内容は100文字以下で入力してください",
    }),
  has_presentation: z.boolean(),
  presentation_url: z.string().optional(),
  allow_archive: z.boolean(),
  archive_url: z.string().optional(),
  presentation_start_time: z.string()
    .min(1, { message: "発表開始時刻を入力してください" })
    .refine((time) => {
      const [hours, minutes] = time.split(':').map(Number);
      const timeInMinutes = hours * 60 + minutes;
      return timeInMinutes >= 16 * 60 + 30 && timeInMinutes <= 18 * 60;
    }, {
      message: "発表時間は16:30-18:00の間で設定してください",
    }),
});

export default function TalkForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { neonid } = useUserId();
  const { user } = useUser();
  const { fullname } = useGetFullname(user?.id || "");
  const { sessions: availableSessions, isLoading: sessionsLoading } = useAvailableSessions();

  // ランダムな画像URLを選択
  const getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * TALK_IMAGE_URLS.length);
    return TALK_IMAGE_URLS[randomIndex];
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      duration: 10,
      topic: "",
      image_url: getRandomImageUrl(),
      session_id: 0,
      description: "",
      has_presentation: false,
      presentation_url: "",
      allow_archive: false,
      archive_url: "",
      presentation_start_time: "16:30",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      return;
    }

    // SIWユーザーかどうかをチェック
    const isSIWUser = user?.emailAddresses?.some(
      (email) =>
        email.emailAddress.startsWith("siw") &&
        email.emailAddress.endsWith("@class.siw.ac.jp")
    );

    if (isSIWUser && !fullname) {
      toast.error("SIWユーザーは本名の登録が必要です。");
      router.push("/verify/name");
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        presenter: user.username || user.fullName || "anonymous",
        email: user.primaryEmailAddress?.emailAddress,
        fullname:
          fullname || (isSIWUser ? "未登録" : user.fullName || "anonymous"),
        ...values,
        // presentation_start_timeは必須項目なので値が保証される
        presentation_start_time: values.presentation_start_time,
        neonuuid: neonid,
      };

      const res = await fetch("/api/talks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const responseData = await res.text();

      if (!res.ok) {
        throw new Error(`Failed to submit: ${res.status} ${responseData}`);
      }

      toast.success("Talk submitted successfully!");
      router.push("/talks");
    } catch {
      toast.error("Failed to submit talk.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>トークタイトル</FormLabel>
              <div className="mb-1" />
              <FormControl required>
                <Input placeholder="Enter your talk title" {...field} />
              </FormControl>
              <FormDescription>
                魅力的に伝えるキャッチーなタイトルを考えましょう。
              </FormDescription>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel required>トーク時間 (minutes)</FormLabel>
              <FormControl required>
                <RadioGroup
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                  className="flex flex-wrap space-y-1"
                >
                  {TALK_DURATIONS.map((duration) => (
                    <FormItem
                      key={duration}
                      className="mt-2 flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={duration.toString()} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {duration} minutes
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>トピックカテゴリー</FormLabel>
              <div className="mb-1" />
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl required>
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリーを選択してください" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  {TALK_TOPICS.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="presentation_start_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>発表開始時刻</FormLabel>
              <div className="mb-1" />
              <FormControl required>
                <Input
                  type="time"
                  min="16:30"
                  max="18:00"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                発表の開始予定時刻を入力してください。（16:30-18:00）
              </FormDescription>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="session_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>開催セッション</FormLabel>
              <div className="mb-1" />
              <Select 
                onValueChange={(value) => field.onChange(parseInt(value, 10))} 
                defaultValue={field.value?.toString()}
                disabled={sessionsLoading}
              >
                <FormControl required>
                  <SelectTrigger>
                    <SelectValue placeholder={
                      sessionsLoading ? "読み込み中..." : "セッションを選択してください"
                    } />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  {availableSessions.map((session) => (
                    <SelectItem key={session.id} value={session.id.toString()}>
                      {session.displayText}
                    </SelectItem>
                  ))}
                </SelectContent>
                    </Select>
                    <FormDescription>
                      発表するセッションを選択してください。時間は16:30-18:00です。
                    </FormDescription>
                    {form.watch("session_id") && availableSessions.length > 0 && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          開催日: {
                            availableSessions.find(s => s.id === form.watch("session_id"))?.date
                          }
                        </div>
                      </div>
                    )}
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>トーク内容</FormLabel>
              <div className="mb-1" />
              <FormControl required>
                <Textarea
                  placeholder="Describe what your lightning talk will cover..."
                  className="resize-none min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                参加者が学べる内容を明確に説明してください。
              </FormDescription>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="has_presentation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    if (!e.target.checked) {
                      form.setValue("presentation_url", "");
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  aria-label="プレゼン資料を共有する"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>プレゼン資料を共有する</FormLabel>
                <FormDescription>
                  発表で使用する資料を共有する場合はチェックしてください。
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {form.watch("has_presentation") && (
          <FormField
            control={form.control}
            name="presentation_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>資料URL</FormLabel>
                <div className="mb-1" />
                <FormControl>
                  <Input
                    placeholder="https://example.com/presentation"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  発表資料のURLを入力してください（Google
                  Slides、PowerPointなど）。
                </FormDescription>
                <FormMessage className="text-red-400 text-sm" />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="allow_archive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    if (!e.target.checked) {
                      form.setValue("archive_url", "");
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  aria-label="アーカイブとして公開を許可する"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>アーカイブとして公開を許可する</FormLabel>
                <FormDescription>
                  発表内容をアーカイブとして公開することを許可する場合はチェックしてください。
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {form.watch("allow_archive") && (
          <FormField
            control={form.control}
            name="archive_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>アーカイブURL</FormLabel>
                <div className="mb-1" />
                <FormControl>
                  <Input placeholder="https://example.com/archive" {...field} />
                </FormControl>
                <FormDescription>
                  発表内容のアーカイブURLを入力してください（YouTube、Vimeoなど）。
                </FormDescription>
                <FormMessage className="text-red-400 text-sm" />
              </FormItem>
            )}
          />
        )}

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p className="font-medium">提出する際に確認するべきガイドライン</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                ライトニングトークは簡潔で焦点を絞った内容にしてください。
              </li>
              <li>読みやすいビジュアル資料を準備してください。</li>
              <li>選択した時間内に収まるようにしてください。</li>
              <li>提出内容は48時間以内にレビューされます。</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center space-x-4">
          <Button
            type="submit"
            className="w-full cursor-pointer md:w-auto bg-blue-600 text-white hover:bg-blue-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "提出中です..." : "この内容で提出する"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
