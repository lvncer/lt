import { useState } from "react";
import { Talk } from "@/types/talk";
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
  image_url: z.string(),
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

  const statusColors = {
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
      description: talk.description,
      image_url: newImageUrl,
      presentation_date: talk.presentation_date,
      venue: talk.venue,
      has_presentation: talk.has_presentation || false,
      presentation_url: talk.presentation_url || "",
      allow_archive: talk.allow_archive || false,
      archive_url: talk.archive_url || "",
      presentation_start_time: talk.presentation_start_time || "",
    });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    form.reset();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateTalk({ id: talk.id, ...values });
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
                    <FormLabel>トークタイトル</FormLabel>
                    <div className="mb-1" />
                    <FormControl>
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
                    <FormLabel>トーク時間 (minutes)</FormLabel>
                    <FormControl>
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
                    <FormLabel>トピックカテゴリー</FormLabel>
                    <div className="mb-1" />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                  <FormItem className="hidden">
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
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
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>発表場所</FormLabel>
                    <div className="mb-1" />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                        <Input
                          placeholder="https://example.com/archive"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        発表内容のアーカイブURLを入力してください（YouTube、Vimeoなど）。
                      </FormDescription>
                      <FormMessage className="text-red-400 text-sm" />
                    </FormItem>
                  )}
                />
              )}

              <div className="mt-8" />
              <div className="flex items-center gap-2">
                <Button type="submit" variant={"outline"}>
                  <Save className="h-4 w-4" />
                  変更を保存する
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={cancelEditing}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <>
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant="outline" className={statusColors[talk.status]}>
                  {talk.status.charAt(0).toUpperCase() + talk.status.slice(1)}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={startEditing}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <Pencil className="h-4 w-4" />
                  編集
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDeleteClick}
                  className="cursor-pointer hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                  {isDeleting ? "削除中..." : "削除"}
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{talk.title}</h3>
              <p className="text-muted-foreground">{talk.description}</p>
            </div>

            {talk.image_url && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                <Image
                  src={talk.image_url}
                  alt={talk.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div>トピック: {talk.topic}</div>
              <div>発表時間: {talk.duration} minutes</div>
              <div>発表場所: {talk.venue}</div>
              <div>
                発表日: {new Date(talk.presentation_date).toLocaleDateString()}
              </div>
            </div>

            {/* 削除確認ダイアログ */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                  <h3 className="text-lg font-semibold mb-2">
                    トークを削除しますか？
                  </h3>
                  <p className="text-gray-600 mb-4">
                    「{talk.title}」を削除します。この操作は取り消せません。
                  </p>
                  <div className="flex gap-4 justify-end">
                    <Button
                      variant="outline"
                      onClick={handleDeleteCancel}
                      disabled={isDeleting}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      キャンセル
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleDeleteConfirm}
                      disabled={isDeleting}
                      className="cursor-pointer text-white bg-red-500 hover:bg-red-700"
                    >
                      {isDeleting ? "削除中..." : "削除する"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
