"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "What is a lightning talk?",
    answer:
      "A lightning talk is a short presentation, typically lasting between 5 to 20 minutes, focused on a single topic or idea. It's designed to be concise, informative, and engaging.",
  },
  {
    question: "Who can submit a lightning talk?",
    answer:
      "Anyone with knowledge or experience they'd like to share can submit a talk. We welcome speakers of all experience levels, from beginners to experts.",
  },
  {
    question: "How are talks selected?",
    answer:
      "Talks are reviewed by our committee based on relevance, originality, and potential value to the audience. We aim to provide a diverse range of topics and perspectives.",
  },
  {
    question: "What technical equipment is provided?",
    answer:
      "We provide a projector, screen, microphone, and basic adapters. Speakers should bring their own laptops and any special adapters they might need.",
  },
  {
    question: "Can I submit multiple talks?",
    answer:
      "Yes, you can submit multiple talks, but we generally select only one talk per speaker to give more people the opportunity to present.",
  },
  {
    question: "Is there a dress code for speakers?",
    answer:
      "There's no strict dress code, but we recommend business casual attire. Wear something comfortable that makes you feel confident.",
  },
  {
    question: "Will my talk be recorded?",
    answer:
      "Yes, with your permission, talks are recorded and shared on our platform for others to learn from. You can opt out of recording if you prefer.",
  },
  {
    question: "What happens if I go over time?",
    answer:
      "We strictly enforce time limits to keep the event running smoothly. You'll receive time warnings, and we may need to conclude your talk if it runs too long.",
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </Button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Frequently Asked Questions
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          Find answers to common questions about lightning talks, submission
          process, and presentation guidelines.
        </p>

        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-6 bg-purple-50 dark:bg-purple-950 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">
            Can not find the answer you are looking for? Please reach out to our
            support team.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
