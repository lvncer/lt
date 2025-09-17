-- Migration 002: Add session_id to talks table
-- このファイルは設計書用です。実際のマイグレーションはdrizzle-kit generateで生成されます。

-- 1. talks テーブルに session_id カラム追加
ALTER TABLE "talks" ADD COLUMN "session_id" integer;

-- 2. 外部キー制約追加
ALTER TABLE "talks" ADD CONSTRAINT "talks_session_id_lt_sessions_id_fk" 
    FOREIGN KEY ("session_id") REFERENCES "public"."lt_sessions"("id") 
    ON DELETE SET NULL ON UPDATE NO ACTION;

-- 3. インデックス追加（JOIN性能向上のため）
CREATE INDEX "talks_session_id_idx" ON "talks"("session_id");

-- 4. 既存データの移行
-- 既存のpresentation_date と venue の組み合わせから適切なsession_idを設定
UPDATE "talks" 
SET "session_id" = (
    SELECT s."id" 
    FROM "lt_sessions" s 
    WHERE s."date" = "talks"."presentation_date" 
      AND s."venue" = "talks"."venue"
)
WHERE "presentation_date" IS NOT NULL 
  AND "venue" IS NOT NULL
  AND EXISTS (
    SELECT 1 FROM "lt_sessions" s 
    WHERE s."date" = "talks"."presentation_date" 
      AND s."venue" = "talks"."venue"
  );

-- 5. データ整合性チェック
-- session_id が設定されていないレコードがあれば警告ログ出力
-- SELECT COUNT(*) as unmigrated_talks 
-- FROM "talks" 
-- WHERE "presentation_date" IS NOT NULL 
--   AND "venue" IS NOT NULL 
--   AND "session_id" IS NULL;
