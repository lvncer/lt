-- Migration 001: Add lt_sessions table
-- このファイルは設計書用です。実際のマイグレーションはdrizzle-kit generateで生成されます。

-- 1. lt_sessions テーブル作成
CREATE TABLE "lt_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_number" integer NOT NULL,
	"date" text NOT NULL,
	"title" text,
	"venue" text NOT NULL,
	"start_time" text DEFAULT '16:30' NOT NULL,
	"end_time" text DEFAULT '18:00' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "lt_sessions_session_number_unique" UNIQUE("session_number")
);

-- 2. インデックス作成
CREATE INDEX "lt_sessions_date_idx" ON "lt_sessions"("date");

-- 3. 初期データ投入（既存のvenue/dateから）
-- 注意: 実際のマイグレーション時は既存データを分析して適切な値を設定
INSERT INTO "lt_sessions" ("session_number", "date", "title", "venue", "start_time", "end_time") VALUES
	(1, '2024-01-15', '第1回 新年LT大会', 'さいたまIT・WEB専門学校 PBLルーム', '16:30', '18:00'),
	(2, '2024-02-15', '第2回 春のLT大会', 'さいたまIT・WEB専門学校 2階PC演習室', '16:30', '18:00');
	-- 実際の既存データから生成される

-- この段階ではtalks テーブルは変更しない（後続のマイグレーションで対応）
