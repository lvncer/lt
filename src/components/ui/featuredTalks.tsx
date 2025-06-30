"use client";

import TalkCard from "@/components/talks/TalkCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Talk } from "@/types/talk";
import { motion } from "framer-motion";

interface FeaturedTalksProps {
  featuredTalks: Talk[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function FeaturedTalks({ featuredTalks }: FeaturedTalksProps) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-teal-50/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-10 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-purple-300/20 to-pink-300/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-16 left-16 w-64 h-64 rounded-full bg-gradient-to-tr from-blue-300/20 to-teal-300/20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [360, 270, 360],
          }}
          transition={{
            duration: 25,
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
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16"
            variants={itemVariants}
          >
            <div className="text-center md:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Community Favorites
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                Featured Talks
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                コミュニティのスピーカーたちによる人気のライトニングトークを発見しましょう！
                <br />
                <span className="text-base text-muted-foreground/80">
                  最も評価の高いトークを厳選しました
                </span>
              </p>
            </div>
            
            <motion.div
              variants={itemVariants}
              className="mt-6 md:mt-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-300 hover:bg-white/90 text-purple-700 font-semibold shadow-lg"
              >
                <Link href="/talks" className="flex items-center gap-2">
                  View all talks
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {featuredTalks.map((talk: Talk, index) => (
              <motion.div
                key={talk.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="transform transition-all duration-300"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-xl blur opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Badge for featured talks */}
                  {index === 0 && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        🌟 Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
                    <TalkCard talk={talk} variant="featured" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-6 text-lg">
              あなたの専門知識を共有してみませんか？
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl px-8 py-4 text-lg font-semibold"
              >
                <Link href="/register" className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5" />
                  Submit Your Talk Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
