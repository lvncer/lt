import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Retrieve the hashed fullname from the users table
    const result = await db
      .select({ fullname: users.fullname })
      .from(users)
      .where(eq(users.clerkUserId, userId));

    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const hashedFullName = result[0].fullname;

    return NextResponse.json({ hashedFullName });
  } catch (error) {
    console.error("GET /api/get-fullname error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
