"use client";

import TalkForm from "@/components/talks/TalkForm";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useGetFullname } from "@/hooks/useGetFullname";

// SIWメールアドレスのチェック関数
const isSIWEmail = (email: string) => {
	return email.startsWith("siw") && email.endsWith("@class.siw.ac.jp");
};

export default function RegisterPage() {
	const { user, isLoaded } = useUser();
	const router = useRouter();
	const { fullname, isLoading: isLoadingFullname } = useGetFullname(
		user?.id || "",
	);

	useEffect(() => {
		if (!isLoaded || !user) return;

		// ユーザーがSIWメールアドレスを持っているかチェック
		const hasSIWEmail = user?.emailAddresses?.some((email) =>
			isSIWEmail(email.emailAddress),
		);

		if (hasSIWEmail && !isLoadingFullname) {
			// SIWユーザーで、fullnameが未設定の場合は名前認証ページへ
			if (!fullname) {
				router.push("/verify/name");
				return;
			}
		}
	}, [isLoaded, user, router, fullname, isLoadingFullname]);

	// 認証状態の確認
	if (!isLoaded) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<Button variant="ghost" disabled>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Loading...
				</Button>
			</div>
		);
	}

	// 未認証状態の表示
	if (!user) {
		return (
			<div className="container mx-auto px-4 py-12">
				<div className="max-w-3xl mx-auto text-center">
					<h1 className="text-3xl font-bold tracking-tight mb-4">
						認証が必要です
					</h1>
					<p className="text-muted-foreground mb-6">
						トークを投稿するにはサインインが必要です。
					</p>
					<Button onClick={() => router.push("/")}>ホームページへ戻る</Button>
				</div>
			</div>
		);
	}

	// フルネーム取得中の表示
	if (isLoadingFullname) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<Button variant="ghost" disabled>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Loading...
				</Button>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="max-w-3xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold tracking-tight mb-4">
						Submit a Lightning Talk
					</h1>
					<p className="text-muted-foreground">
						簡潔でインパクトのあるライトニングトークを通じて、コミュニティと知識を共有しましょう。以下のフォームに記入して、トークを提出してください。
					</p>
				</div>

				<div className="bg-card border rounded-lg p-6 md:p-8">
					<TalkForm />
				</div>
			</div>
		</div>
	);
}
