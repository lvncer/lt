import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

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

    const date_submitted = new Date().toISOString();

    await sql`
      INSERT INTO talks (
        presenter,
        email,
        title,
        duration,
        topic,
        description,
        date_submitted,
        image_url,
        presentation_date,
        venue,
        user_id,
        fullname,
        has_presentation,
        presentation_url,
        allow_archive,
        archive_url,
        presentation_start_time
      ) VALUES (
        ${presenter},
        ${email},
        ${title},
        ${duration},
        ${topic},
        ${description},
        ${date_submitted},
        ${image_url},
        ${presentation_date},
        ${venue},
        ${neonuuid},
        ${fullname},
        ${has_presentation},
        ${presentation_url},
        ${allow_archive},
        ${archive_url},
        ${presentation_start_time}
      );
    `;

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
    const result = await sql`
      SELECT * FROM talks ORDER BY date_submitted DESC;
    `;
    return NextResponse.json(result.rows, { status: 200 });
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

    await sql`
      UPDATE talks
      SET
        title = ${title},
        duration = ${duration},
        topic = ${topic},
        description = ${description},
        image_url = ${image_url},
        presentation_date = ${presentation_date},
        venue = ${venue},
        has_presentation = ${has_presentation},
        presentation_url = ${presentation_url},
        allow_archive = ${allow_archive},
        archive_url = ${archive_url},
        presentation_start_time = ${presentation_start_time}
      WHERE id = ${id};
    `;

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
    const talkResult = await sql`
      SELECT user_id FROM talks WHERE id = ${id};
    `;

    if (talkResult.rows.length === 0) {
      return NextResponse.json({ error: "Talk not found" }, { status: 404 });
    }

    const talk = talkResult.rows[0];

    // NeonのユーザーIDで比較
    if (talk.user_id !== neonUserId) {
      return NextResponse.json(
        { error: "Forbidden: You can only delete your own talks" },
        { status: 403 }
      );
    }

    // 権限チェックが通った場合のみ削除実行
    await sql`
      DELETE FROM talks
      WHERE id = ${id};
    `;

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
