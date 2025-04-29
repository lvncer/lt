"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TalkGuidelinesPage() {
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
          Talk Guidelines
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Preparing Your Lightning Talk</h2>
          <p>
            Lightning talks are short presentations that pack a punch. Here are
            our guidelines to help you create an effective and engaging
            lightning talk.
          </p>

          <h3>Time Management</h3>
          <ul>
            <li>Keep your talk within the chosen time limit (5-20 minutes)</li>
            <li>Practice your timing multiple times</li>
            <li>Leave 1-2 minutes for quick questions if possible</li>
          </ul>

          <h3>Content Structure</h3>
          <ul>
            <li>Start with a clear problem statement or hook</li>
            <li>Focus on one main idea or concept</li>
            <li>Use practical examples when possible</li>
            <li>End with clear takeaways or call-to-action</li>
          </ul>

          <h3>Slide Design</h3>
          <ul>
            <li>Use large, readable fonts</li>
            <li>Keep text minimal - use keywords rather than sentences</li>
            <li>Include relevant visuals, diagrams, or code snippets</li>
            <li>Ensure high contrast between text and background</li>
          </ul>

          <h2>Technical Requirements</h2>
          <ul>
            <li>Slides in PDF or PowerPoint format</li>
            <li>Code demos should be prepared and tested beforehand</li>
            <li>Backup your presentation materials</li>
          </ul>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg mt-8">
            <h3 className="text-blue-800 dark:text-blue-200 mb-3">Pro Tips</h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2">
              <li>Tell a story - it makes your talk more memorable</li>
              <li>Use analogies to explain complex concepts</li>
              <li>Include a brief bio and contact information</li>
              <li>Share resources for further learning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
