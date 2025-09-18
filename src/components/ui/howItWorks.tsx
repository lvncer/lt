import {
	CheckCircle,
	Clock,
	Presentation as PresentationChart,
	Calendar,
} from "lucide-react";

const steps = [
	{
		icon: <PresentationChart className="h-10 w-10 text-purple-600" />,
		title: "1. Submit",
		description:
			"簡単なフォームに、トークの詳細（タイトル、発表時間、トピックなど）を記入してください。",
	},
	{
		icon: <CheckCircle className="h-10 w-10 text-teal-600" />,
		title: "2. Get Approved",
		description:
			"私たちのチームがあなたの提出内容を確認します。ほとんどのトークは48時間以内に承認されます。",
	},
	{
		icon: <Calendar className="h-10 w-10 text-blue-600" />,
		title: "3. Schedule",
		description: "承認されると、発表できる今後のイベントについて通知されます。",
	},
	{
		icon: <Clock className="h-10 w-10 text-orange-500" />,
		title: "4. Present",
		description:
			"指定された時間枠でライトニングトークを発表し、観客との交流を楽しんでください。",
	},
];

export default function HowItWorks() {
	return (
		<section className="py-16 md:py-24">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold tracking-tight mb-4">
						How It Works
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						提出から発表まで、シンプルで分かりやすいプロセスで設計されています。
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{steps.map((step, index) => (
						<div
							key={index}
							className="relative flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
						>
							<div className="mb-4">{step.icon}</div>
							<h3 className="text-xl font-semibold mb-2">{step.title}</h3>
							<p className="text-sm text-muted-foreground">
								{step.description}
							</p>

							{index < steps.length - 1 && (
								<div className="hidden lg:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-10 h-[2px] bg-border">
									<div className="absolute right-0 -translate-y-1/2 rotate-45 w-3 h-[2px] bg-border"></div>
									<div className="absolute right-0 translate-y-1/2 -rotate-45 w-3 h-[2px] bg-border"></div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
