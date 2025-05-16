import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { clerkUserId, neonUserId, newFullName } = await req.json();

    if (!clerkUserId || !neonUserId || !newFullName) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await sql`
      UPDATE users
      SET fullname = ${newFullName}
      WHERE clerk_user_id = ${clerkUserId};
    `;

    await sql`
      UPDATE talks
      SET fullname = ${newFullName}
      WHERE user_id = ${neonUserId};
    `;

    return NextResponse.json({ message: "Full name updated successfully" });
  } catch (error) {
    console.error("POST /api/update-fullname error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
