/**
 * 既存のトークにセッション情報を紐づけるマイグレーション API
 * 開発環境でのみ実行可能
 */
import { db } from "@/lib/db";
import { talks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  // 開発環境でのみ実行
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "このAPIは開発環境でのみ利用可能です" },
      { status: 403 }
    );
  }

  try {
    const results: { session: string; count: number; talks: { id: number; title: string }[] }[] = [];

    // 2025-05-30のトークを第1回セッションに紐づけ
    const result1 = await db
      .update(talks)
      .set({ sessionId: 1 })
      .where(eq(talks.presentationDate, "2025-05-30"))
      .returning({ id: talks.id, title: talks.title });
    
    results.push({
      session: "第1回 (2025-05-30)",
      count: result1.length,
      talks: result1
    });

    // 2025-06-30のトークを第2回セッションに紐づけ
    const result2 = await db
      .update(talks)
      .set({ sessionId: 2 })
      .where(eq(talks.presentationDate, "2025-06-30"))
      .returning({ id: talks.id, title: talks.title });
    
    results.push({
      session: "第2回 (2025-06-30)",
      count: result2.length,
      talks: result2
    });

    // 2025-07-31のトークを第3回セッションに紐づけ
    const result3 = await db
      .update(talks)
      .set({ sessionId: 3 })
      .where(eq(talks.presentationDate, "2025-07-31"))
      .returning({ id: talks.id, title: talks.title });
    
    results.push({
      session: "第3回 (2025-07-31)",
      count: result3.length,
      talks: result3
    });

    // 2025-09-30のトークを第4回セッション（ID: 5）に紐づけ
    const result4 = await db
      .update(talks)
      .set({ sessionId: 5 })
      .where(eq(talks.presentationDate, "2025-09-30"))
      .returning({ id: talks.id, title: talks.title });
    
    results.push({
      session: "第4回 (2025-09-30)",
      count: result4.length,
      talks: result4
    });

    // 結果確認
    const allTalks = await db
      .select({
        id: talks.id,
        title: talks.title,
        presentationDate: talks.presentationDate,
        sessionId: talks.sessionId,
      })
      .from(talks)
      .orderBy(talks.presentationDate, talks.id);

    return NextResponse.json({
      success: true,
      message: "既存トークのsessionIdマイグレーション完了",
      results,
      totalUpdated: results.reduce((sum, r) => sum + r.count, 0),
      allTalks
    }, { status: 200 });

  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json(
      { error: "マイグレーション実行に失敗しました", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "既存トークのsessionIdマイグレーション",
    usage: "POST /api/migrate-talks でマイグレーションを実行",
    note: "開発環境でのみ利用可能"
  });
}
