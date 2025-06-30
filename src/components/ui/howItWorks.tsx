"use client";

import {
  CheckCircle,
  Clock,
  Presentation as PresentationChart,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <PresentationChart className="h-12 w-12" />,
    title: "1. Submit",
    shortTitle: "Submit",
    description:
      "簡単なフォームに、トークの詳細（タイトル、発表時間、トピックなど）を記入してください。",
    color: "from-purple-500 to-purple-700",
    bgColor: "from-purple-50 to-purple-100",
  },
  {
    icon: <CheckCircle className="h-12 w-12" />,
    title: "2. Get Approved",
    shortTitle: "Approve",
    description:
      "私たちのチームがあなたの提出内容を確認します。ほとんどのトークは48時間以内に承認されます。",
    color: "from-teal-500 to-teal-700",
    bgColor: "from-teal-50 to-teal-100",
  },
  {
    icon: <Calendar className="h-12 w-12" />,
    title: "3. Schedule",
    shortTitle: "Schedule",
    description: "承認されると、発表できる今後のイベントについて通知されます。",
    color: "from-blue-500 to-blue-700",
    bgColor: "from-blue-50 to-blue-100",
  },
  {
    icon: <Clock className="h-12 w-12" />,
    title: "4. Present",
    shortTitle: "Present",
    description:
      "指定された時間枠でライトニングトークを発表し、観客との交流を楽しんでください。",
    color: "from-orange-500 to-orange-700",
    bgColor: "from-orange-50 to-orange-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const arrowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.5,
    },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-gradient-to-br from-purple-300/10 via-blue-300/10 to-teal-300/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 120, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-gradient-to-bl from-orange-300/10 via-pink-300/10 to-purple-300/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [360, 240, 360],
          }}
          transition={{
            duration: 35,
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
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              提出から発表まで、シンプルで分かりやすいプロセスで設計されています。
              <br />
              <span className="text-lg text-muted-foreground/80">
                わずか4つのステップで、あなたの知識を世界と共有できます
              </span>
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Connection lines for desktop */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-200 via-blue-200 via-teal-200 to-orange-200 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1 }}
              />
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
              variants={containerVariants}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -12, 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  className="relative"
                >
                  <div className="relative group">
                    {/* Glow effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${step.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    {/* Main card */}
                    <div className={`relative flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br ${step.bgColor} border border-white/50 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl`}>
                      {/* Step number badge */}
                      <div className={`absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-lg flex items-center justify-center shadow-lg`}>
                        {index + 1}
                      </div>

                      {/* Icon */}
                      <div className={`mb-6 p-4 rounded-full bg-gradient-to-r ${step.color} text-white shadow-lg`}>
                        {step.icon}
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold mb-4 text-gray-800">
                        {step.shortTitle}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Progress indicator */}
                      <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${step.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <motion.div
                        className="hidden lg:block absolute top-1/2 -right-8 z-10"
                        variants={arrowVariants}
                      >
                        <div className={`p-2 rounded-full bg-gradient-to-r ${step.color} text-white shadow-lg`}>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-purple-100">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Ready to Get Started?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                あなたの専門知識を共有する準備はできましたか？今すぐ最初のステップを踏み出しましょう！
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl transition-all duration-300"
                  whileHover={{ boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                >
                  <span className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5" />
                    Start Your Journey
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
