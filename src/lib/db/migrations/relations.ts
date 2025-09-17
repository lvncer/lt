import { relations } from "drizzle-orm/relations";
import { users, talks } from "./schema";

export const talksRelations = relations(talks, ({one}) => ({
	user: one(users, {
		fields: [talks.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	talks: many(talks),
}));