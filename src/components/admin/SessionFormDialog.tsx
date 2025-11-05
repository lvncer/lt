"use client";

import { useEffect, useState } from "react";
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
const sessionFormSchema = z
	.object({
		isSpecial: z.boolean(),
		sessionNumber: z
			.number()
			.min(1, "第○回は1以上の数値で入力してください")
			.max(999, "第○回は999以下で入力してください")
			.nullable()
			.optional(),
		date: z.string().min(1, "開催日を入力してください"),
		title: z.string().optional(),
		venue: z.string().min(1, "開催場所を選択してください"),
		startTime: z.string().min(1, "開始時間を入力してください"),
		endTime: z.string().min(1, "終了時間を入力してください"),
	})
	.superRefine((data, ctx) => {
		if (
			!data.isSpecial &&
			(data.sessionNumber === undefined || data.sessionNumber === null)
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "通常枠では第○回は必須です",
				path: ["sessionNumber"],
			});
		}
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

	const [submitError, setSubmitError] = useState<string | null>(null);

	const form = useForm<SessionFormData>({
		resolver: zodResolver(sessionFormSchema),
		defaultValues: {
			isSpecial: session?.isSpecial ?? false,
			sessionNumber: session?.sessionNumber ?? 1,
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
				isSpecial: session.isSpecial ?? false,
				sessionNumber: session.sessionNumber,
				date: session.date,
				title: session.title || "",
				venue: session.venue,
				startTime: session.startTime,
				endTime: session.endTime,
			});
		} else {
			form.reset({
				isSpecial: false,
				sessionNumber: 1,
				date: "",
				title: "",
				venue: "",
				startTime: "16:30",
				endTime: "18:00",
			});
		}
	}, [session, form]);

	const handleSubmit = async (data: SessionFormData) => {
		try {
			setSubmitError(null);
			await onSubmit(data);
			if (!isEdit) {
				form.reset();
			}
			onOpenChange(false);
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "セッションの保存に失敗しました";
			if (message.includes("既に存在") || message.includes("既存")) {
				form.setError("sessionNumber", { message });
			} else {
				setSubmitError(message);
			}
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
						{/* エラー（全体） */}
						{submitError && (
							<div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
								{submitError}
							</div>
						)}

						{/* 種別 */}
						<FormField
							control={form.control}
							name="isSpecial"
							render={({ field }) => (
								<FormItem>
									<FormLabel>種別</FormLabel>
									<FormControl>
										<Select
											onValueChange={(v) => {
												const isSpecial = v === "special";
												field.onChange(isSpecial);
												if (isSpecial) {
													form.clearErrors("sessionNumber");
												}
											}}
											defaultValue={field.value ? "special" : "normal"}
										>
											<SelectTrigger>
												<SelectValue placeholder="通常枠 / 特別枠" />
											</SelectTrigger>
											<SelectContent className="bg-white">
												<SelectItem value="normal">通常枠</SelectItem>
												<SelectItem value="special">特別枠</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* 第○回（通常枠のみ） */}
						{!form.watch("isSpecial") && (
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
						)}

						{/* 開催日 */}
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>開催日</FormLabel>
									<FormControl>
										<Input type="date" {...field} />
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
									{form.watch("isSpecial") ? (
										<FormDescription>
											空欄の場合は「日付 特別枠」が自動設定されます
										</FormDescription>
									) : (
										<FormDescription>
											空欄の場合は「第○回 LT大会」が自動設定されます
										</FormDescription>
									)}
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
										<SelectContent className="bg-white">
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
