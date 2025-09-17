/**
 * 既存のトークにセッション情報を紐づけるマイグレーションスクリプト
 */
import { db } from "@/lib/db";
import { talks } from "@/lib/db/schema";
import { eq, isNull } from "drizzle-orm";

async function migrateExistingTalks() {
  try {
    console.log("🔄 既存トークのsessionId マイグレーション開始...");

    // 2025-05-30のトークを第1回セッションに紐づけ
    const result1 = await db
      .update(talks)
      .set({ sessionId: 1 })
      .where(eq(talks.presentationDate, "2025-05-30"))
      .returning({ id: talks.id, title: talks.title });
    
    console.log(`✅ 第1回セッション (2025-05-30): ${result1.length}件更新`);
    result1.forEach(talk => console.log(`  - ${talk.title} (ID: ${talk.id})`));

    // 2025-06-30のトークを第2回セッションに紐づけ
    const result2 = await db
      .update(talks)
      .set({ sessionId: 2 })
      .where(eq(talks.presentationDate, "2025-06-30"))
      .returning({ id: talks.id, title: talks.title });
    
    console.log(`✅ 第2回セッション (2025-06-30): ${result2.length}件更新`);
    result2.forEach(talk => console.log(`  - ${talk.title} (ID: ${talk.id})`));

    // 2025-07-31のトークを第3回セッションに紐づけ
    const result3 = await db
      .update(talks)
      .set({ sessionId: 3 })
      .where(eq(talks.presentationDate, "2025-07-31"))
      .returning({ id: talks.id, title: talks.title });
    
    console.log(`✅ 第3回セッション (2025-07-31): ${result3.length}件更新`);
    result3.forEach(talk => console.log(`  - ${talk.title} (ID: ${talk.id})`));

    // 2025-09-30のトークを第4回セッション（新規作成したセッション）に紐づけ
    const result4 = await db
      .update(talks)
      .set({ sessionId: 5 }) // 第4回セッションのIDは5
      .where(eq(talks.presentationDate, "2025-09-30"))
      .returning({ id: talks.id, title: talks.title });
    
    console.log(`✅ 第4回セッション (2025-09-30): ${result4.length}件更新`);
    result4.forEach(talk => console.log(`  - ${talk.title} (ID: ${talk.id})`));

    console.log("🎉 マイグレーション完了！");

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

    console.log("\n📊 マイグレーション後の状態:");
    allTalks.forEach(talk => {
      console.log(`ID: ${talk.id}, SessionID: ${talk.sessionId || 'NULL'}, Date: ${talk.presentationDate}, Title: ${talk.title}`);
    });

  } catch (error) {
    console.error("❌ マイグレーション失敗:", error);
    throw error;
  }
}

// スクリプト実行
migrateExistingTalks()
  .then(() => {
    console.log("✨ スクリプト正常終了");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 スクリプトエラー:", error);
    process.exit(1);
  });
