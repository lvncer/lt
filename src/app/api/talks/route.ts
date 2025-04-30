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
        user_id
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
        ${neonuuid}
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
