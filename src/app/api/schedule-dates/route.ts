import { db } from "@/lib/db";
import { ltSessions } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET: セッション一覧を取得する
export async function GET() {
	try {
		if (process.env.NODE_ENV === "production" && process.env.CI) {
			return NextResponse.json([], { status: 200 });
		}

		// セッション一覧を取得
		const result = await db
			.select({
				id: ltSessions.id,
				sessionNumber: ltSessions.sessionNumber,
				date: ltSessions.date,
				title: ltSessions.title,
				venue: ltSessions.venue,
				startTime: ltSessions.startTime,
				endTime: ltSessions.endTime,
				archiveUrl: ltSessions.archiveUrl,
				createdAt: ltSessions.createdAt,
			})
			.from(ltSessions)
			.orderBy(asc(ltSessions.date));

		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		console.error("GET /api/schedule-dates error:", error);
		console.error(
			"Error details:",
			error instanceof Error ? error.message : error,
		);
		return NextResponse.json(
			{
				error: "セッション一覧の取得に失敗しました",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
