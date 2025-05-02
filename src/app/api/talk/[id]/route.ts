import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// 動的ルーティングからIDを取得
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const talkId = parseInt(id, 10);

  if (isNaN(talkId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT * FROM talks WHERE id = ${talkId};
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Talk not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
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

    const result = await sql`
      UPDATE talks
      SET status = ${status}
      WHERE id = ${talkId}
      RETURNING *;
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Talk not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
