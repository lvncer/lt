import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
	return (
		<div className="relative overflow-hidden">
			<div className="container mx-auto px-4 py-32">
				<div className="flex flex-col items-center text-center">
					<div className="mb-18">
						<h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-normal tracking-wider mb-4 bg-clip-text text-black/80">
							The frontier is not out there.
						</h1>
						<h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-normal tracking-wide bg-clip-text text-black/80">
							It&apos;s in how we think.
						</h1>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
						<Button
							size="lg"
							variant="outline"
							className="rounded-full bg-white/20 backdrop-blur-md border-black/80 text-black/80 hover:bg-white/30"
						>
							<Link href="/talks">トーク一覧をみる</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-700 hover:to-blue-700 text-white rounded-full group"
						>
							<Link href="/register" className="flex items-center gap-2">
								トークを応募する
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
					</div>

					{/* Hero image */}
					<div className="mt-18 w-full flex justify-center">
						<Image
							src="/images/top-lt-image.jpeg"
							alt="Hero"
							width={1200}
							height={700}
							className="rounded-3xl object-cover"
							priority
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
