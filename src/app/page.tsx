"use client";

import HeroSection from "@/components/ui/heroSection";
import FeaturedTalks from "@/components/ui/featuredTalks";
import HowItWorks from "@/components/ui/howItWorks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap, Sparkles, ArrowRight, Code, Palette, Zap as ZapIcon } from "lucide-react";
import { SAMPLE_TALKS } from "@/lib/data";
import { motion } from "framer-motion";

const topics = [
  { name: "React", icon: "⚛️", color: "from-blue-500 to-cyan-500" },
  { name: "Next.js", icon: "▲", color: "from-gray-700 to-gray-900" },
  { name: "TypeScript", icon: "📘", color: "from-blue-600 to-blue-800" },
  { name: "JavaScript", icon: "🟨", color: "from-yellow-400 to-yellow-600" },
  { name: "CSS", icon: "🎨", color: "from-purple-500 to-pink-500" },
  { name: "Accessibility", icon: "♿", color: "from-green-500 to-green-700" },
  { name: "Performance", icon: "⚡", color: "from-orange-500 to-red-500" },
  { name: "State Management", icon: "🔄", color: "from-indigo-500 to-purple-600" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />

      <FeaturedTalks featuredTalks={SAMPLE_TALKS} />

      <HowItWorks />

      {/* Enhanced Topics Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-300/20 to-blue-300/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-tl from-teal-300/20 to-purple-300/20 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [360, 180, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {/* Header */}
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-medium mb-6">
                <Code className="h-4 w-4 mr-2" />
                Tech Topics
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                Popular Topics
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                私たちのコミュニティは、幅広い技術的なトピックをカバーしています。
                <br />
                <span className="text-lg text-muted-foreground/80">
                  あなたの専門分野で知識を共有しましょう
                </span>
              </p>
            </motion.div>

            {/* Topics Grid */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
            >
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.name}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  {/* Glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${topic.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  {/* Main card */}
                  <div className="relative flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="text-3xl md:text-4xl mb-4">{topic.icon}</div>
                    <span className={`font-semibold text-lg bg-gradient-to-r ${topic.color} bg-clip-text text-transparent`}>
                      {topic.name}
                    </span>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom CTA for topics */}
            <motion.div
              variants={itemVariants}
              className="text-center mt-16"
            >
              <p className="text-muted-foreground mb-6 text-lg">
                他のトピックについても話したいですか？
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-300 hover:bg-white/90 text-purple-700 font-semibold px-8 py-4 text-lg shadow-lg"
                >
                  <Link href="/register" className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5" />
                    Suggest a Topic
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/80 to-blue-600/80"
            animate={{
              background: [
                "linear-gradient(135deg, rgba(147, 51, 234, 0.8) 0%, rgba(37, 99, 235, 0.8) 100%)",
                "linear-gradient(135deg, rgba(37, 99, 235, 0.8) 0%, rgba(20, 184, 166, 0.8) 100%)",
                "linear-gradient(135deg, rgba(20, 184, 166, 0.8) 0%, rgba(147, 51, 234, 0.8) 100%)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="flex flex-col md:flex-row md:items-center gap-12"
          >
            {/* Left content */}
            <motion.div className="md:w-1/2" variants={itemVariants}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <ZapIcon className="h-4 w-4 mr-2" />
                Join Our Community
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                Ready to Share Your Knowledge?
              </h2>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                ライトニングトークは、自分の専門知識を共有し、プレゼンテーションスキルを磨き、志を同じくするプロフェッショナルたちとつながる素晴らしい機会です！
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-white/90 shadow-2xl px-8 py-4 text-lg font-semibold"
                >
                  <Link href="/register" className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5" />
                    Submit Your Talk
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right benefits */}
            <motion.div className="md:w-1/2 space-y-6" variants={containerVariants}>
              {[
                {
                  title: "Quick and Impactful",
                  description: "たった5〜20分で、鋭い知見や体験を共有できる",
                  icon: "⚡",
                },
                {
                  title: "Build Your Profile",
                  description: "得意な分野での「思想的リーダー」としての地位を確立できる",
                  icon: "🚀",
                },
                {
                  title: "Connect with Others",
                  description: "仲間や将来のコラボレーターとネットワークを築ける",
                  icon: "🤝",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  whileHover={{ x: 10, transition: { duration: 0.3 } }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{benefit.icon}</div>
                      <div>
                        <div className="font-bold text-xl mb-2">{benefit.title}</div>
                        <p className="text-white/80 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
