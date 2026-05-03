export default function PopularTopics() {
	return (
		<section className="py-16 md:py-24">
			<div className="container mx-auto px-4">
				<div className="text-center mb-20">
					<h2 className="text-3xl lg:text-5xl font-normal tracking-wide mb-8">
						Popular topics
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						私たちのコミュニティは、幅広い技術的なトピックをカバーしています。
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{[
						"React",
						"Next.js",
						"TypeScript",
						"JavaScript",
						"CSS",
						"Accessibility",
						"Performance",
						"State Management",
					].map((topic) => (
						<div
							key={topic}
							className="flex items-center justify-center p-4 rounded-lg border bg-card text-center hover:scale-110 transition-all duration-300"
						>
							<span>{topic}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
