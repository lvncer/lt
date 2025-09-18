import { db } from "../lib/db";
import { ltSessions } from "../lib/db/schema";

async function createTestSessions() {
	try {
		console.log("テストセッションを作成しています...");

		// テスト用のセッションデータ
		const testSessions = [
			{
				sessionNumber: 1,
				date: "2024-01-15",
				title: "第1回 ライトニングトーク",
				venue: "オンライン会議室A",
				startTime: "16:30",
				endTime: "18:00",
				archiveUrl: null,
			},
			{
				sessionNumber: 2,
				date: "2024-02-15",
				title: "第2回 ライトニングトーク",
				venue: "オンライン会議室B",
				startTime: "16:30",
				endTime: "18:00",
				archiveUrl: null,
			},
			{
				sessionNumber: 3,
				date: "2024-03-15",
				title: "第3回 ライトニングトーク",
				venue: "オンライン会議室A",
				startTime: "16:30",
				endTime: "18:00",
				archiveUrl: "https://example.com/archive/session3",
			},
		];

		for (const session of testSessions) {
			await db.insert(ltSessions).values(session);
			console.log(`セッション${session.sessionNumber}を作成しました`);
		}

		console.log("テストセッションの作成が完了しました！");
	} catch (error) {
		console.error("テストセッションの作成でエラーが発生しました:", error);
	} finally {
		process.exit(0);
	}
}

createTestSessions();
