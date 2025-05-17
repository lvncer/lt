"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Info } from "lucide-react";
import {
  TALK_TOPICS,
  TALK_DURATIONS,
  TALK_IMAGE_URLS,
  TALK_VENUES,
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
  image_url: z.string().min(1, {
    message: "画像を選択してください",
  }),
  presentation_date: z.string().min(1, {
    message: "発表日を選択してください",
  }),
  venue: z.string().min(1, {
    message: "発表場所を選択してください",
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
  presentation_start_time: z.string().optional(),
});

export default function TalkForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { neonid } = useUserId();
  const { user, isLoaded, isSignedIn } = useUser();
  const { fullname, isLoading: isLoadingFullname } = useGetFullname(
    user?.id || ""
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      duration: 10,
      topic: "",
      image_url: "",
      presentation_date: new Date().toISOString(),
      venue: "",
      description: "",
      has_presentation: false,
      presentation_url: "",
      allow_archive: false,
      archive_url: "",
      presentation_start_time: "",
    },
  });

  if (isLoadingFullname) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Button variant="ghost" disabled>
          <Info className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </Button>
      </div>
    );
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLoaded || !isSignedIn || !user || !fullname) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/talks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          presenter: user.username || user.fullName || "anonymous",
          email: user.primaryEmailAddress?.emailAddress,
          fullname: fullname,
          ...values,
          neonuuid: neonid,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      toast.success("Talk submitted successfully!");
      router.push("/talks");
    } catch (err) {
      toast.error("Failed to submit talk.");
      console.error(err);
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
              <FormLabel>トークタイトル</FormLabel>
              <div className="mb-1" />
              <FormControl>
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
              <FormLabel>トーク時間 (minutes)</FormLabel>
              <FormControl>
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
              <FormLabel>トピックカテゴリー</FormLabel>
              <div className="mb-1" />
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
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
            <FormItem>
              <FormLabel>トークのイメージ画像</FormLabel>
              <div className="mb-1" />
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="画像を選択してください" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  {TALK_IMAGE_URLS.map((image_url) => (
                    <SelectItem key={image_url} value={image_url}>
                      {image_url}
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
          name="presentation_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>発表日</FormLabel>
              <div className="mb-1" />
              <FormControl>
                <div className="relative">
                  <Input
                    type="date"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-full"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="presentation_start_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>発表開始時刻</FormLabel>
              <div className="mb-1" />
              <FormControl>
                <Input
                  type="time"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                発表の開始予定時刻を入力してください。
              </FormDescription>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="venue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>発表場所</FormLabel>
              <div className="mb-1" />
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="場所を選択してください" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  {TALK_VENUES.map((venue) => (
                    <SelectItem key={venue} value={venue}>
                      {venue}
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>トーク内容</FormLabel>
              <div className="mb-1" />
              <FormControl>
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
            className="w-full md:w-auto bg-blue-600 text-white hover:bg-blue-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "提出中です..." : "この内容で提出する"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
