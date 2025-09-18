"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
	return (
		<div className="container mx-auto px-4 py-12">
			<Button variant="ghost" size="sm" asChild className="mb-8">
				<Link href="/" className="flex items-center gap-2">
					<ArrowLeft className="h-4 w-4" />
					Back to home
				</Link>
			</Button>

			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold tracking-tight mb-6">LT会について</h1>

				<div className="prose prose-slate dark:prose-invert max-w-none">
					<p className="text-lg">
						このLT会は、学生同士で自由に発表できる場として開催しています。
						短時間で知識を共有し、議論を活性化し、技術コミュニティとつながるためのプレゼンテーションの場です。
					</p>

					<h2>LT会の目的</h2>
					<p>
						このLT会は、学生同士で自由に発表できる場として開催します！
						技術・趣味・勉強の話、日常のことなど、テーマはなんでもOKです。
						うまく話せなくても全然大丈夫！発表すること自体が、きっと大きな経験になります。
					</p>

					<h2>こんな人にぴったり</h2>
					<ul>
						<li>人前で話す経験を積みたい</li>
						<li>自分の好きなことを話してみたい</li>
						<li>スライド作りの練習がしたい</li>
						<li>失敗してもOKな発表の場がほしい</li>
					</ul>

					<h2>発表テーマの例</h2>
					<ul>
						<li>Pythonで簡単なツールを作った話</li>
						<li>paizaを使ってみた感想</li>
						<li>情報処理技術者試験の勉強法</li>
						<li>自作PC組んでみた話</li>
						<li>最近気になっている技術やニュース</li>
						<li>おすすめのアニメ・ゲーム紹介（技術に絡めてもOK）</li>
					</ul>

					<h2>大切にしていること</h2>
					<ul>
						<li>
							<strong>尊重：</strong> 発表者・参加者を尊重すること
						</li>
						<li>
							<strong>応援：</strong> どんな発表でも、あたたかく見守る姿勢
						</li>
						<li>
							<strong>学び：</strong>{" "}
							失敗や緊張もOK！みんなで応援し合える空気を大事に
						</li>
						<li>
							<strong>成長：</strong> 発表を通じて個人の成長をサポート
						</li>
					</ul>

					<h2>参加してみませんか？</h2>
					<p>
						発表したい方も、聞くだけの方も大歓迎です。
						みんなで楽しいLT会を作っていきましょう！
					</p>

					<div className="bg-purple-50 dark:bg-purple-700 rounded-lg mt-8 p-6">
						<h3 className="text-xl text-white font-semibold mb-4">
							参加してみませんか？
						</h3>
						<p className="text-white/80 mb-4">
							今すぐコミュニティに参加して、他の学生と知識を共有しましょう。
						</p>
						<div className="flex gap-4">
							<Button asChild className="bg-white text-black">
								<Link href="/register">トークを提出</Link>
							</Button>
							<Button
								variant="outline"
								asChild
								className="border-white text-white hover:bg-white hover:text-black"
							>
								<Link href="/talks">トーク一覧を見る</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
