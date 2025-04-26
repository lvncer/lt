"use client";

import TalkCard from "@/components/talks/TalkCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Talk } from "@/types/talk";
import { useTalks } from "@/hooks/useTalks";

export default function FeaturedTalks() {
  const { talks } = useTalks();
  // Filter only approved talks
  const approvedTalks = talks.filter(
    (talk: Talk) => talk.status === "approved"
  );

  // Get 3 most recent approved talks
  const featuredTalks = approvedTalks
    .sort(
      (a: Talk, b: Talk) =>
        new Date(b.date_submitted).getTime() -
        new Date(a.date_submitted).getTime()
    )
    .slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-accent/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Featured Talks
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              コミュニティのスピーカーたちによる人気のライトニングトークを発見しよう！
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild className="mt-4 md:mt-0">
            <Link href="/talks" className="flex items-center gap-1">
              View all talks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTalks.map((talk: Talk) => (
            <TalkCard key={talk.id} talk={talk} />
          ))}
        </div>

        {featuredTalks.length === 0 && (
          <div className="text-center py-12 bg-background rounded-lg border border-border">
            <h3 className="text-lg font-medium">No featured talks yet</h3>
            <p className="text-muted-foreground mt-2 mb-6">
              今なら素晴らしいライトニングトークを提出できる最初の一人です！
            </p>
            <Button asChild>
              <Link href="/register">Submit a Talk</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
