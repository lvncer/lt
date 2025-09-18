"use client";

import Image from "next/image";
import Link from "next/link";
import {
	ArrowLeft,
	Clock,
	Calendar,
	Mail,
	Info,
	Pencil,
	Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTalk } from "@/hooks/useTalk";
import * as React from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useUserId } from "@/hooks/useUserId";

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

export default function TalkPage() {
	const params = useParams();
	const router = useRouter();
	const id = params?.id as string | undefined;
	const { talk, isLoading } = useTalk(id);
	const { user } = useUser();
	const { neonid: userId } = useUserId();

	if (isLoading)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="flex flex-col items-center">
					<Info className="h-10 w-10 animate-spin text-blue-500" />
					<p className="mt-4 text-lg">データを読み込んでいます...</p>
				</div>
			</div>
		);

	if (!talk || !talk.id) {
		notFound();
	}

	const submitted_date = talk.dateSubmitted
		? new Date(talk.dateSubmitted)
		: new Date();
	const formattedSubmittedDate = submitted_date.toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const session_date = talk.sessionDate
		? new Date(talk.sessionDate)
		: new Date();
	const formattedSessionDate = session_date.toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const statusColors: Record<string, string> = {
		pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
		approved: "bg-green-100 text-green-800 border-green-200",
		rejected: "bg-red-100 text-red-800 border-red-200",
	};

	// ユーザーのメールアドレスとトークのメールアドレスが条件を満たすかチェック
	const isSIWUser =
		user?.primaryEmailAddress?.emailAddress &&
		talk.email &&
		user.primaryEmailAddress.emailAddress.startsWith("siw") &&
		user.primaryEmailAddress.emailAddress.endsWith("@class.siw.ac.jp") &&
		talk.email.startsWith("siw") &&
		talk.email.endsWith("@class.siw.ac.jp");

	// 表示する名前を決定
	const displayName = isSIWUser ? talk.fullname : talk.presenter;

	// 自分のトークかどうかを確認
	const isOwnTalk = userId && talk.userId === userId;

	// ライブ中かどうかを判断するロジック
	const isLive = (() => {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const presentationDay = new Date(
			session_date.getFullYear(),
			session_date.getMonth(),
			session_date.getDate(),
		);

		// 日付が一致するか確認
		if (today.getTime() !== presentationDay.getTime()) {
			return false;
		}

		// 開始時刻が設定されているか確認
		if (!talk.presentationStartTime) {
			return false;
		}

		// 開始時刻の時間と分を取得
		const [hours, minutes] = talk.presentationStartTime.split(":").map(Number);

		// 発表開始時刻を作成
		const startTime = new Date(now);
		startTime.setHours(hours, minutes, 0, 0);

		// 発表終了時刻を計算（開始時刻 + 発表時間）
		const endTime = new Date(startTime);
		endTime.setMinutes(endTime.getMinutes() + talk.duration);

		// 現在時刻が開始時刻と終了時刻の間かどうかを確認
		return now >= startTime && now <= endTime;
	})();
	// 編集ページへ移動
	const navigateToDashboard = () => {
		router.push("/dashboard");
	};

	return (
		<div className="container mx-auto px-4 py-12">
			<Button variant="ghost" size="sm" asChild className="mb-8">
				<Link href="/talks" className="flex items-center gap-2">
					<ArrowLeft className="h-4 w-4" />
					トークの一覧に戻る
				</Link>
			</Button>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<div className="flex flex-wrap gap-3 mb-4">
						<Badge
							variant="outline"
							className={cn("text-sm", statusColors[talk.status || "pending"])}
						>
							{talk.status
								? talk.status.charAt(0).toUpperCase() + talk.status.slice(1)
								: "Pending"}
						</Badge>
						<Badge variant="secondary">{talk.topic}</Badge>
						<Badge
							variant="outline"
							className="flex items-center gap-1 text-sm"
						>
							<Clock className="h-3.5 w-3.5" />
							{talk.duration} minutes
						</Badge>
						{isLive && (
							<Badge
								variant="destructive"
								className="flex items-center gap-1 text-sm animate-pulse"
							>
								<Radio className="h-3.5 w-3.5" />
								ライブ配信中
							</Badge>
						)}
					</div>

					<h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
						{talk.title}
					</h1>

					<div className="flex items-center text-sm text-muted-foreground mb-8">
						<Calendar className="h-4 w-4 mr-1" />
						<span>提出日: {formattedSubmittedDate}</span>
					</div>

					{talk.imageUrl && (
						<div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
							<Image
								src={talk.imageUrl}
								alt={talk.title}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 800px"
							/>
							{isLive && (
								<div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full animate-pulse">
									<Radio className="h-4 w-4" />
									<span>LIVE</span>
								</div>
							)}
						</div>
					)}

					<div className="prose prose-slate dark:prose-invert max-w-none wrap-break-word text-wrap">
						<h2 className="text-lg">説明</h2>
						<p className="p-1 mt-1 text-md md:text-lg">{talk.description}</p>
					</div>
				</div>

				<div className="lg:col-span-1">
					<div className="sticky top-24 rounded-lg border bg-card p-6">
						<div className="mb-3">
							<h2 className="text-xl font-medium p-1">開催予定のトーク日程</h2>
							<div className="rounded-md bg-accent p-4">
								<div className="text-sm text-muted-foreground">
									発表日: {formattedSessionDate}
								</div>
								<div className="mb-1" />
								<div className="text-sm text-muted-foreground">
									発表場所: {talk.sessionVenue || "未定"}
								</div>
								{talk.presentationStartTime && (
									<>
										<div className="mb-1" />
										<div className="text-sm text-muted-foreground">
											開始時刻: {formatTime(talk.presentationStartTime)}
										</div>
									</>
								)}
							</div>
						</div>

						{talk.hasPresentationUrl && (
							<div className="mb-3">
								<h2 className="text-xl font-medium p-1">
									発表資料・アーカイブ
								</h2>
								<div className="rounded-md bg-accent p-4">
									{talk.hasPresentationUrl && talk.presentationUrl && (
										<div className="text-sm mb-2">
											<div className="font-medium mb-1">プレゼン資料</div>
											<Link
												href={talk.presentationUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:underline break-all"
											>
												{talk.presentationUrl}
											</Link>
										</div>
									)}

									{talk.sessionArchiveUrl && (
										<div className="text-sm">
											<div className="font-medium mb-1">
												セッションアーカイブ
											</div>
											<Link
												href={talk.sessionArchiveUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:underline break-all"
											>
												{talk.sessionArchiveUrl}
											</Link>
										</div>
									)}
								</div>
							</div>
						)}

						<div>
							<h2 className="text-xl font-medium p-1">プレゼンターの情報</h2>

							<div className="flex items-center gap-4 p-4">
								<div>
									<div className="font-medium">{displayName}</div>
									<div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
										<Mail className="h-3.5 w-3.5 mr-1" />
										<div className="mb-2" />
										{talk.email}
									</div>
								</div>
							</div>

							{isOwnTalk && (
								<div className="mt-4">
									<Button
										variant="outline"
										className="w-full flex items-center gap-2"
										onClick={navigateToDashboard}
									>
										<Pencil className="h-4 w-4" />
										トークを編集する
									</Button>
								</div>
							)}

							{/* <div className="flex flex-col gap-3 mt-6">
                {talk.status === "approved" && (
                  <Button className="w-full">Register to Attend</Button>
                )}

                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Share This Talk
                </Button>

                {talk.status === "approved" && (
                  <div className="text-xs text-center text-muted-foreground mt-2">
                    Limited seats available. Register early to secure your spot.
                  </div>
                )}
              </div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
