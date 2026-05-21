"use client";

import TalkCard from "@/components/talks/TalkCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Talk } from "@/types/talk";

interface LastTalksProps {
	lastTalks: Talk[];
}

export default function LastTalks({ lastTalks }: LastTalksProps) {
	return (
		<section className="py-16 md:py-24 bg-accent/50">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-18">
					<h2 className="text-3xl lg:text-5xl font-normal tracking-wider mb-2">
						Latest talks
					</h2>
					<Button variant="ghost" size="sm" asChild className="mt-4 md:mt-2">
						<Link href="/talks" className="flex items-center gap-1">
							View all talks
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{lastTalks.map((talk: Talk) => (
						<TalkCard key={talk.id} talk={talk} variant="featured" />
					))}
				</div>
			</div>
		</section>
	);
}
