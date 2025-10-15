# 開発環境セットアップガイド

このドキュメントは、プロジェクトを新しい環境でセットアップする際に必要な手順をまとめたものです。

## 目次

- [プロジェクト概要](#プロジェクト概要)
- [前提条件](#前提条件)
- [環境変数の設定](#環境変数の設定)
- [外部サービスのセットアップ](#外部サービスのセットアップ)
- [セットアップ手順](#セットアップ手順)
- [開発サーバーの起動](#開発サーバーの起動)
- [データベース操作](#データベース操作)
- [デプロイ](#デプロイ)
- [トラブルシューティング](#トラブルシューティング)

---

## プロジェクト概要

Lightning Talks Platform は、LT（ライトニングトーク）の登録・管理・スケジュール表示を行う Web アプリケーションです。

## 前提条件

以下のツールがインストールされている必要があります：

- **Node.js**: v18.17 以上（推奨: v20 以上）
- **Bun**: 最新版（推奨）または npm/yarn
- **Git**: バージョン管理用

```bash
# Node.js のバージョン確認
node --version

# Bun のインストール（未インストールの場合）
curl -fsSL https://bun.sh/install | bash
```

---

## 環境変数の設定

プロジェクトのルートディレクトリに `.env` ファイルを作成し、以下の環境変数を設定してください。

### 必須環境変数

#### 1. Clerk 認証

```bash
# Clerk公開キー（クライアント側で使用）
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx

# Clerkシークレットキー（サーバー側で使用）
CLERK_SECRET_KEY=sk_test_xxxxx
```

**取得方法**: [Clerk ダッシュボード](https://dashboard.clerk.com/) → プロジェクトを選択 → API Keys

#### 2. Neon PostgreSQL データベース

```bash
# データベース接続URL（Drizzle ORM用）
POSTGRES_URL=postgresql://user:password@host/database?sslmode=require

# 認証付きデータベースURL（サーバー側）
DATABASE_AUTHENTICATED_URL=postgresql://user:password@host/database?sslmode=require

# 認証付きデータベースURL（クライアント側）
NEXT_PUBLIC_DATABASE_AUTHENTICATED_URL=postgresql://user:password@host/database?sslmode=require
```

**取得方法**: [Neon Console](https://console.neon.tech/) → プロジェクトを選択 → Connection Details

**注意**: 通常、`POSTGRES_URL` と `DATABASE_AUTHENTICATED_URL` は同じ値を使用します。

### オプション環境変数

#### 3. Discord 通知（オプション）

```bash
# Discord Webhook URL（トーク投稿時の通知用）
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxxxx/xxxxx

# アプリケーションのベースURL（Discord通知のリンク生成用）
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

**取得方法**:

1. Discord サーバーの設定 → 連携サービス → ウェブフック
2. 新しいウェブフックを作成し、URL をコピー

**注意**: `DISCORD_WEBHOOK_URL` が設定されていない場合、通知機能は無効になりますが、アプリケーションは正常に動作します。

### .env ファイルのテンプレート

```bash
# Clerk認証
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Neon PostgreSQL
POSTGRES_URL=
DATABASE_AUTHENTICATED_URL=
NEXT_PUBLIC_DATABASE_AUTHENTICATED_URL=

# Discord通知（オプション）
DISCORD_WEBHOOK_URL=
NEXT_PUBLIC_BASE_URL=
```

---

## 外部サービスのセットアップ

### 1. Clerk 認証のセットアップ

#### ステップ 1: Clerk アカウント作成

1. [Clerk](https://clerk.com/) にアクセス
2. アカウントを作成し、新しいアプリケーションを作成

#### ステップ 2: 認証方法の設定

1. ダッシュボード → User & Authentication → Email, Phone, Username
2. 推奨設定：
   - Email Address: 有効化（必須）
   - Password: 有効化
   - Email verification: 有効化

#### ステップ 3: API Keys を取得

1. ダッシュボード → API Keys
2. `Publishable key` と `Secret key` をコピー
3. `.env` ファイルに設定

#### ステップ 4: リダイレクト URL の設定

開発環境：

- Sign-in URL: `/sign-in`
- Sign-up URL: `/sign-up`
- After sign-in: `/dashboard`
- After sign-up: `/verify/name`

### 2. Neon PostgreSQL のセットアップ

#### ステップ 1: Neon アカウント作成

1. [Neon](https://neon.tech/) にアクセス
2. アカウントを作成し、新しいプロジェクトを作成

#### ステップ 2: プロジェクト設定

1. プロジェクト名を設定（例: `siw-lt`）
2. リージョンを選択（推奨: `AWS Asia Pacific (Tokyo)` または `AWS Asia Pacific (Singapore)`）
3. PostgreSQL バージョン: 17（推奨）

#### ステップ 3: 接続情報を取得

1. プロジェクトダッシュボード → Connection Details
2. Connection string をコピー
3. `.env` ファイルに設定

#### ステップ 4: ブランチ構成（オプション）

- `production`: 本番環境用（デフォルトブランチ）
- `development`: 開発環境用（オプション）

### 3. Discord 通知のセットアップ（オプション）

#### ステップ 1: Discord サーバーを準備

1. 通知を送信したい Discord サーバーを用意
2. サーバーの管理権限を持っていることを確認

#### ステップ 2: Webhook を作成

1. サーバー設定 → 連携サービス → ウェブフック
2. 「新しいウェブフック」をクリック
3. 名前を設定（例: `LT Platform Notifications`）
4. 通知を送信するチャンネルを選択
5. Webhook URL をコピー
6. `.env` ファイルに設定

#### 通知の内容

トーク投稿時に以下の情報が Discord に送信されます：

- トークタイトル
- 発表者名
- トピック
- 発表時間
- セッション情報
- 説明
- トーク詳細ページへのリンク

---

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/lvncer/lt.git
cd lt
```

### 2. 依存関係のインストール

```bash
# Bunを使用（推奨）
bun install

# または npm
npm install
```

### 3. 環境変数の設定

```bash
# .envファイルを作成
cp .env.example .env  # .env.exampleがある場合

# またはテンプレートから手動で作成
touch .env
```

`.env` ファイルに必要な環境変数を設定してください（前述の「環境変数の設定」セクションを参照）。

### 4. データベースのマイグレーション

#### 初回セットアップ時

```bash
# マイグレーションファイルを生成（スキーマ変更時）
bun run drizzle-kit generate

# データベースにマイグレーションを適用
bun run drizzle-kit push
```

**重要**: マイグレーションを実行する前に、`POSTGRES_URL` が正しく設定されていることを確認してください。

#### マイグレーションの確認

Neon Console でデータベースを確認：

1. Neon Console → プロジェクトを選択
2. Tables タブで以下のテーブルが作成されていることを確認：
   - `users`
   - `lt_sessions`
   - `talks`

---

## 開発サーバーの起動

### 開発モード

```bash
# Turbopackを使用した高速開発サーバー
bun run dev

# または npm
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションにアクセスできます。

### ポート変更（オプション）

デフォルトのポート 3000 が使用中の場合：

```bash
PORT=3001 bun run dev
```

---

## データベース操作

### Drizzle ORM コマンド

#### マイグレーションファイルの生成

スキーマファイル（`src/lib/db/schema.ts`）を変更した後：

```bash
bun run drizzle-kit generate
```

#### データベースにマイグレーションを適用

```bash
bun run drizzle-kit push
```

#### Drizzle Studio でデータベースを確認

ブラウザベースのデータベースビューアー：

```bash
bun run drizzle-kit studio
```

ブラウザで [https://local.drizzle.studio](https://local.drizzle.studio) を開いてデータベースの内容を確認できます。

### 初期データの投入（オプション）

テスト用のセッションデータを作成する場合：

```bash
# テストセッション作成スクリプト（存在する場合）
bun run scripts/create_test_sessions.ts
```

または、管理画面 (`/admin`) からセッションを手動で作成できます。

---

## デプロイ

### Vercel へのデプロイ

#### Vercel デプロイの前提条件

- Vercel アカウント
- GitHub リポジトリとの連携

#### 1. Vercel プロジェクトを作成

1. [Vercel](https://vercel.com/) にログイン
2. 「New Project」をクリック
3. GitHub リポジトリを選択

#### 2. 環境変数を設定

Vercel プロジェクト設定 → Environment Variables で以下を設定：

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx
POSTGRES_URL=postgresql://user:password@host/database?sslmode=require
DATABASE_AUTHENTICATED_URL=postgresql://user:password@host/database?sslmode=require
NEXT_PUBLIC_DATABASE_AUTHENTICATED_URL=postgresql://user:password@host/database?sslmode=require
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxxxx/xxxxx
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

**注意**: 本番環境では Clerk の Live Keys を使用してください。

#### 3. ビルド設定

- **Framework Preset**: Next.js
- **Build Command**: `bun run build` または `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `bun install` または `npm install`

#### 4. デプロイ実行

「Deploy」ボタンをクリックしてデプロイを開始します。

#### 5. カスタムドメインの設定（オプション）

Vercel プロジェクト設定 → Domains でカスタムドメインを追加できます。

### 本番環境での注意事項

1. **Clerk のリダイレクト URL を更新**

   - Clerk ダッシュボード → Domains
   - 本番ドメインを追加し、リダイレクト URL を設定

2. **Neon の本番ブランチを使用**

   - `production` ブランチの接続情報を使用
   - 必要に応じて自動バックアップを設定

3. **Discord Webhook の URL を確認**
   - `NEXT_PUBLIC_BASE_URL` が本番ドメインになっていることを確認

---

## トラブルシューティング

### データベース接続エラー

#### データベース接続エラーの症状

```text
Error: Connection timeout
または
Error: ECONNREFUSED
```

#### データベース接続エラーの解決方法

1. `POSTGRES_URL` が正しく設定されているか確認
2. Neon Console でデータベースが起動しているか確認
3. SSL 接続が有効になっているか確認（`?sslmode=require` が URL に含まれているか）
4. ファイアウォールやネットワーク設定を確認

### Clerk 認証エラー

#### Clerk 認証エラーの症状

```text
Clerk: Missing publishable key
または
Sign in failed
```

#### Clerk 認証エラーの解決方法

1. `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` と `CLERK_SECRET_KEY` が正しく設定されているか確認
2. Clerk ダッシュボードでアプリケーションが有効になっているか確認
3. 開発環境では Test Keys、本番環境では Live Keys を使用しているか確認
4. ブラウザのキャッシュをクリア

### Discord 通知が送信されない

#### Discord 通知エラーの症状

Discord に通知が表示されない

#### Discord 通知エラーの解決方法

1. `DISCORD_WEBHOOK_URL` が正しく設定されているか確認
2. Webhook URL が有効か（Discord で削除されていないか）確認
3. サーバーログで Discord API のエラーメッセージを確認
4. `NEXT_PUBLIC_BASE_URL` が正しく設定されているか確認

**注意**: Discord 通知はオプション機能です。設定されていなくてもアプリケーションは正常に動作します。

### ビルドエラー

#### ビルドエラーの症状

```text
Error: Build failed
または
Type error: ...
```

#### ビルドエラーの解決方法

1. 依存関係を再インストール

   ```bash
   rm -rf node_modules
   rm bun.lock
   bun install
   ```

2. 型エラーの場合、`tsconfig.json` の設定を確認
3. Next.js のキャッシュをクリア

   ```bash
   rm -rf .next
   bun run build
   ```

### マイグレーションエラー

#### マイグレーションエラーの症状

```text
Error: Migration failed
または
Error: Table already exists
```

#### マイグレーションエラーの解決方法

1. 既存のマイグレーションファイルを確認（`src/lib/db/migrations/`）
2. データベースの現在の状態を確認（Drizzle Studio または Neon Console）
3. 必要に応じてマイグレーションをリセット（**注意: データが失われる可能性があります**）

   ```bash
   # データベースをリセットしたい場合（開発環境のみ）
   # Neon Consoleでテーブルを手動で削除
   # その後、マイグレーションを再実行
   bun run drizzle-kit push
   ```

---

## 参考リンク

### 公式ドキュメント

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Clerk ドキュメント](https://clerk.com/docs)
- [Neon ドキュメント](https://neon.tech/docs)
- [Drizzle ORM ドキュメント](https://orm.drizzle.team/docs/overview)
- [Shadcn/ui ドキュメント](https://ui.shadcn.com/)

### プロジェクト内ドキュメント

- [システムアーキテクチャ](./system-architecture.md)
- [技術スタック](./tech-stacks.md)
- [API 設計書](./apis.md)
- [データベース設計書](./db.md)
- [貢献ガイド](../CONTRIBUTING.md)
- [コミット規約](../COMMIT_CONVENTION.md)

---

## サポート

問題が解決しない場合は、以下の方法でサポートを受けられます：

1. GitHub Issues で質問・バグ報告
2. プロジェクトの Discord サーバーで質問（利用可能な場合）
3. プロジェクトメンテナーに連絡

---

**最終更新日**: 2025-10-15
