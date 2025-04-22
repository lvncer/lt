"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import { Talk } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TalkCardProps {
  talk: Talk;
  variant?: "default" | "featured";
  index?: number;
}

export default function TalkCard({
  talk,
  variant = "default",
  index = 0,
}: TalkCardProps) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  const date = new Date(talk.dateSubmitted);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/talks/${talk.id}`}>
        <div
          className={cn(
            "relative group overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-md",
            variant === "featured" ? "h-full" : "h-full"
          )}
        >
          {talk.imageUrl && (
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={talk.imageUrl}
                alt={talk.title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
            </div>
          )}

          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <Badge
                variant="outline"
                className={cn("text-xs px-2 py-0.5", statusColors[talk.status])}
              >
                {talk.status.charAt(0).toUpperCase() + talk.status.slice(1)}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {talk.topic}
              </Badge>
            </div>

            <h3
              className={cn(
                "font-semibold mb-2 transition-colors",
                variant === "featured" ? "text-xl md:text-2xl" : "text-lg",
                "group-hover:text-purple-600"
              )}
            >
              {talk.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {talk.description}
            </p>

            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <Clock className="w-4 h-4 mr-1" />
              <span>{talk.duration} min</span>
              <div className="mx-2 w-1 h-1 rounded-full bg-muted-foreground/30"></div>
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-sm font-medium">{talk.presenter}</div>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-600 transition-colors" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
