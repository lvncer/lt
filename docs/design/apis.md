# API 設計書

## 実装済み API エンドポイント

### 1. トーク関連 (`/api/talks`)

#### POST `/api/talks`

**説明**: 新しいトークを登録する（Discord 通知も非同期送信）
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
  "session_id": "number",
  "neonuuid": "number",
  "fullname": "string",
  "has_presentation": "boolean",
  "presentation_url": "string",
  "presentation_start_time": "string (HH:MM)" // 必須
}
```

**レスポンス**:

```json
{
  "message": "Talk submitted successfully"
}
```

**バリデーション**:

- `presentation_start_time` は必須フィールド

#### GET `/api/talks`

**説明**: 登録されたトーク一覧を取得する（セッション情報も JOIN して取得）
**レスポンス**:

```json
[
  {
    "id": "number",
    "presenter": "string",
    "email": "string",
    "title": "string",
    "duration": "number",
    "topic": "string",
    "description": "string",
    "status": "string",
    "dateSubmitted": "timestamp",
    "imageUrl": "string",
    "sessionId": "number",
    "userId": "number",
    "fullname": "string",
    "hasPresentationUrl": "boolean",
    "presentationUrl": "string",
    "presentationStartTime": "string",
    "sessionNumber": "number",
    "sessionDate": "string",
    "sessionVenue": "string",
    "sessionTitle": "string",
    "sessionStartTime": "string",
    "sessionEndTime": "string",
    "sessionArchiveUrl": "string"
  }
]
```

#### PUT `/api/talks`

**説明**: トークを更新する
**リクエスト**:

```json
{
  "id": "number",
  "title": "string",
  "duration": "number",
  "topic": "string",
  "description": "string",
  "image_url": "string",
  "session_id": "number",
  "has_presentation": "boolean",
  "presentation_url": "string",
  "presentation_start_time": "string (HH:MM)" // 必須
}
```

**バリデーション**:

- `presentation_start_time` は必須フィールド

#### DELETE `/api/talks`

**説明**: トークを削除する（自分のトークのみ削除可能）
**リクエスト**:

```json
{
  "id": "number",
  "userId": "number" // Neon user ID
}
```

**レスポンス**:

- 200: 削除成功
- 401: 未認証
- 403: 権限なし（他人のトークを削除しようとした場合）
- 404: トークが見つからない

---

### 2. 個別トーク (`/api/talk/[id]`)

#### GET `/api/talk/[id]`

**説明**: 指定された ID のトークを取得する（セッション情報も JOIN して取得）
**レスポンス**: `/api/talks` の GET と同じ形式（単一オブジェクト）

#### PATCH `/api/talk/[id]`

**説明**: トークのステータスを更新する（管理者用）
**リクエスト**:

```json
{
  "status": "approved" | "rejected" | "pending"
}
```

**レスポンス**: 更新後のトーク情報

---

### 3. ユーザー関連

#### GET `/api/user-talks/[user_id]`

**説明**: 指定ユーザーのトーク一覧を取得する（セッション情報も JOIN して取得）
**レスポンス**: `/api/talks` の GET と同じ形式の配列

#### POST `/api/user-id`

**説明**: Clerk ユーザー ID から Neon データベースのユーザー ID を取得する
**リクエスト**:

```json
{
  "clerkId": "string"
}
```

**レスポンス**:

```json
{
  "id": "number"
}
```

#### POST `/api/sync-user`

**説明**: Clerk からユーザー情報を同期する（新規作成 or 更新）
**リクエスト**:

```json
{
  "clerk_user_id": "string",
  "username": "string",
  "email": "string",
  "imageUrl": "string"
}
```

**レスポンス**:

```json
{
  "success": true
}
```

#### GET `/api/get-fullname?userId=<clerkUserId>`

**説明**: 指定ユーザーのフルネーム（ハッシュ化済み）を取得する
**クエリパラメータ**:

- `userId`: Clerk ユーザー ID

**レスポンス**:

```json
{
  "hashedFullName": "string"
}
```

#### POST `/api/update-fullname`

**説明**: ユーザーとトークのフルネームを更新する
**リクエスト**:

```json
{
  "clerkUserId": "string",
  "neonUserId": "number",
  "newFullName": "string"
}
```

**レスポンス**:

```json
{
  "message": "Full name updated successfully"
}
```

#### DELETE `/api/user-delete`

**説明**: ユーザーアカウントを削除する（関連するトークも全て削除）
**認証**: Clerk 認証必須
**レスポンス**:

```json
{
  "message": "User account and all associated talks deleted successfully",
  "deletedUserId": "number"
}
```

---

### 4. スケジュール関連

#### GET `/api/schedule-dates`

**説明**: セッション一覧を取得する（日付順）
**レスポンス**:

```json
[
  {
    "id": "number",
    "sessionNumber": "number",
    "date": "string (YYYY-MM-DD)",
    "title": "string",
    "venue": "string",
    "startTime": "string (HH:MM)",
    "endTime": "string (HH:MM)",
    "archiveUrl": "string",
    "createdAt": "timestamp"
  }
]
```

#### GET `/api/daily-schedule?sessionId=<sessionId>`

**説明**: 指定されたセッションの承認済みトークスケジュールを取得する
**クエリパラメータ**:

- `sessionId`: セッション ID（必須）

**レスポンス**: `/api/talks` の GET と同じ形式の配列（`presentation_start_time` で昇順ソート）

#### POST `/api/daily-schedule`

**説明**: 複数のトークの開始時刻を一括更新（管理者用）
**リクエスト**:

```json
{
  "talks": [
    {
      "id": "number",
      "presentation_start_time": "string (HH:MM)"
    }
  ]
}
```

**レスポンス**:

```json
{
  "message": "スケジュールが更新されました"
}
```

---

### 5. セッション関連 (`/api/lt-sessions`)

#### GET `/api/lt-sessions`

**説明**: セッション一覧を取得する（日付・セッション番号の降順）
**レスポンス**:

```json
[
  {
    "id": "number",
    "sessionNumber": "number",
    "date": "string (YYYY-MM-DD)",
    "title": "string",
    "venue": "string",
    "startTime": "string (HH:MM)",
    "endTime": "string (HH:MM)",
    "archiveUrl": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
]
```

#### POST `/api/lt-sessions`

**説明**: 新しいセッションを作成する
**リクエスト**:

```json
{
  "session_number": "number",
  "date": "string (YYYY-MM-DD)",
  "title": "string",
  "venue": "string",
  "start_time": "string (HH:MM)", // デフォルト: "16:30"
  "end_time": "string (HH:MM)" // デフォルト: "18:00"
}
```

**バリデーション**:

- `session_number`, `date`, `venue` は必須
- `session_number` の重複チェック
- 時間は 16:30-18:00 の範囲内である必要がある

**レスポンス**: 作成されたセッション情報

#### PUT `/api/lt-sessions`

**説明**: セッションを更新する
**リクエスト**:

```json
{
  "id": "number",
  "session_number": "number",
  "date": "string (YYYY-MM-DD)",
  "title": "string",
  "venue": "string",
  "start_time": "string (HH:MM)",
  "end_time": "string (HH:MM)"
}
```

**バリデーション**:

- `id` は必須
- `session_number` の重複チェック（自分以外）
- 時間は 16:30-18:00 の範囲内である必要がある

**レスポンス**: 更新されたセッション情報

#### DELETE `/api/lt-sessions?id=<sessionId>`

**説明**: セッションを削除する（関連するトークの `session_id` は NULL に設定される）
**クエリパラメータ**:

- `id`: セッション ID（必須）

**レスポンス**:

```json
{
  "message": "セッションが削除されました"
}
```

---

### 6. 利用可能セッション (`/api/available-sessions`)

#### GET `/api/available-sessions?includeAll=<boolean>`

**説明**: フォームで利用可能なセッション一覧を取得する
**クエリパラメータ**:

- `includeAll`: `true` の場合、過去のセッションも含めて全て取得。デフォルトは `false`（今日以降のセッションのみ）

**レスポンス**:

```json
{
  "sessions": [
    {
      "id": "number",
      "sessionNumber": "number",
      "date": "string (YYYY-MM-DD)",
      "title": "string",
      "venue": "string",
      "displayText": "第1回 - 2025-01-01 (Tokyo Office)",
      "timeRange": "16:30-18:00"
    }
  ],
  "total": "number"
}
```

---

### 7. デバッグ関連

#### GET `/api/debug-schema`

**説明**: デバッグ用スキーマ情報取得

#### POST `/api/test-discord`

**説明**: Discord 通知テスト

#### GET `/api/debug-db`

**説明**: データベース接続テスト

#### POST `/api/migrate-db`

**説明**: データベースマイグレーション実行

---

## 🔑 主要な設計パターン

### 1. データ取得の統一

- トーク関連のエンドポイントは全て `lt_sessions` と `users` テーブルを LEFT JOIN
- セッション情報（会場、日付等）を常に一緒に返すことでクライアント側の処理を簡素化

### 2. バリデーション

- `presentation_start_time` は必須フィールドとして厳密にチェック
- セッションの時間制限（16:30-18:00）を API レベルで検証
- セッション番号の重複を防止

### 3. 権限管理

- トーク削除は自分のトークのみ可能
- ステータス更新（承認/却下）は管理者のみ
- ユーザー削除は認証済みユーザーのみ

### 4. 外部キー制約

- セッション削除時は関連トークの `session_id` を NULL に設定（ON DELETE SET NULL）
- データの整合性をデータベースレベルで保証

---

## 📊 レスポンスコード一覧

| コード | 説明                   | 使用例                     |
| ------ | ---------------------- | -------------------------- |
| 200    | 成功                   | GET, PUT, DELETE 成功時    |
| 201    | 作成成功               | POST 成功時                |
| 400    | 不正なリクエスト       | バリデーションエラー       |
| 401    | 未認証                 | 認証が必要なエンドポイント |
| 403    | 権限なし               | 他人のリソースへのアクセス |
| 404    | リソースが見つからない | ID が存在しない            |
| 409    | コンフリクト           | セッション番号の重複等     |
| 500    | サーバーエラー         | データベースエラー等       |

---

## ⚙️ 実装済み機能

### ✅ 完了済み

- ✅ セッションテーブルとの完全統合
- ✅ トークの CRUD 操作全て実装
- ✅ セッション管理 API（作成・更新・削除）
- ✅ ユーザー情報の同期と管理
- ✅ Discord 通知の非同期送信
- ✅ 権限チェック（トーク削除等）
- ✅ バリデーション（時間制限、必須フィールド等）
- ✅ セッション情報の JOIN による効率的なデータ取得

### 📝 注意事項

- **時間制限**: 発表時間は 16:30-18:00 の範囲内のみ
- **データ整合性**: セッション削除時は `talk.session_id` を NULL に設定
- **Discord 通知**: トーク登録時に非同期で Discord に通知を送信（メイン処理はブロックしない）
