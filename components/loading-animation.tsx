"use client"

import { motion } from "framer-motion"

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white rounded-lg p-8 flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-16 h-16 mb-4">
          <motion.div
            className="absolute inset-0 border-4 border-t-navy border-r-transparent border-b-transparent border-l-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 border-4 border-t-teal border-r-transparent border-b-transparent border-l-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>
        <p className="text-navy font-medium">Submitting your responses...</p>
        <p className="text-gray-500 text-sm mt-2">This will just take a moment</p>
      </motion.div>
    </div>
  )
}
