import { useState } from "react";
import { Talk, TalkStatus } from "@/types/talk";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Pencil, Save, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  TALK_DURATIONS,
  TALK_IMAGE_URLS,
  TALK_TOPICS,
  TALK_VENUES,
} from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateTalk } from "@/hooks/useTalk";
import { useDeleteTalk } from "@/hooks/useDeleteTalk";

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
  imageUrl: z.string(),
  presentationDate: z.string().min(1, {
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
  hasPresentationUrl: z.boolean(),
  presentationUrl: z.string().optional(),
  allowArchive: z.boolean(),
  archiveUrl: z.string().optional(),
  presentationStartTime: z.string().min(1, {
    message: "発表開始時刻を入力してください",
  }),
});

interface EditableTalkCardProps {
  talk: Talk;
}

export default function EditableTalkCard({ talk }: EditableTalkCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { deleteTalk, isDeleting } = useDeleteTalk();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      duration: 10,
      topic: "",
      imageUrl: "",
      presentationDate: new Date().toISOString(),
      venue: "",
      description: "",
      hasPresentationUrl: false,
      presentationUrl: "",
      allowArchive: false,
      archiveUrl: "",
      presentationStartTime: "",
    },
  });

  const statusColors: Record<TalkStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  const startEditing = () => {
    setIsEditing(true);
    const newImageUrl = getRandomImageUrl();
    form.reset({
      title: talk.title,
      duration: talk.duration,
      topic: talk.topic,
      description: talk.description || "",
      imageUrl: newImageUrl,
      presentationDate: talk.presentationDate || "",
      venue: talk.venue || "",
      hasPresentationUrl: talk.hasPresentationUrl || false,
      presentationUrl: talk.presentationUrl || "",
      allowArchive: talk.allowArchive || false,
      archiveUrl: talk.archiveUrl || "",
      presentationStartTime: talk.presentationStartTime || "10:00",
    });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    form.reset();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateTalk({
      id: talk.id,
      title: values.title,
      duration: values.duration,
      topic: values.topic,
      description: values.description,
      image_url: values.imageUrl,
      presentation_date: values.presentationDate,
      venue: values.venue,
      has_presentation: values.hasPresentationUrl,
      presentation_url: values.presentationUrl,
      allow_archive: values.allowArchive,
      archive_url: values.archiveUrl,
      presentation_start_time: values.presentationStartTime,
    });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    const success = await deleteTalk(talk.id);
    if (success) {
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  // ランダムな画像URLを選択
  const getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * TALK_IMAGE_URLS.length);
    return TALK_IMAGE_URLS[randomIndex];
  };

  // 安全なstatus取得
  const getStatusColor = (status: string | null | undefined): string => {
    const validStatus = (status as TalkStatus) || "pending";
    return statusColors[validStatus] || statusColors.pending;
  };

  return (
    <Card>
      <CardContent className="p-6">
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                name="imageUrl"
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
                name="presentationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>発表日</FormLabel>
                    <div className="mb-1" />
                    <FormControl required>
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
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>発表場所</FormLabel>
                    <div className="mb-1" />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl required>
                        <SelectTrigger>
                          <SelectValue placeholder="発表場所を選択してください" />
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
                    <FormLabel required>トーク内容</FormLabel>
                    <div className="mb-1" />
                    <FormControl required>
                      <Textarea
                        placeholder="Describe your talk content"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      トークの内容を簡潔に説明してください (10-100文字)
                    </FormDescription>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="presentationStartTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>発表開始時刻</FormLabel>
                    <div className="mb-1" />
                    <FormControl required>
                      <Input type="time" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasPresentationUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          if (!e.target.checked) {
                            form.setValue("presentationUrl", "");
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

              {form.watch("hasPresentationUrl") && (
                <FormField
                  control={form.control}
                  name="presentationUrl"
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
                name="allowArchive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          if (!e.target.checked) {
                            form.setValue("archiveUrl", "");
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

              {form.watch("allowArchive") && (
                <FormField
                  control={form.control}
                  name="archiveUrl"
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

              <div className="flex gap-2">
                <Button type="submit" variant="outline" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  保存
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={cancelEditing}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  キャンセル
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={getStatusColor(talk.status)}
                  >
                    {talk.status
                      ? talk.status.charAt(0).toUpperCase() +
                        talk.status.slice(1)
                      : "Pending"}
                  </Badge>
                  <Badge variant="secondary">{talk.topic}</Badge>
                </div>
                <h3 className="text-xl font-semibold">{talk.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {talk.description}
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>発表時間: {talk.duration} 分</p>
                  <p>発表日: {talk.presentationDate || "未定"}</p>
                  <p>発表場所: {talk.venue || "未定"}</p>
                  <p>開始時刻: {talk.presentationStartTime || "未定"}</p>
                  {talk.hasPresentationUrl && talk.presentationUrl && (
                    <p>
                      プレゼン資料:{" "}
                      <a
                        href={talk.presentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {talk.presentationUrl}
                      </a>
                    </p>
                  )}
                  {talk.allowArchive && talk.archiveUrl && (
                    <p>
                      アーカイブ:{" "}
                      <a
                        href={talk.archiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {talk.archiveUrl}
                      </a>
                    </p>
                  )}
                </div>
              </div>
              {talk.imageUrl && (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                  <Image
                    src={talk.imageUrl}
                    alt={talk.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={startEditing}
                className="flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" />
                編集
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteClick}
                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                削除
              </Button>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">
                トークを削除しますか？
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                この操作は取り消せません。本当に削除しますか？
              </p>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={handleDeleteCancel}
                  disabled={isDeleting}
                >
                  キャンセル
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                >
                  {isDeleting ? "削除中..." : "削除"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
