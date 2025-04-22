"use client";

import TalkForm from "@/components/talks/TalkForm";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // サインインしてなかったらログインページへリダイレクト
  useEffect(() => {
    if (isSignedIn === false) {
      alert("Please sign in to submit a talk.");
      router.push("/");
    }
  }, [isSignedIn, router]);

  // リダイレクト中には何も表示しない
  if (isSignedIn === false) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Submit a Lightning Talk
          </h1>
          <p className="text-muted-foreground">
            Share your knowledge with the community through a concise and
            impactful lightning talk. Fill out the form below to submit your
            talk for consideration.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 md:p-8">
          <TalkForm />
        </div>
      </div>
    </div>
  );
}
