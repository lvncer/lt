import { SAMPLE_TALKS } from "@/lib/data";
import TalkList from "@/components/talks/TalkList";

export default function TalksPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Lightning Talks</h1>
        <p className="text-muted-foreground max-w-3xl">
          Browse through all submitted lightning talks. Filter by topic, search for specific content, or sort by various criteria.
        </p>
      </div>
      
      <TalkList talks={SAMPLE_TALKS} />
    </div>
  );
}