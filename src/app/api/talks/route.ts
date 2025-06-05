import { db } from "@/lib/db";
import { talks } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";
import {
  sendDiscordNotificationAsync,
  type TalkNotificationData,
} from "@/lib/discord";

// POST: 新しいトークを登録
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      presenter,
      email,
      title,
      duration,
      topic,
      description,
      image_url,
      presentation_date,
      venue,
      neonuuid,
      fullname,
      has_presentation,
      presentation_url,
      allow_archive,
      archive_url,
      presentation_start_time,
    } = body;

    // presentation_start_timeの必須バリデーション
    if (!presentation_start_time || presentation_start_time.trim() === "") {
      return NextResponse.json(
        { error: "発表開始時刻は必須です" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(talks)
      .values({
        presenter,
        email,
        title,
        duration,
        topic,
        description,
        dateSubmitted: new Date(),
        imageUrl: image_url,
        presentationDate: presentation_date,
        venue,
        userId: neonuuid,
        fullname,
        hasPresentationUrl: has_presentation,
        presentationUrl: presentation_url,
        allowArchive: allow_archive,
        archiveUrl: archive_url,
        presentationStartTime: presentation_start_time,
      })
      .returning({ id: talks.id });

    // Discord通知を非同期で送信（メイン処理をブロックしない）
    if (result && result.length > 0) {
      const talkId = result[0].id;
      const notificationData: TalkNotificationData = {
        title,
        presenter,
        topic,
        duration,
        description,
        venue,
        presentationDate: presentation_date,
        talkId,
      };

      sendDiscordNotificationAsync(notificationData);
    }

    return NextResponse.json(
      { message: "Talk submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/talks error:", error);
    return NextResponse.json(
      { error: "Failed to submit talk" },
      { status: 500 }
    );
  }
}

// GET: 登録されたトーク一覧を取得
export async function GET() {
  try {
    const result = await db
      .select()
      .from(talks)
      .orderBy(desc(talks.dateSubmitted));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("GET /api/talks error:", error);
    return NextResponse.json(
      { error: "Failed to fetch talks" },
      { status: 500 }
    );
  }
}

// PUT: トークを更新
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      duration,
      topic,
      description,
      image_url,
      presentation_date,
      venue,
      has_presentation,
      presentation_url,
      allow_archive,
      archive_url,
      presentation_start_time,
    } = body;

    // presentation_start_timeの必須バリデーション
    if (!presentation_start_time || presentation_start_time.trim() === "") {
      return NextResponse.json(
        { error: "発表開始時刻は必須です" },
        { status: 400 }
      );
    }

    await db
      .update(talks)
      .set({
        title,
        duration,
        topic,
        description,
        imageUrl: image_url,
        presentationDate: presentation_date,
        venue,
        hasPresentationUrl: has_presentation,
        presentationUrl: presentation_url,
        allowArchive: allow_archive,
        archiveUrl: archive_url,
        presentationStartTime: presentation_start_time,
      })
      .where(eq(talks.id, id));

    return NextResponse.json(
      { message: "Talk updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/talks error:", error);
    return NextResponse.json(
      { error: "Failed to update talk" },
      { status: 500 }
    );
  }
}

// DELETE: トークを削除
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id, userId: neonUserId } = body;

    if (!neonUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 削除しようとするトークが現在のユーザーのものかチェック
    const talkResult = await db
      .select({ userId: talks.userId })
      .from(talks)
      .where(eq(talks.id, id));

    if (talkResult.length === 0) {
      return NextResponse.json({ error: "Talk not found" }, { status: 404 });
    }

    const talk = talkResult[0];

    // NeonのユーザーIDで比較
    if (talk.userId !== neonUserId) {
      return NextResponse.json(
        { error: "Forbidden: You can only delete your own talks" },
        { status: 403 }
      );
    }

    // 権限チェックが通った場合のみ削除実行
    await db.delete(talks).where(eq(talks.id, id));

    return NextResponse.json(
      { message: "Talk deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/talks error:", error);
    return NextResponse.json(
      { error: "Failed to delete talk" },
      { status: 500 }
    );
  }
}
