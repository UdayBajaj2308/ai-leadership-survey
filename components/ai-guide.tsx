"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface AIGuideProps {
  message: string
  emotion?: "happy" | "thinking" | "excited" | "neutral"
  delay?: number
}

export default function AIGuide({ message, emotion = "neutral", delay = 0 }: AIGuideProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <motion.div
      className="flex items-end mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative mr-4"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <AICharacter emotion={emotion} />
      </motion.div>
      <motion.div
        className="relative bg-white p-4 rounded-xl shadow-md max-w-xs"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 rotate-45 w-4 h-4 bg-white" />
        <p className="text-navy">{message}</p>
      </motion.div>
    </motion.div>
  )
}

function AICharacter({ emotion }: { emotion: string }) {
  return (
    <div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center overflow-hidden">
      {emotion === "happy" && (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#00205B" />
          <circle cx="8" cy="9" r="1.5" fill="white" />
          <circle cx="16" cy="9" r="1.5" fill="white" />
          <path d="M7 14C7 14 9 17 12 17C15 17 17 14 17 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      {emotion === "thinking" && (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#00205B" />
          <circle cx="8" cy="9" r="1.5" fill="white" />
          <circle cx="16" cy="9" r="1.5" fill="white" />
          <path d="M9 15H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      {emotion === "excited" && (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#00205B" />
          <circle cx="8" cy="9" r="1.5" fill="white" />
          <circle cx="16" cy="9" r="1.5" fill="white" />
          <path d="M7 13C7 13 9 18 12 18C15 18 17 13 17 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      {emotion === "neutral" && (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#00205B" />
          <circle cx="8" cy="9" r="1.5" fill="white" />
          <circle cx="16" cy="9" r="1.5" fill="white" />
          <path d="M9 14H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </div>
  )
}
