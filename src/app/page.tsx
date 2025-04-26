import HeroSection from "@/components/ui/heroSection";
import FeaturedTalks from "@/components/ui/featuredTalks";
import HowItWorks from "@/components/ui/howItWorks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function Home() {
  return (
    <>
      <HeroSection />

      <FeaturedTalks />

      <HowItWorks />

      {/* Topics Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Popular Topics
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              私たちのコミュニティは、幅広い技術的なトピックをカバーしています。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "JavaScript",
              "CSS",
              "Accessibility",
              "Performance",
              "State Management",
            ].map((topic) => (
              <Link
                key={topic}
                href={`/talks?topic=${topic}`}
                className="flex items-center justify-center p-4 rounded-lg border bg-card hover:bg-accent/50 hover:border-purple-200 transition-colors text-center"
              >
                <span>{topic}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Ready to Share Your Knowledge?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                ライトニングトークは、自分の専門知識を共有し、プレゼンテーションスキルを磨き、志を同じくするプロフェッショナルたちとつながる素晴らしい機会です！
              </p>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90"
              >
                <Link href="/register" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Submit Your Talk
                </Link>
              </Button>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="font-medium mb-1">Quick and Impactful</div>
                <p className="text-sm text-white/80">
                  たった5〜20分で、鋭い知見や体験を共有できる
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="font-medium mb-1">Build Your Profile</div>
                <p className="text-sm text-white/80">
                  得意な分野での「思想的リーダー」としての地位を確立できる
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="font-medium mb-1">Connect with Others</div>
                <p className="text-sm text-white/80">
                  仲間や将来のコラボレーターとネットワークを築ける
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
