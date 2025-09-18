import { db } from "@/lib/db";
import { talks, ltSessions } from "@/lib/db/schema";
import { eq, desc, asc } from "drizzle-orm";
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
    const result = await db
      .select({
        // talks テーブルのすべてのフィールド
        id: talks.id,
        presenter: talks.presenter,
        email: talks.email,
        title: talks.title,
        duration: talks.duration,
        topic: talks.topic,
        description: talks.description,
        status: talks.status,
        dateSubmitted: talks.dateSubmitted,
        imageUrl: talks.imageUrl,
        presentationDate: talks.presentationDate,
        venue: talks.venue,
        sessionId: talks.sessionId,
        userId: talks.userId,
        fullname: talks.fullname,
        hasPresentationUrl: talks.hasPresentationUrl,
        presentationUrl: talks.presentationUrl,
        allowArchive: talks.allowArchive,
        archiveUrl: talks.archiveUrl,
        presentationStartTime: talks.presentationStartTime,
        // セッション情報（JOINで取得）
        sessionNumber: ltSessions.sessionNumber,
        sessionDate: ltSessions.date,
        sessionVenue: ltSessions.venue,
        sessionTitle: ltSessions.title,
        sessionStartTime: ltSessions.startTime,
        sessionEndTime: ltSessions.endTime,
      })
      .from(talks)
      .leftJoin(ltSessions, eq(talks.sessionId, ltSessions.id))
      .where(eq(talks.userId, userId))
      .orderBy(
        desc(ltSessions.date),  // セッション日付の新しい順
        desc(talks.dateSubmitted) // 投稿日の新しい順（セカンダリソート）
      );

    if (result.length === 0) {
      return NextResponse.json(
        { error: "No talks found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET user-talks error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
