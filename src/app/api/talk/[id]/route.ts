import { db } from "@/lib/db";
import { talks, users, ltSessions } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// 動的ルーティングからIDを取得
export async function GET(
	req: NextRequest,
	context: { params: Promise<{ id: string }> },
) {
	const { id } = await context.params;
	const talkId = parseInt(id, 10);

	if (isNaN(talkId)) {
		return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
	}

	try {
		// talksテーブルとlt_sessions、usersテーブルをJOINしてセッション情報を含めて取得
		const result = await db
			.select({
				// talks テーブルのフィールド
				id: talks.id,
				presenter: talks.presenter,
				email: talks.email,
				title: talks.title,
				duration: talks.duration,
				topic: talks.topic,
				description: talks.description,
				status: talks.status,
				dateSubmitted: talks.dateSubmitted,
				imageUrl: talks.imageUrl,
				sessionId: talks.sessionId,
				userId: talks.userId,
				fullname: talks.fullname,
				hasPresentationUrl: talks.hasPresentationUrl,
				presentationUrl: talks.presentationUrl,
				presentationStartTime: talks.presentationStartTime,
				// セッション情報（JOINで取得）
				sessionNumber: ltSessions.sessionNumber,
				sessionDate: ltSessions.date,
				sessionVenue: ltSessions.venue,
				sessionTitle: ltSessions.title,
				sessionStartTime: ltSessions.startTime,
				sessionEndTime: ltSessions.endTime,
				sessionArchiveUrl: ltSessions.archiveUrl,
			})
			.from(talks)
			.leftJoin(users, eq(talks.userId, users.id))
			.leftJoin(ltSessions, eq(talks.sessionId, ltSessions.id))
			.where(eq(talks.id, talkId));

		if (result.length === 0) {
			return NextResponse.json({ error: "Talk not found" }, { status: 404 });
		}

		return NextResponse.json(result[0]);
	} catch (error) {
		console.error("GET /api/talk/[id] error:", error);
		return NextResponse.json({ error: "Database error" }, { status: 500 });
	}
}

export async function PATCH(
	req: NextRequest,
	context: { params: Promise<{ id: string }> },
) {
	const { id } = await context.params;
	const talkId = parseInt(id, 10);

	if (isNaN(talkId)) {
		return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
	}

	try {
		const body = await req.json();
		const { status } = body;

		if (!["approved", "rejected", "pending"].includes(status)) {
			return NextResponse.json({ error: "Invalid status" }, { status: 400 });
		}

		const result = await db
			.update(talks)
			.set({ status })
			.where(eq(talks.id, talkId))
			.returning();

		if (result.length === 0) {
			return NextResponse.json({ error: "Talk not found" }, { status: 404 });
		}

		return NextResponse.json(result[0]);
	} catch {
		return NextResponse.json({ error: "Database error" }, { status: 500 });
	}
}
