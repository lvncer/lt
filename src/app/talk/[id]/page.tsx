"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Mail,
  ExternalLink,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTalk } from "@/hooks/useTalk";
import * as React from "react";
import { notFound, useParams } from "next/navigation";

export default function TalkPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { talk, isLoading } = useTalk(id);

  if (isLoading) return <div>Loading...</div>;
  if (!talk || !talk.id) {
    notFound();
  }

  const date = new Date(talk.date_submitted);
  const formattedDate = date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/talks" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to all talks
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge
              variant="outline"
              className={cn("text-sm", statusColors[talk.status])}
            >
              {talk.status?.charAt(0).toUpperCase() + talk.status.slice(1)}
            </Badge>
            <Badge variant="secondary">{talk.topic}</Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 text-sm"
            >
              <Clock className="h-3.5 w-3.5" />
              {talk.duration} minutes
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {talk.title}
          </h1>

          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Submitted on {formattedDate}</span>
          </div>

          {talk.image_url && (
            <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
              <Image
                src={talk.image_url}
                alt={talk.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          <div className="prose prose-slate dark:prose-invert max-w-none wrap-break-word text-wrap">
            <h2 className="text-lg">説明</h2>
            <p className="p-1 mt-1 text-md md:text-lg">{talk.description}</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">
              Presenter Information
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-lg font-medium">
                {talk.presenter.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{talk.presenter}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Mail className="h-3.5 w-3.5" />
                  {talk.email}
                </div>
              </div>
            </div>

            {talk.status === "approved" && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">
                  Upcoming Presentations
                </h3>
                <div className="rounded-md bg-accent p-3">
                  <div className="font-medium">Tech Conference 2025</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    June 15, 2025 - 2:30 PM
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Room 42B
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-3 flex items-center gap-2"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Event Details
                  </Button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {talk.status === "approved" && (
                <Button className="w-full">Register to Attend</Button>
              )}

              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share This Talk
              </Button>

              {talk.status === "approved" && (
                <div className="text-xs text-center text-muted-foreground mt-2">
                  Limited seats available. Register early to secure your spot.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
