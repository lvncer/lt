import { useState } from "react";
import { Talk } from "@/types/talk";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
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
});

interface EditableTalkCardProps {
  talk: Talk;
}

export default function EditableTalkCard({ talk }: EditableTalkCardProps) {
  const [isEditing, setIsEditing] = useState(false);

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
    },
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  const startEditing = () => {
    setIsEditing(true);
    form.reset({
      title: talk.title,
      duration: talk.duration,
      topic: talk.topic,
      description: talk.description,
      image_url: talk.image_url,
      presentation_date: talk.presentation_date,
      venue: talk.venue,
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
                  <FormItem>
                    <FormLabel>トークのイメージ画像</FormLabel>
                    <div className="mb-1" />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
              <Button
                variant="outline"
                onClick={startEditing}
                className="hover:bg-gray-100"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
