"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PRESENTATION_TIPS = [
	{
		title: "シンプルに保つ",
		description:
			"1つのスライドには1つの主要なアイデアに焦点を当てましょう。テキストが多すぎたり、複雑な図表で聴衆を混乱させないよう注意してください。",
		icon: "💡",
	},
	{
		title: "時間を意識して練習",
		description:
			"5〜10分の制限時間内に収まるよう、事前にリハーサルをしましょう。適度なペースで話し、質問の時間も考慮してください。",
		icon: "⏰",
	},
	{
		title: "ストーリーを語る",
		description:
			"明確な始まり、中間、終わりでトークを構成しましょう。個人的な経験や実例を共有することで、内容をより魅力的にできます。",
		icon: "📖",
	},
	{
		title: "視覚的な補助を活用",
		description:
			"関連する画像、図表、コードスニペットを含めて要点をサポートしましょう。視覚的要素は聴衆の注意を維持し、複雑な概念を明確にします。",
		icon: "🎨",
	},
	{
		title: "聴衆との関わりを大切に",
		description:
			"質問をしたり、参加を促したり、インタラクティブな要素を含めましょう。アイコンタクトやジェスチャーを使って聞き手とつながりましょう。",
		icon: "👥",
	},
	{
		title: "質問への準備",
		description:
			"予想される質問を考え、思慮深い答えを準備しましょう。『分からない』と言って後でフォローアップすることも全く問題ありません。",
		icon: "❓",
	},
	{
		title: "力強くスタート",
		description:
			"興味深いフック（驚くべき事実、質問、トピックに関連する短いストーリー）で始めて、すぐに注意を引きましょう。",
		icon: "🚀",
	},
	{
		title: "印象的に終わる",
		description:
			"明確な要点、行動への呼びかけ、考えさせる質問で締めくくりましょう。聴衆に記憶に残る何かを残してください。",
		icon: "🎯",
	},
];

export default function PresentationTipsPage() {
	return (
		<div className="container mx-auto px-4 py-12">
			<Button variant="ghost" size="sm" asChild className="mb-8">
				<Link href="/" className="flex items-center gap-2">
					<ArrowLeft className="h-4 w-4" />
					Back to home
				</Link>
			</Button>

			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold tracking-tight mb-6">
					プレゼンテーションのコツ
				</h1>

				<p className="text-lg text-muted-foreground mb-8">
					魅力的で効果的なライトニングトークを行うための重要なコツとベストプラクティスをご紹介します。
				</p>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
					{PRESENTATION_TIPS.map((tip, index) => (
						<div
							key={index}
							className="p-6 border rounded-lg bg-card text-card-foreground"
						>
							<div className="flex items-center gap-3 mb-3">
								<span className="text-2xl">{tip.icon}</span>
								<h3 className="text-lg font-semibold">{tip.title}</h3>
							</div>
							<p className="text-muted-foreground">{tip.description}</p>
						</div>
					))}
				</div>

				<div className="mt-12 p-6 bg-purple-50 dark:bg-purple-700 rounded-lg">
					<h2 className="text-xl text-white font-semibold mb-4">
						発表の準備はできましたか？
					</h2>
					<p className="text-white/80 mb-4">
						これらのコツを実践して、ライトニングトークの提案を提出してください。
						あなたの話を聞けることを楽しみにしています！
					</p>
					<Button asChild className="bg-white text-black">
						<Link href="/register">トークを提出する</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
