"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const floatingItem = {
  animate: {
    y: [-20, 20, -20],
    rotate: [0, 360],
    opacity: [0.3, 0.8, 0.3],
  },
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function HeroSection() {
  return (
    <div className="mt-8 relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Enhanced Background decorative elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Primary gradient orb */}
        <motion.div
          className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-400/30 via-pink-400/20 to-blue-500/30 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Secondary gradient orb */}
        <motion.div
          className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-teal-400/30 via-cyan-400/20 to-blue-500/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Additional accent orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-yellow-300/20 to-orange-400/20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating icons */}
        <motion.div
          className="absolute top-20 left-20 text-purple-400/40"
          variants={floatingItem}
          animate="animate"
        >
          <Sparkles size={24} />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-32 text-blue-400/40"
          variants={floatingItem}
          animate="animate"
          transition={{ ...floatingItem.transition, delay: 2 }}
        >
          <Star size={20} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 left-32 text-teal-400/40"
          variants={floatingItem}
          animate="animate"
          transition={{ ...floatingItem.transition, delay: 4 }}
        >
          <Zap size={28} />
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 py-20">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Enhanced status badge */}
          <motion.div
            variants={item}
            className="inline-flex items-center px-4 py-2 rounded-full border border-purple-200/50 bg-gradient-to-r from-purple-50/80 to-blue-50/80 backdrop-blur-sm text-sm font-medium mb-8 shadow-lg"
          >
            <motion.span 
              className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 mr-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
              Registration Now Open
            </span>
          </motion.div>

          {/* Enhanced main heading */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Share Your Expertise
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 bg-clip-text text-transparent">
              in Lightning Talks
            </span>
          </motion.h1>

          {/* Enhanced description */}
          <motion.p
            variants={item}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mb-12 leading-relaxed"
          >
            <span className="font-medium bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
              短時間で知識を共有し、議論を活性化し、<br />
              技術コミュニティとつながるためのプレゼンテーション
            </span>
            <br />
            <span className="text-lg text-muted-foreground/80">
              すべて20分以内で完結します。
            </span>
          </motion.p>

          {/* Enhanced CTA buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl group border-0 px-8 py-4 text-lg font-semibold"
              >
                <Link href="/register" className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5" />
                  Submit a Talk
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-purple-200 hover:border-purple-300 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-purple-700 font-semibold px-8 py-4 text-lg shadow-lg"
              >
                <Link href="/talks" className="flex items-center gap-3">
                  Browse Talks
                  <Star className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats section */}
          <motion.div
            variants={item}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-2xl"
          >
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">50+</div>
              <div className="text-sm text-muted-foreground font-medium">Active Speakers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">200+</div>
              <div className="text-sm text-muted-foreground font-medium">Talks Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">95%</div>
              <div className="text-sm text-muted-foreground font-medium">Satisfaction Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
