import { db } from "@/lib/db";
import { users, talks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { clerkUserId, neonUserId, newFullName } = await req.json();

		if (!clerkUserId || !neonUserId || !newFullName) {
			return NextResponse.json({ error: "Invalid input" }, { status: 400 });
		}

		// usersテーブルのfullnameを更新
		await db
			.update(users)
			.set({ fullname: newFullName })
			.where(eq(users.clerkUserId, clerkUserId));

		// talksテーブルのfullnameを更新
		await db
			.update(talks)
			.set({ fullname: newFullName })
			.where(eq(talks.userId, neonUserId));

		return NextResponse.json({ message: "Full name updated successfully" });
	} catch (error) {
		console.error("POST /api/update-fullname error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
