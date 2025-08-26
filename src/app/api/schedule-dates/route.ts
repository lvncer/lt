import { db } from "@/lib/db";
import { talks } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { format } from "date-fns";

// GET: スケジュールが存在する日付の一覧を取得する
export async function GET() {
  try {
    if (process.env.NODE_ENV === 'production' && process.env.CI) {
      return NextResponse.json([], { status: 200 });
    }

    // 承認済みトークがある日付の一覧を取得（重複なし）
    const result = await db
      .selectDistinct({ presentationDate: talks.presentationDate })
      .from(talks)
      .where(eq(talks.status, "approved"))
      .orderBy(asc(talks.presentationDate));

    // 結果を日付の配列に変換し、YYYY-MM-DD形式に正規化
    const dates = result
      .filter((row) => row.presentationDate) // null値を除外
      .map((row) => {
        // ISO形式の日付文字列をYYYY-MM-DD形式に変換
        let dateStr = row.presentationDate!;
        try {
          // ISO形式またはその他の形式からDateオブジェクトを生成し、YYYY-MM-DD形式に変換
          dateStr = format(new Date(dateStr), "yyyy-MM-dd");
        } catch (e) {
          console.error("日付変換エラー:", e);
        }
        return dateStr;
      });

    return NextResponse.json(dates, { status: 200 });
  } catch (error) {
    console.error("GET /api/schedule-dates error:", error);
    return NextResponse.json(
      { error: "スケジュール日付の取得に失敗しました" },
      { status: 500 }
    );
  }
}
