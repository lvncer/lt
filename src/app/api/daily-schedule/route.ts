import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

// GET: 指定された日付のトークスケジュールを取得
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "日付パラメータが必要です" },
        { status: 400 }
      );
    }

    // 日付をYYYY-MM-DD形式に正規化
    let normalizedDate = date;
    try {
      // ISO形式やその他の形式からDateオブジェクトを生成しYYYY-MM-DD形式に変換
      normalizedDate = format(new Date(date), "yyyy-MM-dd");
    } catch (e) {
      console.error("日付正規化エラー:", e);
      // エラーが発生した場合は元の日付を使用
    }

    // 正規化された日付でトークを検索
    const result = await sql`
      SELECT * FROM talks
      WHERE DATE(presentation_date) = ${normalizedDate}::DATE
      AND status = 'approved'
      ORDER BY presentation_start_time ASC NULLS LAST;
    `;

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("GET /api/daily-schedule error:", error);
    return NextResponse.json(
      { error: "スケジュールの取得に失敗しました" },
      { status: 500 }
    );
  }
}

// POST: 複数のトークの開始時刻を一括更新（管理者用）
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { talks } = body;

    if (!Array.isArray(talks) || talks.length === 0) {
      return NextResponse.json(
        { error: "更新するトークの配列が必要です" },
        { status: 400 }
      );
    }

    // トランザクションを使用して複数のトークを更新
    await Promise.all(
      talks.map(async (talk) => {
        const { id, presentation_start_time } = talk;
        await sql`
          UPDATE talks
          SET presentation_start_time = ${presentation_start_time}
          WHERE id = ${id};
        `;
      })
    );

    return NextResponse.json(
      { message: "スケジュールが更新されました" },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/daily-schedule error:", error);
    return NextResponse.json(
      { error: "スケジュールの更新に失敗しました" },
      { status: 500 }
    );
  }
}
