"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
	{
		question: "ライトニングトークとは何ですか？",
		answer:
			"ライトニングトーク（LT）は短時間で行う発表会です。1人あたりの持ち時間は5〜10分程度で、サクッと話して、サクッと聞ける、気軽で楽しいプレゼンの場です。",
	},
	{
		question: "発表時間はどのくらいですか？",
		answer:
			"発表時間は5〜10分程度です。短時間なので要点を絞って話すことができ、聞く側も集中して聞くことができます。",
	},
	{
		question: "どんなテーマで発表できますか？",
		answer:
			"技術・趣味・勉強の話、日常のことなど、テーマは基本的に何でもOKです！Pythonで作ったツールの話、paizaの感想、情報処理技術者試験の勉強法、自作PC、おすすめのアニメ・ゲーム紹介など、自由に発表できます。（※公序良俗に反しない内容でお願いします）",
	},
	{
		question: "スライドは必要ですか？",
		answer:
			"スライドはあってもなくてもOKです！発表スタイルも自由で、真面目でもネタでも大丈夫です。うまく話せなくても全然問題ありません。",
	},
	{
		question: "どうやって発表に参加できますか？",
		answer:
			"発表者募集の際に、フォームや口頭でテーマと名前をお知らせください。発表者が2〜4人ほど集まったら、日時を決定してタイムスケジュールを作成します。",
	},
	{
		question: "初心者でも発表できますか？",
		answer:
			"もちろんです！このLT会は学生同士で自由に発表できる場として開催しています。人前で話す経験を積みたい、スライド作りの練習がしたい、失敗してもOKな発表の場がほしい、という方にぴったりです。",
	},
	{
		question: "発表で失敗したらどうしますか？",
		answer:
			"失敗や緊張もOK！みんなで応援し合える空気を大事にしています。発表すること自体が、きっと大きな経験になります。どんな発表でも、あたたかく見守る姿勢を心がけています。",
	},
	{
		question: "発表資料は公開されますか？",
		answer:
			"LT会終了後、発表者の許可がある場合のみ、スライドなどの資料をOneDriveや学内共有スペースにて公開予定です。閲覧は学内メンバー限定で、公開範囲や資料内容は各登壇者にお任せします。",
	},
];

export default function FAQPage() {
	return (
		<div className="container mx-auto px-4 py-12">
			<Button variant="ghost" size="sm" asChild className="mb-8">
				<Link href="/" className="flex items-center gap-2">
					<ArrowLeft className="h-4 w-4" />
					Back to home
				</Link>
			</Button>

			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold tracking-tight mb-6">よくある質問</h1>

				<p className="text-lg text-muted-foreground mb-8">
					ライトニングトークや発表に関するよくある質問にお答えします。
				</p>

				<Accordion type="single" collapsible className="w-full">
					{FAQ_ITEMS.map((item, index) => (
						<AccordionItem key={index} value={`item-${index}`}>
							<AccordionTrigger className="text-left">
								{item.question}
							</AccordionTrigger>
							<AccordionContent>{item.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>

				<div className="mt-12 p-6 bg-purple-50 dark:bg-purple-700 rounded-lg">
					<h2 className="text-xl text-white font-semibold mb-4">
						他にご質問はありますか？
					</h2>
					<p className="text-white/80 mb-4">
						お探しの答えが見つからない場合は、お気軽にお問い合わせください。
					</p>
					<Button asChild className="bg-white text-black">
						<Link href="/contact">お問い合わせ</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
