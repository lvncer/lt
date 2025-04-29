"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your personal information.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <ul>
            <li>Name and email address</li>
            <li>Profile information</li>
            <li>Content you submit</li>
            <li>Communication preferences</li>
          </ul>

          <h3>Usage Information</h3>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited</li>
            <li>Time and date of visits</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>Provide and improve our services</li>
            <li>Communicate with you</li>
            <li>Process your submissions</li>
            <li>Analyze usage patterns</li>
            <li>Prevent fraud and abuse</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul>
            <li>Service providers</li>
            <li>Legal authorities when required</li>
            <li>Business partners with your consent</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access or
            disclosure.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Withdraw consent</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar technologies to improve your experience
            and analyze usage patterns. You can control cookie settings in your
            browser.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting the new policy on this page.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at privacy@lightningtalks.com.
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
