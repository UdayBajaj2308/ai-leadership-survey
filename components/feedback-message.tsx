"use client"

import { motion } from "framer-motion"

export default function FeedbackMessage({ feedback }: { feedback: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-navy/10 p-4 rounded-xl border border-navy/20 shadow-sm"
    >
      <div className="flex items-center">
        <div className="bg-navy/10 p-2 rounded-full mr-3">
          <span className="text-xl">💡</span>
        </div>
        <p className="text-navy">{feedback}</p>
      </div>
    </motion.div>
  )
}
