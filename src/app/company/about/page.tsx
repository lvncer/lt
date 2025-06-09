"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const TEAM_MEMBERS = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image:
      "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Former tech lead with a passion for knowledge sharing and community building.",
  },
  {
    name: "David Chen",
    role: "Head of Community",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Community builder with 8+ years experience in developer relations.",
  },
  {
    name: "Emily Rodriguez",
    role: "Technical Director",
    image:
      "https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Full-stack developer passionate about teaching and mentoring.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          About LightningTalks
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
          <h2>Our Mission</h2>
          <p className="text-lg">
            LightningTalks is dedicated to fostering knowledge sharing and
            community learning through concise, impactful technical
            presentations. We believe that everyone has valuable insights to
            share, and short-format talks make sharing accessible to all.
          </p>

          <h2>Our Story</h2>
          <p>
            Founded in 2025, LightningTalks emerged from a simple observation:
            some of the most valuable technical insights come from brief,
            focused presentations. We created a platform that makes it easy for
            developers to share their knowledge and for learners to discover new
            concepts quickly.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-purple-600 dark:text-purple-400 mb-2">
                  {member.role}
                </p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-card rounded-lg border">
            <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-muted-foreground">Talks Delivered</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border">
            <div className="text-4xl font-bold text-purple-600 mb-2">10k+</div>
            <div className="text-muted-foreground">Community Members</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border">
            <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
            <div className="text-muted-foreground">Countries Reached</div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Whether you are here to share knowledge or learn something new,
            there is a place for you in our community.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Submit a Talk</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/talks">Browse Talks</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
