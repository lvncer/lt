"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PresentationTipsPage() {
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
          Presentation Tips
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Before the Presentation</h2>
          <ul>
            <li>Practice your talk multiple times</li>
            <li>Record yourself and watch the playback</li>
            <li>Time your presentation</li>
            <li>Prepare backup slides or materials</li>
          </ul>

          <h2>During the Presentation</h2>
          <ul>
            <li>Speak clearly and at a moderate pace</li>
            <li>Make eye contact with the audience</li>
            <li>Use gestures naturally</li>
            <li>Stay within your time limit</li>
          </ul>

          <h2>Handling Nerves</h2>
          <ul>
            <li>Take deep breaths before starting</li>
            <li>Remember that the audience wants you to succeed</li>
            <li>Focus on your message, not your nervousness</li>
            <li>Use positive self-talk</li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
              <h3 className="text-green-800 dark:text-green-200 mb-3">Dos</h3>
              <ul className="text-green-700 dark:text-green-300 space-y-2">
                <li>Start with a strong opening</li>
                <li>Use pauses effectively</li>
                <li>Engage with your audience</li>
                <li>Show enthusiasm</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg">
              <h3 className="text-red-800 dark:text-red-200 mb-3">Donts</h3>
              <ul className="text-red-700 dark:text-red-300 space-y-2">
                <li>Read directly from slides</li>
                <li>Speak too quickly</li>
                <li>Use complex jargon</li>
                <li>Go over time</li>
              </ul>
            </div>
          </div>

          <h2 className="mt-8">Visual Aids</h2>
          <ul>
            <li>Keep slides simple and clean</li>
            <li>Use high-quality images</li>
            <li>Include relevant code examples</li>
            <li>Test all demos beforehand</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
