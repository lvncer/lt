import { db } from "@/lib/db";
import { ltSessions } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { gte, asc } from "drizzle-orm";

// GET: フォームで利用可能なセッション一覧を取得
export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const includeAll = searchParams.get("includeAll") === "true";

		let result;

		if (includeAll) {
			// 編集用: すべてのセッションを取得
			result = await db
				.select({
					id: ltSessions.id,
					sessionNumber: ltSessions.sessionNumber,
					date: ltSessions.date,
					title: ltSessions.title,
					venue: ltSessions.venue,
					startTime: ltSessions.startTime,
					endTime: ltSessions.endTime,
				})
				.from(ltSessions)
				.orderBy(asc(ltSessions.date), asc(ltSessions.sessionNumber));
		} else {
			// 通常の提出フォーム: 今日以降のセッションのみ取得
			const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD形式
			result = await db
				.select({
					id: ltSessions.id,
					sessionNumber: ltSessions.sessionNumber,
					date: ltSessions.date,
					title: ltSessions.title,
					venue: ltSessions.venue,
					startTime: ltSessions.startTime,
					endTime: ltSessions.endTime,
				})
				.from(ltSessions)
				.where(gte(ltSessions.date, today))
				.orderBy(asc(ltSessions.date), asc(ltSessions.sessionNumber));
		}

		// フォーム表示用の形式に整形
		const formattedSessions = result.map((session) => ({
			id: session.id,
			sessionNumber: session.sessionNumber,
			date: session.date,
			title: session.title || `第${session.sessionNumber}回 LT大会`,
			venue: session.venue,
			displayText: `第${session.sessionNumber}回 - ${session.date} (${session.venue})`,
			timeRange: `${session.startTime}-${session.endTime}`,
		}));

		return NextResponse.json(
			{
				sessions: formattedSessions,
				total: formattedSessions.length,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("GET /api/available-sessions error:", error);
		return NextResponse.json(
			{ error: "利用可能なセッションの取得に失敗しました" },
			{ status: 500 },
		);
	}
}
