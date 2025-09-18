import { pgTable, unique, serial, text, varchar, timestamp, foreignKey, check, integer, date, boolean, time } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	clerkUserId: text("clerk_user_id"),
	username: varchar({ length: 50 }).notNull(),
	email: varchar({ length: 100 }).notNull(),
	imageUrl: text("image_url"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	fullname: text(),
}, (table) => [
	unique("users_clerk_user_id_key").on(table.clerkUserId),
]);

export const talks = pgTable("talks", {
	id: serial().primaryKey().notNull(),
	presenter: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 100 }),
	title: varchar({ length: 255 }).notNull(),
	duration: integer().notNull(),
	topic: varchar({ length: 100 }),
	description: text(),
	status: varchar({ length: 20 }).default('pending'),
	dateSubmitted: timestamp("date_submitted", { mode: 'string' }).notNull(),
	imageUrl: text("image_url"),
	presentationDate: date("presentation_date"),
	venue: varchar({ length: 255 }).default('指定なし'),
	userId: integer("user_id"),
	fullname: text(),
	hasPresentation: boolean("has_presentation").default(false),
	presentationUrl: text("presentation_url"),
	allowArchive: boolean("allow_archive").default(false),
	presentationStartTime: time("presentation_start_time"),
	archiveUrl: text("archive_url"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "talks_user_id_fkey"
		}),
	check("talks_status_check", sql`(status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[])`),
]);
