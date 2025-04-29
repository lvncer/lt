"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg">
            By using LightningTalks, you agree to these terms. Please read them
            carefully.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using LightningTalks, you agree to be bound by these
            Terms of Service and all applicable laws and regulations.
          </p>

          <h2>2. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account.
          </p>

          <h2>3. Content Guidelines</h2>
          <ul>
            <li>You retain ownership of content you submit</li>
            <li>Content must not violate any laws or rights</li>
            <li>We may remove content that violates our guidelines</li>
            <li>You grant us license to use submitted content</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All content, features, and functionality are owned by LightningTalks
            and are protected by copyright and other intellectual property laws.
          </p>

          <h2>5. Privacy</h2>
          <p>
            Your use of LightningTalks is also governed by our Privacy Policy.
            Please review our Privacy Policy to understand our practices.
          </p>

          <h2>6. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Service
            immediately, without prior notice or liability, for any reason.
          </p>

          <h2>7. Limitations of Liability</h2>
          <p>
            LightningTalks shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will
            notify users of any material changes.
          </p>

          <h2>9. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at
            legal@lightningtalks.com.
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
