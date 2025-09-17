import { db } from "@/lib/db";
import { ltSessions } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";

// GET: セッション一覧を取得
export async function GET() {
  try {
    const result = await db
      .select()
      .from(ltSessions)
      .orderBy(desc(ltSessions.date), desc(ltSessions.sessionNumber));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("GET /api/lt-sessions error:", error);
    return NextResponse.json(
      { error: "セッション一覧の取得に失敗しました" },
      { status: 500 }
    );
  }
}

// POST: 新しいセッションを作成
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      session_number,
      date,
      title,
      venue,
      start_time = "16:30",
      end_time = "18:00",
    } = body;

    // バリデーション
    if (!session_number || !date || !venue) {
      return NextResponse.json(
        { error: "session_number, date, venue は必須です" },
        { status: 400 }
      );
    }

    // 重複する session_number チェック
    const existingSession = await db
      .select()
      .from(ltSessions)
      .where(eq(ltSessions.sessionNumber, session_number))
      .limit(1);

    if (existingSession.length > 0) {
      return NextResponse.json(
        { error: `第${session_number}回のセッションは既に存在します` },
        { status: 409 }
      );
    }

    // 時間制限チェック（16:30-18:00）
    if (start_time < "16:30" || start_time > "18:00" || 
        end_time < "16:30" || end_time > "18:00" || 
        start_time >= end_time) {
      return NextResponse.json(
        { error: "時間は16:30-18:00の範囲で設定してください" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(ltSessions)
      .values({
        sessionNumber: session_number,
        date,
        title,
        venue,
        startTime: start_time,
        endTime: end_time,
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/lt-sessions error:", error);
    return NextResponse.json(
      { error: "セッションの作成に失敗しました" },
      { status: 500 }
    );
  }
}

// PUT: セッションを更新
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      session_number,
      date,
      title,
      venue,
      start_time = "16:30",
      end_time = "18:00",
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "セッションIDが必要です" },
        { status: 400 }
      );
    }

    // セッションが存在するかチェック
    const existingSession = await db
      .select()
      .from(ltSessions)
      .where(eq(ltSessions.id, id))
      .limit(1);

    if (existingSession.length === 0) {
      return NextResponse.json(
        { error: "セッションが見つかりません" },
        { status: 404 }
      );
    }

    // session_number の重複チェック（自分以外）
    if (session_number) {
      const duplicateSession = await db
        .select()
        .from(ltSessions)
        .where(eq(ltSessions.sessionNumber, session_number))
        .limit(1);

      if (duplicateSession.length > 0 && duplicateSession[0].id !== id) {
        return NextResponse.json(
          { error: `第${session_number}回のセッションは既に存在します` },
          { status: 409 }
        );
      }
    }

    // 時間制限チェック
    if (start_time < "16:30" || start_time > "18:00" || 
        end_time < "16:30" || end_time > "18:00" || 
        start_time >= end_time) {
      return NextResponse.json(
        { error: "時間は16:30-18:00の範囲で設定してください" },
        { status: 400 }
      );
    }

    const result = await db
      .update(ltSessions)
      .set({
        ...(session_number && { sessionNumber: session_number }),
        ...(date && { date }),
        ...(title && { title }),
        ...(venue && { venue }),
        startTime: start_time,
        endTime: end_time,
        updatedAt: new Date(),
      })
      .where(eq(ltSessions.id, id))
      .returning();

    return NextResponse.json(result[0], { status: 200 });
  } catch (error) {
    console.error("PUT /api/lt-sessions error:", error);
    return NextResponse.json(
      { error: "セッションの更新に失敗しました" },
      { status: 500 }
    );
  }
}

// DELETE: セッションを削除
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "セッションIDが必要です" },
        { status: 400 }
      );
    }

    const sessionId = parseInt(id, 10);
    if (isNaN(sessionId)) {
      return NextResponse.json(
        { error: "無効なセッションIDです" },
        { status: 400 }
      );
    }

    // セッションが存在するかチェック
    const existingSession = await db
      .select()
      .from(ltSessions)
      .where(eq(ltSessions.id, sessionId))
      .limit(1);

    if (existingSession.length === 0) {
      return NextResponse.json(
        { error: "セッションが見つかりません" },
        { status: 404 }
      );
    }

    // セッションを削除（talksのsession_idは外部キー制約によりNULLに設定される）
    await db.delete(ltSessions).where(eq(ltSessions.id, sessionId));

    return NextResponse.json(
      { message: "セッションが削除されました" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/lt-sessions error:", error);
    return NextResponse.json(
      { error: "セッションの削除に失敗しました" },
      { status: 500 }
    );
  }
}
