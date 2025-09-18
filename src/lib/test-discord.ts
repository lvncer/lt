/**
 * Discord通知機能のテスト用ユーティリティ
 * 開発環境でDiscord通知をテストするための関数
 */

import { sendDiscordNotification, type TalkNotificationData } from "./discord";

/**
 * テスト用のサンプルトークデータ
 */
export const sampleTalkData: TalkNotificationData = {
  title: "Discord Notification Test",
  presenter: "testuser",
  topic: "Other",
  duration: 15,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  sessionId: 1,
  talkId: 999,
};

/**
 * Discord通知のテスト実行
 * 開発環境でのみ使用してください
 */
export async function testDiscordNotification(): Promise<void> {
  console.log("Discord通知テストを開始します...");
  console.log("テストデータ:", sampleTalkData);

  try {
    await sendDiscordNotification(sampleTalkData);
    console.log("Discord通知テストが正常に完了しました");
  } catch (error) {
    console.error("Discord通知テストでエラーが発生しました:", error);
  }
}

/**
 * 環境変数の設定状況を確認
 */
export function checkDiscordConfiguration(): void {
  console.log("🔧 Discord設定状況:");
  console.log(
    "- DISCORD_WEBHOOK_URL:",
    process.env.DISCORD_WEBHOOK_URL ? "設定済み" : "未設定"
  );
  console.log(
    "- NEXT_PUBLIC_BASE_URL:",
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  );

  if (!process.env.DISCORD_WEBHOOK_URL) {
    console.log(
      "Discord通知を有効にするには、DISCORD_WEBHOOK_URLを設定してください"
    );
    console.log("設定方法はREADME.mdを参照してください");
  }
}
