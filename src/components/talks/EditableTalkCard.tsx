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

// 時間表示を時分（HH:MM）形式に統一するヘルパー関数
const formatTime = (timeString: string | null | undefined): string => {
	if (!timeString) return "--:--";

	// 時分秒（HH:MM:SS）形式の場合は時分（HH:MM）に変換
	if (timeString.includes(":") && timeString.split(":").length === 3) {
		const [hours, minutes] = timeString.split(":");
		return `${hours}:${minutes}`;
	}

	// 時分（HH:MM）形式の場合はそのまま返す
	return timeString;
};
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Calendar } from "lucide-react";
import { TALK_DURATIONS, TALK_IMAGE_URLS, TALK_TOPICS } from "@/lib/data";
import { useLtSessions } from "@/hooks/useLtSessions";
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
	duration: z
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
	sessionId: z.number().min(1, {
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
	hasPresentationUrl: z.boolean(),
	presentationUrl: z.string().optional(),
	presentationStartTime: z
		.string()
		.min(1, { message: "発表開始時刻を入力してください" })
		.refine(
			(time) => {
				const [hours, minutes] = time.split(":").map(Number);
				const timeInMinutes = hours * 60 + minutes;
				return timeInMinutes >= 16 * 60 + 30 && timeInMinutes <= 18 * 60;
			},
			{
				message: "発表時間は16:30-18:00の間で設定してください",
			},
		),
});

interface EditableTalkCardProps {
	talk: Talk;
}

export default function EditableTalkCard({ talk }: EditableTalkCardProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const { deleteTalk, isDeleting } = useDeleteTalk();
	// 編集ページでは過去も含め全てのセッションを取得
	const { sessions: allSessions, isLoading: sessionsLoading } = useLtSessions();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			duration: 10,
			topic: "",
			imageUrl: "",
			sessionId: 0,
			description: "",
			hasPresentationUrl: false,
			presentationUrl: "",
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
			sessionId: talk.sessionId || 0,
			hasPresentationUrl: talk.hasPresentationUrl || false,
			presentationUrl: talk.presentationUrl || "",
			presentationStartTime: talk.presentationStartTime || "16:30",
		});
	};

	const cancelEditing = () => {
		setIsEditing(false);
		form.reset();
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await updateTalk({
				id: talk.id,
				title: values.title,
				duration: values.duration,
				topic: values.topic,
				description: values.description,
				image_url: values.imageUrl,
				session_id: values.sessionId,
				has_presentation: values.hasPresentationUrl,
				presentation_url: values.presentationUrl,
				presentation_start_time: values.presentationStartTime,
			});
			setIsEditing(false);
			// ページリロードして最新データを取得
			window.location.reload();
		} catch (error) {
			console.error("トーク更新エラー:", error);
			// エラー時はフォームを開いたままにする
		}
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
								name="sessionId"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>開催セッション</FormLabel>
										<div className="mb-1" />
										<Select
											onValueChange={(value) =>
												field.onChange(parseInt(value, 10))
											}
											defaultValue={field.value?.toString()}
											disabled={sessionsLoading}
										>
											<FormControl required>
												<SelectTrigger>
													<SelectValue
														placeholder={
															sessionsLoading
																? "読み込み中..."
																: "セッションを選択してください"
														}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent className="bg-white">
												{allSessions.map((session) => (
													<SelectItem
														key={session.id}
														value={session.id.toString()}
													>
														{session.isSpecial
															? `特別枠 - ${session.date} (${session.venue})`
															: `第${session.sessionNumber}回 - ${session.date} (${session.venue})`}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											発表するセッションを選択してください。時間は16:30-18:00です。
										</FormDescription>
										{form.watch("sessionId") &&
											form.watch("sessionId") > 0 &&
											allSessions.length > 0 && (
												<div className="mt-2 p-2 bg-blue-50 rounded-md">
													<div className="text-sm text-blue-700">
														<div className="font-medium">
															選択されたセッション:
														</div>
														{(() => {
															const selectedSession = allSessions.find(
																(s) => s.id === form.watch("sessionId"),
															);
															return selectedSession ? (
																<div className="mt-1 space-y-1">
																	<div>
																		第{selectedSession.sessionNumber}回 -{" "}
																		{selectedSession.title}
																	</div>
																	<div className="flex items-center gap-1">
																		<Calendar className="h-3 w-3" />
																		開催日: {selectedSession.date}
																	</div>
																	<div>会場: {selectedSession.venue}</div>
																	<div>
																		時間: {selectedSession.startTime} -{" "}
																		{selectedSession.endTime}
																	</div>
																</div>
															) : null;
														})()}
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
											<Input
												type="time"
												min="16:30"
												max="18:00"
												{...field}
												className="w-full"
											/>
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

							<div className="flex gap-2">
								<Button
									type="submit"
									variant="outline"
									className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 border-blue-200 text-white"
								>
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
									<p>発表日: {talk.sessionDate || "未定"}</p>
									<p>発表場所: {talk.sessionVenue || "未定"}</p>
									<p>開始時刻: {formatTime(talk.presentationStartTime)}</p>
									{talk.sessionNumber && (
										<p>セッション: 第{talk.sessionNumber}回</p>
									)}
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

						<div className="flex gap-2 justify-end">
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
								className="flex items-center gap-3 bg-red-500 hover:bg-red-700 border-red-200 text-white"
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
									className="bg-red-500 hover:bg-red-700"
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
