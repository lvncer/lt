"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stats = [
  { number: "3+", label: "Talks Submitted", color: "text-purple-600" },
  { number: "100+", label: "Topics Covered", color: "text-blue-600" },
  { number: "3+", label: "Speakers", color: "text-teal-600" },
  { number: "3+", label: "Users", color: "text-orange-500" },
];

export default function HeroSection() {
  return (
    <div className="mt-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-purple-300/20 to-blue-300/20 blur-3xl"
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
          className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-300/20 to-blue-300/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 py-20 sm:py-32 md:py-38 lg:py-44">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-background/50 backdrop-blur-sm text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span>Registration Now Open</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          >
            Share Your Expertise in Lightning&nbsp;Talks
          </motion.h1>

          <motion.p
            variants={item}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl sm:max-w-2xl md:max-w-3xl mb-8"
          >
            短時間で知識を共有し、議論を活性化し、
            <br />
            技術コミュニティとつながるためのプレゼンテーション
            <br />
            すべて20分以内で完結します。
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white group"
            >
              <Link href="/register" className="flex items-center gap-2">
                Submit a Talk
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/talks">Browse Talks</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={item}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
