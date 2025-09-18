import { db } from "@/lib/db";
import { users, talks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// DELETE: ユーザーアカウントを削除（関連するトークも全て削除）
export async function DELETE() {
	try {
		const { userId: clerkUserId } = await auth();

		if (!clerkUserId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// ClerkのユーザーIDからNeonのユーザーIDを取得
		const userResult = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.clerkUserId, clerkUserId));

		if (userResult.length === 0) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const neonUserId = userResult[0].id;

		// トランザクション開始（すべての操作が成功するか、すべて失敗するか）
		try {
			// 1. まず、ユーザーのすべてのトークを削除
			await db.delete(talks).where(eq(talks.userId, neonUserId));

			// 2. ユーザーレコードを削除
			await db.delete(users).where(eq(users.id, neonUserId));

			return NextResponse.json(
				{
					message: "User account and all associated talks deleted successfully",
					deletedUserId: neonUserId,
				},
				{ status: 200 },
			);
		} catch (dbError) {
			console.error("Database transaction error:", dbError);
			return NextResponse.json(
				{ error: "Failed to delete user account" },
				{ status: 500 },
			);
		}
	} catch (error) {
		console.error("DELETE /api/user-delete error:", error);
		return NextResponse.json(
			{ error: "Failed to delete user account" },
			{ status: 500 },
		);
	}
}
