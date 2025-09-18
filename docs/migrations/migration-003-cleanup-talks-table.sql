-- Migration 003: Cleanup talks table (Future Migration)
-- このファイルは設計書用です。実際のマイグレーションはdrizzle-kit generateで生成されます。
-- ⚠️ 注意: この変更は後日実行予定（全ての機能が完全に移行された後）

-- 1. venue カラムの削除（session.venue を使用するため）
-- ALTER TABLE "talks" DROP COLUMN "venue";

-- 2. presentation_date カラムの削除検討（session.date を使用する可能性）
-- 注意: presentation_date は個別のトークの日付情報として残す可能性もあり
-- 設計検討後に決定
-- ALTER TABLE "talks" DROP COLUMN "presentation_date";

-- 3. 不要なインデックスの削除
-- DROP INDEX IF EXISTS "talks_venue_idx";
-- DROP INDEX IF EXISTS "talks_presentation_date_idx";

-- 4. 制約の追加検討
-- session_id が NULL でない場合の整合性制約など
-- ALTER TABLE "talks" ADD CONSTRAINT "talks_session_id_not_null_for_approved" 
--     CHECK (status != 'approved' OR session_id IS NOT NULL);

-- このマイグレーションは慎重に実行する必要があります
-- 1. 全ての機能がsession ベースに移行完了
-- 2. 十分なテストの実施
-- 3. バックアップの取得
-- 4. ステージング環境での検証
