import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
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
  presentationDate: text("presentation_date"),
  venue: text("venue"),
  userId: integer("user_id").references(() => users.id),
  fullname: text("fullname"),
  // 既存の新機能カラム
  hasPresentationUrl: boolean("has_presentation").default(false),
  presentationUrl: text("presentation_url"),
  allowArchive: boolean("allow_archive").default(false),
  archiveUrl: text("archive_url"),
  presentationStartTime: text("presentation_start_time"), // 必須フィールド
});

// リレーション定義
export const usersRelations = relations(users, ({ many }) => ({
  talks: many(talks),
}));

export const talksRelations = relations(talks, ({ one }) => ({
  user: one(users, {
    fields: [talks.userId],
    references: [users.id],
  }),
}));

// 型定義をエクスポート
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Talk = typeof talks.$inferSelect;
export type NewTalk = typeof talks.$inferInsert;
