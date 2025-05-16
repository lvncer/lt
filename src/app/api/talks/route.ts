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
        fullname
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
        ${fullname}
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
        venue = ${venue}
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
    const { id } = await req.json();

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
