"use client";

import { useState, useEffect } from "react";
import {
	ArrowLeft,
	Clock,
	ChevronLeft,
	ChevronRight,
	Info,
} from "lucide-react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useSessionSchedule } from "@/hooks/useSessionSchedule";
import { useSessionsData } from "@/hooks/useSessionsData";
import { EnhancedSessionList } from "@/components/schedule/enhanced-session-list";
import { Talk } from "@/types/talk";

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

export default function SchedulePage() {
	// セッション一覧を取得
	const { sessions, isSessionsLoading, preloadSessionData } = useSessionsData();

	// 選択されたセッション
	const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
		null,
	);

	// 初期セッションの設定
	useEffect(() => {
		if (
			Array.isArray(sessions) &&
			sessions.length > 0 &&
			selectedSessionId === null
		) {
			// 最新のセッション（日付順で最後）を初期選択
			const latestSession = sessions[sessions.length - 1];
			setSelectedSessionId(latestSession.id);
		}
	}, [sessions, selectedSessionId]);

	// 選択されたセッションのスケジュールを取得
	const { talks, isLoading: isTalksLoading } = useSessionSchedule(
		selectedSessionId || undefined,
	);

	// 現在選択されているセッション情報を取得
	const currentSession = Array.isArray(sessions)
		? sessions.find((s) => s.id === selectedSessionId)
		: null;

	// 前のセッションに移動
	const handlePreviousSession = () => {
		if (!selectedSessionId || !Array.isArray(sessions) || sessions.length === 0)
			return;

		const currentIndex = sessions.findIndex((s) => s.id === selectedSessionId);
		if (currentIndex > 0) {
			const prevSession = sessions[currentIndex - 1];
			setSelectedSessionId(prevSession.id);
			preloadSessionData(prevSession.id);
		}
	};

	// 次のセッションに移動
	const handleNextSession = () => {
		if (!selectedSessionId || !Array.isArray(sessions) || sessions.length === 0)
			return;

		const currentIndex = sessions.findIndex((s) => s.id === selectedSessionId);
		if (currentIndex < sessions.length - 1) {
			const nextSession = sessions[currentIndex + 1];
			setSelectedSessionId(nextSession.id);
			preloadSessionData(nextSession.id);
		}
	};

	// セッション選択時の処理
	const handleSessionChange = (sessionId: number) => {
		setSelectedSessionId(sessionId);
		preloadSessionData(sessionId);
	};

	// 現在実施中のトークかどうかを判定
	const isLiveTalk = (talk: Talk) => {
		if (!talk.presentationStartTime || !currentSession) return false;

		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const sessionDate = parseISO(currentSession.date);
		const sessionDay = new Date(
			sessionDate.getFullYear(),
			sessionDate.getMonth(),
			sessionDate.getDate(),
		);

		// 日付が一致するか確認
		if (today.getTime() !== sessionDay.getTime()) {
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
	};

	// ローディング表示
	if (isSessionsLoading) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<div className="flex flex-col items-center">
					<Info className="h-10 w-10 animate-spin text-blue-500" />
					<p className="mt-4 text-lg">セッション情報を読み込んでいます...</p>
				</div>
			</div>
		);
	}

	// セッションがない場合
	if (
		!isSessionsLoading &&
		(!Array.isArray(sessions) || sessions.length === 0)
	) {
		return (
			<div className="container mx-auto px-4 py-12">
				<Button variant="ghost" size="sm" asChild className="mb-8">
					<Link href="/" className="flex items-center gap-2">
						<ArrowLeft className="h-4 w-4" />
						ホームに戻る
					</Link>
				</Button>

				<div className="max-w-4xl mx-auto text-center py-12">
					<h1 className="text-3xl font-bold tracking-tight mb-6">
						ライトニングトークスケジュール
					</h1>
					<p className="text-lg text-muted-foreground mb-4">
						現在予定されているセッションはありません
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container max-w-7xl mx-auto px-4 py-12">
			<Button variant="ghost" size="sm" asChild className="mb-8">
				<Link href="/" className="flex items-center gap-2">
					<ArrowLeft className="h-4 w-4" />
					ホームに戻る
				</Link>
			</Button>

			<h1 className="text-3xl font-bold tracking-tight mb-6">
				ライトニングトークスケジュール
			</h1>

			{/* セッション選択エリア - 上部に配置 */}
			<div className="mb-6">
				<Card>
					<CardContent className="p-4">
						{/* 現在のセッション表示と前後ボタン */}
						<div className="flex items-center justify-between mb-4">
							<Button
								variant="outline"
								size="icon"
								onClick={handlePreviousSession}
								disabled={
									!selectedSessionId ||
									!Array.isArray(sessions) ||
									sessions.findIndex((s) => s.id === selectedSessionId) === 0
								}
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<div className="text-lg font-medium text-center px-4">
								{currentSession ? (
									<div className="flex items-center space-x-2">
										<span>
											{currentSession.isSpecial
												? "特別枠"
												: `第${currentSession.sessionNumber}回`}
										</span>
										{currentSession.title && (
											<span>- {currentSession.title}</span>
										)}
									</div>
								) : (
									"セッションを選択してください"
								)}
							</div>
							<Button
								variant="outline"
								size="icon"
								onClick={handleNextSession}
								disabled={
									!selectedSessionId ||
									!Array.isArray(sessions) ||
									sessions.findIndex((s) => s.id === selectedSessionId) ===
										sessions.length - 1
								}
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* トーク一覧とセッションリストのレイアウト */}
			<div className="flex flex-col lg:flex-row gap-6">
				{/* 左側: トーク一覧 */}
				<div className="flex-1">
					{currentSession && (
						<div className="mb-4">
							<Card className="bg-muted/50">
								<CardContent className="p-4">
									<div className="flex flex-col space-y-2 text-sm">
										<div className="flex items-center justify-between">
											<span className="font-medium">開催日時:</span>
											<span>
												{format(
													parseISO(currentSession.date),
													"yyyy年MM月dd日",
												)}{" "}
												{currentSession.startTime} - {currentSession.endTime}
											</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="font-medium">会場:</span>
											<span>{currentSession.venue}</span>
										</div>
										{currentSession.archiveUrl && (
											<div className="flex items-center justify-between">
												<span className="font-medium">アーカイブ:</span>
												<Link
													href={currentSession.archiveUrl}
													target="_blank"
													className="text-blue-600 hover:text-blue-800 underline"
												>
													録画を見る
												</Link>
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						</div>
					)}

					{isTalksLoading ? (
						<div className="flex justify-center py-12">
							<Info className="h-8 w-8 animate-spin text-blue-500" />
						</div>
					) : talks.length > 0 ? (
						<div className="space-y-6">
							{talks.map((talk) => (
								<Card key={talk.id} className="overflow-hidden">
									<CardContent className="p-0">
										<div className="flex">
											{/* 左側: 発表時間 */}
											<div className="flex flex-col items-center bg-black/40 justify-center px-4 py-6 min-w-24 border-r">
												<div className="text-xs font-medium mb-1">開始時間</div>
												<div className="text-lg font-bold">
													{formatTime(talk.presentationStartTime)}
												</div>
												{isLiveTalk(talk) && (
													<Badge
														variant="destructive"
														className="animate-pulse mt-2 text-xs px-2 py-0.5"
													>
														LIVE
													</Badge>
												)}
											</div>

											{/* 中央: 画像 */}
											{/* <div className="relative w-48 flex-shrink-0">
												<div className="relative aspect-video">
													{talk.imageUrl && (
														<Image
															src={talk.imageUrl}
															alt={talk.title}
															fill
															className="object-fill"
														/>
													)}
												</div>
											</div> */}

											{/* 右側: 詳細情報 */}
											<div className="flex-1 p-6">
												<div className="flex items-center gap-2 mb-3">
													<Badge variant="outline" className="text-xs">
														{talk.topic}
													</Badge>
												</div>

												<h3 className="text-xl font-semibold mb-2">
													{talk.title}
												</h3>
												<p className="text-md text-muted-foreground mb-3">
													発表者:{" "}
													{talk.fullname && talk.fullname !== "anonymous"
														? talk.fullname
														: talk.presenter}
												</p>
												<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
													{talk.description}
												</p>

												<div className="flex items-center justify-between">
													<div className="flex items-center text-sm text-muted-foreground">
														<Clock className="h-4 w-4 mr-1" />
														<span>{talk.duration} 分</span>
													</div>
													<Button variant="outline" size="sm" asChild>
														<Link href={`/talk/${talk.id}`}>詳細を見る</Link>
													</Button>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					) : (
						<div className="text-center py-12 bg-accent rounded-lg">
							<p className="text-lg text-muted-foreground">
								このセッションに予定されているトークはありません
							</p>
						</div>
					)}
				</div>

				{/* 右側: セッション一覧 - パネル表示 */}
				<div className="lg:w-80 flex-shrink-0">
					<Card className="sticky top-4 h-full">
						<CardContent className="p-4 h-full">
							<div className="h-full max-h-[500px] overflow-y-auto">
								<EnhancedSessionList
									sessions={Array.isArray(sessions) ? sessions : []}
									selectedSessionId={selectedSessionId}
									onSessionSelect={handleSessionChange}
								/>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
