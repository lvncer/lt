import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET: データベースの状況をデバッグする
export async function GET() {
	try {
		console.log("データベースデバッグを開始...");

		// テーブル一覧を取得
		const tablesResult = await db.execute(
			sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`,
		);

		console.log("テーブル一覧:", tablesResult);

		// lt_sessionsテーブルの構造を確認
		let ltSessionsStructure = null;
		try {
			const structureResult = await db.execute(
				sql`SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'lt_sessions' ORDER BY ordinal_position`,
			);
			ltSessionsStructure = structureResult;
			console.log("lt_sessionsテーブル構造:", structureResult);
		} catch (err) {
			console.log("lt_sessionsテーブル構造取得エラー:", err);
		}

		// lt_sessionsのデータ件数を確認
		let ltSessionsCount = null;
		try {
			const countResult = await db.execute(
				sql`SELECT COUNT(*) FROM lt_sessions`,
			);
			ltSessionsCount = countResult;
			console.log("lt_sessionsデータ件数:", countResult);
		} catch (err) {
			console.log("lt_sessionsデータ件数取得エラー:", err);
		}

		return NextResponse.json(
			{
				success: true,
				tables: tablesResult,
				ltSessionsStructure,
				ltSessionsCount,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("データベースデバッグエラー:", error);
		return NextResponse.json(
			{
				success: false,
				error: "データベースデバッグに失敗しました",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
