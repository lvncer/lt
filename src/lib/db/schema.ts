import {
	pgTable,
	serial,
	text,
	integer,
	timestamp,
	boolean,
	unique,
	index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// users テーブル
export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	clerkUserId: text("clerk_user_id").notNull().unique(),
	username: text("username"),
	email: text("email"),
	fullname: text("fullname"),
	imageUrl: text("image_url"),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

// lt_sessions テーブル
export const ltSessions = pgTable(
	"lt_sessions",
	{
		id: serial("id").primaryKey(),
		sessionNumber: integer("session_number"),
		date: text("date").notNull(),
		title: text("title"),
		venue: text("venue").notNull(),
		startTime: text("start_time").notNull().default("16:30"),
		endTime: text("end_time").notNull().default("18:00"),
		isSpecial: boolean("is_special").notNull().default(false),
		archiveUrl: text("archive_url"), // アーカイブURL追加
		createdAt: timestamp("created_at").defaultNow(),
		updatedAt: timestamp("updated_at").defaultNow(),
	},
	(table) => ({
		sessionNumberUnique: unique().on(table.sessionNumber),
		dateIndex: index("lt_sessions_date_idx").on(table.date),
	}),
);

// talks テーブル
export const talks = pgTable("talks", {
	id: serial("id").primaryKey(),
	presenter: text("presenter").notNull(),
	email: text("email"),
	title: text("title").notNull(),
	duration: integer("duration").notNull(),
	topic: text("topic").notNull(),
	description: text("description"),
	status: text("status").default("pending"),
	dateSubmitted: timestamp("date_submitted").defaultNow(),
	imageUrl: text("image_url"),
	sessionId: integer("session_id").references(() => ltSessions.id, {
		onDelete: "set null",
	}),
	userId: integer("user_id").references(() => users.id),
	fullname: text("fullname"),
	// 発表機能カラム
	hasPresentationUrl: boolean("has_presentation").default(false),
	presentationUrl: text("presentation_url"),
	presentationStartTime: text("presentation_start_time"), // 必須フィールド
});

// リレーション定義
export const usersRelations = relations(users, ({ many }) => ({
	talks: many(talks),
}));

export const ltSessionsRelations = relations(ltSessions, ({ many }) => ({
	talks: many(talks),
}));

export const talksRelations = relations(talks, ({ one }) => ({
	user: one(users, {
		fields: [talks.userId],
		references: [users.id],
	}),
	session: one(ltSessions, {
		fields: [talks.sessionId],
		references: [ltSessions.id],
	}),
}));

// 型定義をエクスポート
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type LtSession = typeof ltSessions.$inferSelect;
export type NewLtSession = typeof ltSessions.$inferInsert;
export type Talk = typeof talks.$inferSelect;
export type NewTalk = typeof talks.$inferInsert;
