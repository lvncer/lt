# Neon データベース更新手順

## 概要

投稿フォームの発表関連情報追加のために、Neon データベースの talks テーブルにカラムを追加します。

## 追加するカラム

1. `has_presentation` - プレゼン資料共有有無（boolean 型、デフォルトは false）
2. `presentation_url` - 資料 URL（text 型、NULL 許容）
3. `allow_archive` - アーカイブ公開有無（boolean 型、デフォルトは false）
4. `presentation_start_time` - 発表開始時刻（time 型、NULL 許容）

※発表時間の長さ（duration）については既存の`duration`カラムを使用します。

## 更新手順

### 1. Neon ダッシュボードにログイン

1. [Neon Dashboard](https://console.neon.tech/)にアクセス
2. プロジェクトを選択

### 2. SQL エディタを開く

1. ダッシュボードから SQL エディタを開く
2. `docs/sql/add_presentation_fields.sql`に記載されている SQL を実行

```sql
-- has_presentation (プレゼン資料共有有無) - boolean型、デフォルトはfalse
ALTER TABLE talks ADD COLUMN IF NOT EXISTS has_presentation BOOLEAN DEFAULT FALSE;

-- presentation_url (資料URL) - text型、NULL許容（資料共有ありの場合のみ使用）
ALTER TABLE talks ADD COLUMN IF NOT EXISTS presentation_url TEXT;

-- allow_archive (アーカイブ公開有無) - boolean型、デフォルトはfalse
ALTER TABLE talks ADD COLUMN IF NOT EXISTS allow_archive BOOLEAN DEFAULT FALSE;

-- presentation_start_time (発表開始時刻) - time型、NULL許容
ALTER TABLE talks ADD COLUMN IF NOT EXISTS presentation_start_time TIME;
```

### 3. 更新の確認

以下の SQL クエリを実行して、カラムが正しく追加されたことを確認します。

```sql
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM
  information_schema.columns
WHERE
  table_name = 'talks' AND
  column_name IN ('has_presentation', 'presentation_url', 'allow_archive', 'presentation_start_time');
```

### 4. 既存のレコードの更新

必要に応じて、既存のレコードにデフォルト値を設定します。

```sql
-- すべての既存レコードの has_presentation と allow_archive を false に設定
UPDATE talks SET has_presentation = FALSE, allow_archive = FALSE;
```

## 注意事項

- SQL スクリプトの実行は慎重に行ってください
- 実行前にデータベースのバックアップを作成することをお勧めします
- `IF NOT EXISTS`を使用しているため、すでにカラムが存在する場合はエラーにはなりません
