import {
	Hero,
	LastTalks,
	HowItWorks,
	PopularTopics,
	CTA,
} from "@/components/home";
import { SAMPLE_TALKS } from "@/lib/data";

export default function Home() {
	return (
		<>
			<Hero />
			<PopularTopics />
			<LastTalks lastTalks={SAMPLE_TALKS} />
			<HowItWorks />
			<CTA />
		</>
	);
}
