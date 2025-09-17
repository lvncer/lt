# API 設計書

## 📋 現状の API エンドポイント

### 1. トーク関連 (`/api/talks`)

#### POST `/api/talks`

**説明**: 新しいトークを登録する
**リクエスト**:

```json
{
  "presenter": "string",
  "email": "string",
  "title": "string",
  "duration": "number",
  "topic": "string",
  "description": "string",
  "image_url": "string",
  "presentation_date": "string (YYYY-MM-DD)",
  "venue": "string", // 🔥 削除予定
  "neonuuid": "number",
  "fullname": "string",
  "has_presentation": "boolean",
  "presentation_url": "string",
  "allow_archive": "boolean",
  "archive_url": "string",
  "presentation_start_time": "string (HH:MM)"
}
```

#### GET `/api/talks`

**説明**: 登録されたトーク一覧を取得する

#### PUT `/api/talks`

**説明**: トークを更新する
**リクエスト**: POST と同じ + `id`

#### DELETE `/api/talks`

**説明**: トークを削除する

### 2. 個別トーク (`/api/talk/[id]`)

#### GET `/api/talk/[id]`

**説明**: 指定された ID のトークを取得する

#### PATCH `/api/talk/[id]`

**説明**: トークのステータスを更新する（管理者用）

### 3. ユーザー関連

#### GET `/api/user-talks/[user_id]`

**説明**: 指定ユーザーのトーク一覧を取得する

#### GET `/api/user-id`

**説明**: ユーザー ID を取得する

#### POST `/api/sync-user`

**説明**: ユーザー情報を同期する

#### POST `/api/update-fullname`

**説明**: フルネームを更新する

#### GET `/api/get-fullname`

**説明**: フルネームを取得する

#### DELETE `/api/user-delete`

**説明**: ユーザーを削除する

### 4. スケジュール関連

#### GET `/api/schedule-dates`

**説明**: スケジュールが存在する日付の一覧を取得する
**現在の実装**: 承認済みトークの presentation_date から重複なしで取得

#### GET `/api/daily-schedule?date=YYYY-MM-DD`

**説明**: 指定された日付のトークスケジュールを取得する
**現在の実装**: 承認済みトークを presentation_start_time で昇順ソート

#### POST `/api/daily-schedule`

**説明**: 複数のトークの開始時刻を一括更新（管理者用）

### 5. その他

#### GET `/api/debug-schema`

**説明**: デバッグ用スキーマ情報取得

#### POST `/api/test-discord`

**説明**: Discord 通知テスト

---

## 🔥 変更が必要な API エンドポイント

### 📍 **修正が必要な既存 API**

#### 1. `POST/PUT /api/talks`

- ❌ **削除**: `venue` フィールド
- ➕ **追加**: `session_id` フィールド
- ➕ **追加**: バリデーション（session_id が存在し、かつ選択された時間がセッション時間内）

#### 2. `GET /api/schedule-dates`

- ❌ **変更**: `talks.presentationDate`から取得 → `lt_sessions.date`から取得
- 🔄 **ロジック変更**: セッションテーブルから有効な日付を返す

#### 3. `GET /api/daily-schedule`

- ➕ **JOIN 追加**: `lt_sessions`テーブルと結合して venue 情報を取得
- ➕ **追加フィールド**: session 情報（第 ○ 回、venue 等）

### 📍 **新規作成が必要な API**

#### 4. `GET/POST/PUT/DELETE /api/lt-sessions`

**新規**: LT セッション管理 API

```json
// GET Response
{
  "sessions": [
    {
      "id": "number",
      "session_number": "number",
      "date": "string (YYYY-MM-DD)",
      "title": "string",
      "venue": "string",
      "start_time": "string (HH:MM)",
      "end_time": "string (HH:MM)"
    }
  ]
}

// POST Request
{
  "session_number": "number",
  "date": "string (YYYY-MM-DD)",
  "title": "string",
  "venue": "string",
  "start_time": "16:30", // 固定値
  "end_time": "18:00"   // 固定値
}
```

#### 5. `GET /api/available-sessions`

**新規**: フォームで利用可能なセッション一覧を取得

```json
{
  "sessions": [
    {
      "id": "number",
      "session_number": "number",
      "date": "string",
      "title": "string",
      "venue": "string"
    }
  ]
}
```

---

## ⚠️ **影響を受けるクライアント側処理**

### フォーム関連

- `TalkForm.tsx`: venue 選択 → session 選択に変更
- `EditableTalkCard.tsx`: venue 削除
- バリデーション: 時間制限チェック（16:30-18:00）

### 表示関連

- `SchedulePage.tsx`: venue 情報を session から取得
- `AdminPage.tsx`: セッション管理タブ追加

---

## 📈 **マイグレーション計画**

### フェーズ 1: データベース変更

1. `lt_sessions`テーブル追加
2. `talks`テーブルに`session_id`追加
3. 既存データの移行スクリプト作成

### フェーズ 2: API 変更

1. 新規 API エンドポイント実装
2. 既存 API 修正（後方互換性維持）

### フェーズ 3: フロントエンド対応

1. フォーム修正
2. 表示コンポーネント修正
3. 管理画面拡張

---

## 🚨 **注意事項**

- **時間制限**: 発表時間は 16:30-18:00 の範囲内のみ
- **データ整合性**: session 削除時は talk.session_id を null に設定
- **後方互換性**: 既存の venue データは一時的に保持してマイグレーション
