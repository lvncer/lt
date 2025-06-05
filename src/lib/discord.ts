/**
 * Discord通知機能
 * 新しいトーク投稿時にDiscord Webhookを使用して通知を送信
 */

export interface TalkNotificationData {
  title: string;
  presenter: string;
  topic: string;
  duration: number;
  description?: string;
  venue?: string;
  presentationDate?: string;
  talkId: number;
}

/**
 * Discord Webhookに送信するメッセージを生成
 */
function createDiscordMessage(talk: TalkNotificationData): object {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const talkUrl = `${baseUrl}/talk/${talk.talkId}`;

  // 発表日のフォーマット
  const presentationDate = talk.presentationDate
    ? new Date(talk.presentationDate).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "未定";

  return {
    embeds: [
      {
        title: "🎤 新しいライトニングトークが投稿されました！",
        description: `**${talk.title}**`,
        color: 0x00ff00, // 緑色
        fields: [
          {
            name: "発表者",
            value: talk.presenter,
            inline: true,
          },
          {
            name: "トピック",
            value: talk.topic,
            inline: true,
          },
          {
            name: "発表時間",
            value: `${talk.duration}分`,
            inline: true,
          },
          {
            name: "発表予定日",
            value: presentationDate,
            inline: true,
          },
          {
            name: "会場",
            value: talk.venue || "未定",
            inline: true,
          },
          {
            name: "説明",
            value: talk.description
              ? talk.description.length > 200
                ? talk.description.substring(0, 200) + "..."
                : talk.description
              : "説明なし",
            inline: false,
          },
          {
            name: "詳細を見る",
            value: `[トークページを開く](${talkUrl})`,
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Lightning Talk Platform",
        },
      },
    ],
  };
}

/**
 * Discord Webhookに通知を送信
 */
export async function sendDiscordNotification(
  talk: TalkNotificationData
): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Discord Webhook URL not configured. Skipping notification.");
    return;
  }

  try {
    const message = createDiscordMessage(talk);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(
        `Discord API error: ${response.status} ${response.statusText}`
      );
    }

    console.log("Discord notification sent successfully for talk:", talk.title);
  } catch (error) {
    // エラーログを出力するが、メイン処理は継続
    console.error("Failed to send Discord notification:", error);
    console.error("Talk data:", talk);
  }
}

/**
 * 非同期でDiscord通知を送信（メイン処理をブロックしない）
 */
export function sendDiscordNotificationAsync(talk: TalkNotificationData): void {
  // 非同期で実行し、エラーが発生してもメイン処理に影響しない
  setImmediate(async () => {
    try {
      await sendDiscordNotification(talk);
    } catch (error) {
      console.error("Async Discord notification failed:", error);
    }
  });
}
