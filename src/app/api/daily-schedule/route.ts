import { db } from "@/lib/db";
import { talks, users, ltSessions } from "@/lib/db/schema";
import { eq, asc, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET: 指定されたセッションのトークスケジュールを取得
export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const sessionId = searchParams.get("sessionId");

		if (!sessionId) {
			return NextResponse.json(
				{ error: "セッションIDパラメータが必要です" },
				{ status: 400 },
			);
		}

		// セッション情報を含めてトークを検索（lt_sessionsとusersテーブルとJOIN）
		const result = await db
			.select({
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
				userId: talks.userId,
				fullname: users.fullname, // usersテーブルからfullnameを取得
				hasPresentationUrl: talks.hasPresentationUrl,
				presentationUrl: talks.presentationUrl,
				presentationStartTime: talks.presentationStartTime,
				// セッション情報を含める
				sessionId: ltSessions.id,
				sessionNumber: ltSessions.sessionNumber,
				sessionDate: ltSessions.date,
				sessionTitle: ltSessions.title,
				sessionVenue: ltSessions.venue,
				sessionStartTime: ltSessions.startTime,
				sessionEndTime: ltSessions.endTime,
				sessionArchiveUrl: ltSessions.archiveUrl,
				sessionIsSpecial: ltSessions.isSpecial,
			})
			.from(talks)
			.leftJoin(users, eq(talks.userId, users.id))
			.leftJoin(ltSessions, eq(talks.sessionId, ltSessions.id))
			.where(
				and(
					eq(talks.sessionId, Number.parseInt(sessionId)),
					eq(talks.status, "approved"),
				),
			)
			.orderBy(asc(talks.presentationStartTime));

		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		console.error("GET /api/daily-schedule error:", error);
		return NextResponse.json(
			{ error: "スケジュールの取得に失敗しました" },
			{ status: 500 },
		);
	}
}

// POST: 複数のトークの開始時刻を一括更新（管理者用）
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { talks: talksToUpdate } = body;

		if (!Array.isArray(talksToUpdate) || talksToUpdate.length === 0) {
			return NextResponse.json(
				{ error: "更新するトークの配列が必要です" },
				{ status: 400 },
			);
		}

		// トランザクションを使用して複数のトークを更新
		await Promise.all(
			talksToUpdate.map(async (talk) => {
				const { id, presentation_start_time } = talk;
				await db
					.update(talks)
					.set({ presentationStartTime: presentation_start_time })
					.where(eq(talks.id, id));
			}),
		);

		return NextResponse.json(
			{ message: "スケジュールが更新されました" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("POST /api/daily-schedule error:", error);
		return NextResponse.json(
			{ error: "スケジュールの更新に失敗しました" },
			{ status: 500 },
		);
	}
}
