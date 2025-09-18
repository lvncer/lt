import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

interface DatabaseColumn {
	column_name: string;
	data_type: string;
	is_nullable: string;
}

// POST: データベースマイグレーションを実行
export async function POST() {
	try {
		console.log("データベースマイグレーションを開始...");

		// Step 1: lt_sessionsにarchive_urlカラムを追加
		console.log("Step 1: lt_sessionsテーブルにarchive_urlカラムを追加...");
		try {
			await db.execute(
				sql`ALTER TABLE lt_sessions ADD COLUMN IF NOT EXISTS archive_url text`,
			);
			console.log("✅ archive_urlカラムを追加しました");
		} catch (err) {
			console.log("archive_urlカラム追加エラー (既に存在する可能性):", err);
		}

		// Step 2: talksテーブルから不要なカラムを削除
		console.log("Step 2: talksテーブルから不要なカラムを削除...");
		const columnsToRemove = [
			"presentation_date",
			"venue",
			"allow_archive",
			"archive_url",
		];

		for (const column of columnsToRemove) {
			try {
				await db.execute(
					sql.raw(`ALTER TABLE talks DROP COLUMN IF EXISTS ${column}`),
				);
				console.log(`✅ ${column}カラムを削除しました`);
			} catch (err) {
				console.log(`${column}カラム削除エラー (既に削除済みの可能性):`, err);
			}
		}

		// Step 3: 現在のテーブル構造を確認
		console.log("Step 3: マイグレーション後のテーブル構造を確認...");
		const ltSessionsStructure = await db.execute(
			sql`SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'lt_sessions' ORDER BY ordinal_position`,
		);

		const talksStructure = await db.execute(
			sql`SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'talks' ORDER BY ordinal_position`,
		);

		console.log("✅ マイグレーション完了");

		return NextResponse.json(
			{
				success: true,
				message: "データベースマイグレーションが完了しました",
				ltSessionsStructure: ltSessionsStructure,
				talksStructure: talksStructure,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("データベースマイグレーションエラー:", error);
		return NextResponse.json(
			{
				success: false,
				error: "データベースマイグレーションに失敗しました",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}

// GET: マイグレーション状況を確認
export async function GET() {
	try {
		// lt_sessionsテーブル構造
		const ltSessionsStructure = await db.execute(
			sql`SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'lt_sessions' ORDER BY ordinal_position`,
		);

		// talksテーブル構造
		const talksStructure = await db.execute(
			sql`SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'talks' ORDER BY ordinal_position`,
		);

		// archive_urlカラムがあるかチェック
		const hasArchiveUrl = (
			ltSessionsStructure.rows as unknown as DatabaseColumn[]
		).some((row) => row.column_name === "archive_url");

		// 削除予定のカラムがまだ残っているかチェック
		const remainingColumns = (
			talksStructure.rows as unknown as DatabaseColumn[]
		).filter((row) =>
			["presentation_date", "venue", "allow_archive", "archive_url"].includes(
				row.column_name,
			),
		);

		return NextResponse.json(
			{
				success: true,
				ltSessionsStructure: ltSessionsStructure,
				talksStructure: talksStructure,
				migrationStatus: {
					hasArchiveUrl,
					remainingColumns: remainingColumns.map((row) => row.column_name),
					needsMigration: !hasArchiveUrl || remainingColumns.length > 0,
				},
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("マイグレーション状況確認エラー:", error);
		return NextResponse.json(
			{
				success: false,
				error: "マイグレーション状況の確認に失敗しました",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
