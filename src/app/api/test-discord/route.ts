/**
 * Discord通知機能のテスト用APIエンドポイント
 * 開発環境でのみ使用してください
 */

import { NextResponse } from "next/server";
import {
	testDiscordNotification,
	checkDiscordConfiguration,
} from "@/lib/test-discord";

export async function POST() {
	// 本番環境では無効化
	if (process.env.NODE_ENV === "production") {
		return NextResponse.json(
			{ error: "This endpoint is only available in development" },
			{ status: 403 },
		);
	}

	try {
		console.log("🚀 Discord通知テストAPIが呼び出されました");

		// 設定状況を確認
		checkDiscordConfiguration();

		// テスト通知を送信
		await testDiscordNotification();

		return NextResponse.json(
			{
				message: "Discord notification test completed successfully",
				timestamp: new Date().toISOString(),
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Discord notification test failed:", error);
		return NextResponse.json(
			{
				error: "Discord notification test failed",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}

export async function GET() {
	// 本番環境では無効化
	if (process.env.NODE_ENV === "production") {
		return NextResponse.json(
			{ error: "This endpoint is only available in development" },
			{ status: 403 },
		);
	}

	// 設定状況のみ確認
	const hasWebhookUrl = !!process.env.DISCORD_WEBHOOK_URL;
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

	return NextResponse.json({
		message: "Discord notification test endpoint",
		configuration: {
			webhookConfigured: hasWebhookUrl,
			baseUrl: baseUrl,
			environment: process.env.NODE_ENV || "development",
		},
		usage: {
			test: "POST /api/test-discord - Send a test notification",
			check: "GET /api/test-discord - Check configuration",
		},
	});
}
