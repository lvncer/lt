"use client";

import { useState } from "react";
import TalkCard from "./TalkCard";
import { TALK_TOPICS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { useTalks } from "@/hooks/useTalks";
import { Talk } from "@/types/talk";

export default function TalkList() {
  const { talks } = useTalks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "duration">(
    "newest"
  );
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter talks based on search query and selected topics
  const filteredTalks = talks.filter((talk: Talk) => {
    const matchesSearch =
      talk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talk.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talk.presenter.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTopics =
      selectedTopics.length === 0 || selectedTopics.includes(talk.topic);

    return matchesSearch && matchesTopics;
  });

  // Sort filtered talks
  const sortedTalks = [...filteredTalks].sort((a, b) => {
    if (sortBy === "newest") {
      return (
        new Date(b.dateSubmitted).getTime() -
        new Date(a.dateSubmitted).getTime()
      );
    } else if (sortBy === "oldest") {
      return (
        new Date(a.dateSubmitted).getTime() -
        new Date(b.dateSubmitted).getTime()
      );
    } else {
      return a.duration - b.duration;
    }
  });

  // Toggle topic selection
  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
      >
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search talks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden md:inline">Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="backdrop-blur-md" align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={sortBy === "newest"}
                onCheckedChange={() => setSortBy("newest")}
              >
                Newest first
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "oldest"}
                onCheckedChange={() => setSortBy("oldest")}
              >
                Oldest first
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "duration"}
                onCheckedChange={() => setSortBy("duration")}
              >
                Duration (shortest first)
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 md:hidden"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-1"
              >
                <Filter className="h-4 w-4" />
                <span>Filter Topics</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 backdrop-blur-md">
              <DropdownMenuLabel>Filter by topic</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {TALK_TOPICS.map((topic) => (
                <DropdownMenuCheckboxItem
                  key={topic}
                  checked={selectedTopics.includes(topic)}
                  onCheckedChange={() => toggleTopic(topic)}
                >
                  {topic}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Mobile Filters */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden mb-6"
          >
            <div className="p-4 bg-accent rounded-lg">
              <h3 className="font-medium mb-2">Filter by Topic</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {TALK_TOPICS.map((topic) => (
                  <Button
                    key={topic}
                    variant={
                      selectedTopics.includes(topic) ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => toggleTopic(topic)}
                    className={
                      selectedTopics.includes(topic) ? "bg-primary" : ""
                    }
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-center mb-6"
      >
        <p className="text-sm text-muted-foreground">
          Showing {sortedTalks.length} of {talks.length} talks
        </p>
        {selectedTopics.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedTopics([])}
            className="text-sm"
          >
            Clear filters
          </Button>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {sortedTalks.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortedTalks.map((talk, index) => (
              <TalkCard key={talk.id} talk={talk} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <h3 className="text-lg font-medium">No talks found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
