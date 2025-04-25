import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { clerkId } = await req.json();

    const result = await sql`
      SELECT id FROM users WHERE clerk_user_id = ${clerkId}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ id: result.rows[0].id });
  } catch (err) {
    console.error("Failed to get user ID:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
