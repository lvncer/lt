import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET: データベーステーブル構造を確認
export async function GET() {
	try {
		if (process.env.NODE_ENV === "production" && process.env.CI) {
			return NextResponse.json({
				talks_schema: [],
				message: "Schema info not available during build",
			});
		}

		// talksテーブルの構造を確認
		const talksSchema = await db.execute(
			sql`SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns
          WHERE table_name = 'talks'
          ORDER BY ordinal_position`,
		);

		return NextResponse.json({
			talks_schema: talksSchema.rows,
		});
	} catch (error) {
		console.error("Debug schema error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch schema info" },
			{ status: 500 },
		);
	}
}
