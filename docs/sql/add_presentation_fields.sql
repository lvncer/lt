-- 投稿テーブルに発表関連情報のカラムを追加するSQL
-- has_presentation (プレゼン資料共有有無) - boolean型、デフォルトはfalse
ALTER TABLE talks
ADD COLUMN IF NOT EXISTS has_presentation BOOLEAN DEFAULT FALSE;
-- presentation_url (資料URL) - text型、NULL許容（資料共有ありの場合のみ使用）
ALTER TABLE talks
ADD COLUMN IF NOT EXISTS presentation_url TEXT;
-- allow_archive (アーカイブ公開有無) - boolean型、デフォルトはfalse
ALTER TABLE talks
ADD COLUMN IF NOT EXISTS allow_archive BOOLEAN DEFAULT FALSE;
-- presentation_start_time (発表開始時刻) - time型、NULL許容
ALTER TABLE talks
ADD COLUMN IF NOT EXISTS presentation_start_time TIME;
-- presentation_duration (発表時間、分単位) - integer型
-- ※すでにdurationカラムが存在しているためこちらは追加しない
-- カラム追加の確認
SELECT column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'talks'
    AND column_name IN (
        'has_presentation',
        'presentation_url',
        'allow_archive',
        'presentation_start_time'
    );