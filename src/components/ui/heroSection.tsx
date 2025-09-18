"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};

export default function HeroSection() {
	return (
		<div className="relative overflow-hidden">
			{/* Background decorative elements */}
			<motion.div
				className="absolute inset-0 -z-10"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				<motion.div
					className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-purple-300/20 to-blue-300/20 blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						rotate: [0, 90, 0],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
				<motion.div
					className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-300/20 to-blue-300/20 blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						rotate: [0, -90, 0],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
			</motion.div>

			<div className="container mx-auto px-4 py-32">
				<motion.div
					className="flex flex-col items-center text-center"
					variants={container}
					initial="hidden"
					animate="show"
				>
					<motion.h1
						variants={item}
						className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
					>
						Share Your Expertise in Lightning&nbsp;Talks
					</motion.h1>

					<motion.p
						variants={item}
						className="text-base sm:text-sm md:text-base text-muted-foreground max-w-xl sm:max-w-2xl md:max-w-3xl mb-8"
					>
						短時間で知識を共有し、議論を活性化し、技術コミュニティとつながるためのプレゼンテーション
					</motion.p>

					<motion.div
						variants={item}
						className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
					>
						<Button
							size="lg"
							variant="outline"
							className="rounded-full bg-white/20 backdrop-blur-md border-black/80 text-black/80 hover:bg-white/30"
						>
							<Link href="/talks">トーク一覧</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-700 hover:to-blue-700 text-white rounded-full group"
						>
							<Link href="/register" className="flex items-center gap-2">
								提出する
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
					</motion.div>

					{/* Hero image */}
					<motion.div
						variants={item}
						className="mt-18 w-full flex justify-center"
					>
						<Image
							src="/images/AFE2FB09-6D98-4F76-AF74-13F163A30191_1_201_a.jpeg"
							alt="Hero"
							width={800}
							height={450}
							className="rounded-3xl object-cover"
							priority
						/>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
