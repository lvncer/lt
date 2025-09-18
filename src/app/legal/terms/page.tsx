"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
	return (
		<div className="container mx-auto px-4 py-12">
			<Button variant="ghost" size="sm" asChild className="mb-8">
				<Link href="/" className="flex items-center gap-2">
					<ArrowLeft className="h-4 w-4" />
					Back to home
				</Link>
			</Button>

			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold tracking-tight mb-6">利用規約</h1>

				<p className="text-lg text-muted-foreground mb-8">
					最終更新日: {new Date().toLocaleDateString("ja-JP")}
				</p>

				<div className="prose prose-slate dark:prose-invert max-w-none">
					<h2>LT会参加規約</h2>
					<p>
						このLT会に参加することで、以下の規約に同意したものとみなします。
						安全で楽しいイベントにするため、ご協力をお願いいたします。
					</p>

					<h2>参加条件</h2>
					<p>
						このLT会は学生同士で自由に発表できる場として開催しています。
						以下の条件を満たす方にご参加いただけます：
					</p>
					<ul>
						<li>学内メンバーであること</li>
						<li>行動規範を理解し、遵守すること</li>
						<li>他の参加者を尊重する姿勢を持つこと</li>
					</ul>

					<h2>発表内容について</h2>
					<p>
						発表者は提出する内容について責任を持ちます。発表内容は以下の条件を満たす必要があります：
					</p>
					<ul>
						<li>公序良俗に反しない内容であること</li>
						<li>他者を傷つけたり、差別的でないこと</li>
						<li>著作権を侵害しないこと</li>
						<li>事実に基づいた内容であること（個人の感想・体験談は除く）</li>
					</ul>

					<h2>禁止事項</h2>
					<p>以下の行為は禁止します：</p>
					<ul>
						<li>他の参加者への嫌がらせや攻撃的な言動</li>
						<li>差別的・侮辱的な発言や行為</li>
						<li>営利目的での参加や宣伝行為</li>
						<li>イベントの妨害行為</li>
						<li>個人情報の無断使用や拡散</li>
					</ul>

					<h2>発表資料の取り扱い</h2>
					<p>発表資料の公開は発表者の任意です。公開に同意いただいた場合：</p>
					<ul>
						<li>学内メンバー限定での共有となります</li>
						<li>OneDriveや学内共有スペースを利用予定です</li>
						<li>公開範囲や内容は各発表者にお任せします</li>
					</ul>

					<h2>免責事項</h2>
					<p>
						LT会運営者は、参加者の発表内容や参加者間のトラブルについて
						責任を負いません。参加者各自の責任でご参加ください。
					</p>

					<h2>規約の変更</h2>
					<p>
						この規約は必要に応じて変更される場合があります。
						変更があった場合は、事前にお知らせいたします。
					</p>

					<h2>お問い合わせ</h2>
					<p>
						この利用規約についてご質問がございましたら、
						LT会運営者までお気軽にお問い合わせください。
					</p>
				</div>
			</div>
		</div>
	);
}
