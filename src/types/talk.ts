// Drizzle 生成型をインポート
import type { Talk, NewTalk, User, NewUser, LtSession, NewLtSession } from "@/lib/db/schema";

// 型を再エクスポート
export type { Talk, NewTalk, User, NewUser, LtSession, NewLtSession };

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
