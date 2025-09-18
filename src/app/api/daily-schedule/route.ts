import { db } from "@/lib/db";
import { talks, users } from "@/lib/db/schema";
import { eq, and, asc, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

// GET: 指定された日付のトークスケジュールを取得
export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const date = searchParams.get("date");

		if (!date) {
			return NextResponse.json(
				{ error: "日付パラメータが必要です" },
				{ status: 400 },
			);
		}

		// 日付をYYYY-MM-DD形式に正規化
		let normalizedDate = date;
		try {
			// ISO形式やその他の形式からDateオブジェクトを生成しYYYY-MM-DD形式に変換
			normalizedDate = format(new Date(date), "yyyy-MM-dd");
		} catch (e) {
			console.error("日付正規化エラー:", e);
			// エラーが発生した場合は元の日付を使用
		}

		// 正規化された日付でトークを検索（usersテーブルとJOIN）
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
				presentationDate: talks.presentationDate,
				venue: talks.venue,
				userId: talks.userId,
				fullname: users.fullname, // usersテーブルからfullnameを取得
				hasPresentationUrl: talks.hasPresentationUrl,
				presentationUrl: talks.presentationUrl,
				allowArchive: talks.allowArchive,
				archiveUrl: talks.archiveUrl,
				presentationStartTime: talks.presentationStartTime,
			})
			.from(talks)
			.leftJoin(users, eq(talks.userId, users.id))
			.where(
				and(
					sql`DATE(${talks.presentationDate}) = ${normalizedDate}::DATE`,
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
