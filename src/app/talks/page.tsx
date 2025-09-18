import TalkList from "@/components/talks/TalkList";

export default function TalksPage() {
	return (
		<div className="container mx-auto px-4 py-18">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight mb-4">
					Lightning Talks
				</h1>
				<p className="text-muted-foreground max-w-3xl">
					すべての提出されたライトニングトークを閲覧できます。トピックでフィルタリングしたり、特定の内容を検索したりして、並べ替えすることが可能です。
				</p>
			</div>

			<TalkList />
		</div>
	);
}
