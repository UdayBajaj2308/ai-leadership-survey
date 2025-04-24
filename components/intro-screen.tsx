"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function IntroScreen({ onStart }: { onStart: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-8 text-center">
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <div className="relative w-40 h-40">
            <Image src="/images/quiz-logo.svg" alt="AI Leadership Quiz" fill className="object-contain" />
          </div>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-4xl font-bold text-navy mb-4">
          AI Leadership Sentiment Explorer
        </motion.h1>

        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-slate-600 mb-4">
            Welcome to the AI Leadership Sentiment Explorer! This interactive quiz will help you understand your unique
            approach to AI leadership in the student housing sector.
          </p>
          <p className="text-slate-600 mb-4">
            Through a series of engaging questions, we'll explore your emotional response to AI, your vision for its
            impact on student housing, and your preferences for implementation.
          </p>
          <p className="text-slate-600">
            At the end, you'll discover your AI leadership archetype, complete with insights tailored to your leadership
            style. Ready to begin? 🚀
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center"
        >
          <Button
            onClick={onStart}
            size="lg"
            className="bg-teal hover:bg-navy text-white font-medium px-8 py-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey ✨
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
