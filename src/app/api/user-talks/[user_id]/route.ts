import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// 動的ルーティングからuser_idを取得してtalksを取得するAPI
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ user_id: string }> }
) {
  const { user_id } = await context.params;
  const userId = parseInt(user_id, 10);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
  }

  try {
    const result = await sql`
        SELECT * FROM talks WHERE user_id = ${userId};
      `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "No talks found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
