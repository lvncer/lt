"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CookiePolicyPage() {
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
          Cookie Policy
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg">
            This Cookie Policy explains how LightningTalks uses cookies and
            similar technologies to recognize you when you visit our website.
          </p>

          <h2>What are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or
            mobile device when you visit a website. They are widely used to make
            websites work more efficiently and provide reporting information.
          </p>

          <h2>Types of Cookies We Use</h2>

          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly.
            They enable core functionality such as security, network management,
            and accessibility.
          </p>

          <h3>Analytics Cookies</h3>
          <p>
            We use analytics cookies to understand how visitors interact with
            our website, helping us improve our services and user experience.
          </p>

          <h3>Functionality Cookies</h3>
          <p>
            These cookies enable enhanced functionality and personalization,
            such as remembering your preferences and settings.
          </p>

          <h3>Marketing Cookies</h3>
          <p>
            Marketing cookies are used to track visitors across websites to
            display relevant advertisements and measure their effectiveness.
          </p>

          <h2>Cookie Management</h2>
          <p>
            Most web browsers allow you to control cookies through their
            settings. You can:
          </p>
          <ul>
            <li>View cookies stored on your computer</li>
            <li>Delete individual cookies</li>
            <li>Block cookies from particular sites</li>
            <li>Block all cookies from being set</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>

          <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg my-8">
            <h3 className="text-yellow-800 dark:text-yellow-200 mb-2">
              Please Note
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Blocking all cookies will have a negative impact on the usability
              of many websites. If you block cookies, you may not be able to use
              all the features on our website.
            </p>
          </div>

          <h2>Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect
            changes in technology, legislation, or our data practices. Any
            changes will become effective when we post the revised policy.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact
            us at privacy@lightningtalks.com.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg mt-8">
            <h3 className="text-blue-800 dark:text-blue-200">Last Updated</h3>
            <p className="text-blue-700 dark:text-blue-300">March 15, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
