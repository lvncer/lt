// Drizzle 生成型をインポート
import type {
	Talk as BaseTalk,
	NewTalk,
	User,
	NewUser,
	LtSession,
	NewLtSession,
} from "@/lib/db/schema";

// JOINクエリで取得される拡張Talk型（セッション情報を含む）
export type Talk = BaseTalk & {
	sessionDate?: string | null;
	sessionVenue?: string | null;
	sessionNumber?: number | null;
	sessionTitle?: string | null;
	sessionStartTime?: string | null;
	sessionEndTime?: string | null;
	sessionArchiveUrl?: string | null;
};

// 型を再エクスポート
export type { NewTalk, User, NewUser, LtSession, NewLtSession };

// API レスポンス型
export interface TalkResponse {
	talks: Talk[];
	total?: number;
}

export interface UserResponse {
	user: User;
}

// 既存のstatus型を維持
export type TalkStatus = "pending" | "approved" | "rejected";
