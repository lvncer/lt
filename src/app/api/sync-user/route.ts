import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (process.env.NODE_ENV === 'production' && process.env.CI) {
      return NextResponse.json({ success: true, message: "User sync not available during build" }, { status: 200 });
    }

    const body = await req.json();
    const { clerk_user_id, username, email, imageUrl } = body;

    // 既存ユーザーをチェック
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, clerk_user_id));

    if (existingUser.length > 0) {
      // 既存ユーザーを更新
      await db
        .update(users)
        .set({
          username,
          email,
          imageUrl,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkUserId, clerk_user_id));
    } else {
      // 新規ユーザーを挿入
      await db.insert(users).values({
        clerkUserId: clerk_user_id,
        username,
        email,
        imageUrl,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DBエラー", error);
    return NextResponse.json({ error: "DBエラー" }, { status: 500 });
  }
}
