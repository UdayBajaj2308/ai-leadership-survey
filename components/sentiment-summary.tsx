"use client"

import { motion } from "framer-motion"

export default function SentimentSummary({
  primaryEmotion,
  trustScore,
}: {
  primaryEmotion: string
  trustScore: number
}) {
  const getSentimentSummary = () => {
    // Determine sentiment based on primary emotion
    let sentiment = ""

    if (["excited", "inspired"].includes(primaryEmotion)) {
      sentiment = "optimistic"
    } else if (["curious"].includes(primaryEmotion)) {
      sentiment = "curious"
    } else if (["cautious"].includes(primaryEmotion)) {
      sentiment = "cautiously optimistic"
    } else {
      sentiment = "thoughtful"
    }

    // Determine trust phrase based on trust score
    let trustPhrase = ""

    if (trustScore >= 4) {
      trustPhrase = "confident in its potential"
    } else if (trustScore === 3) {
      trustPhrase = "interested to see where it goes"
    } else {
      trustPhrase = "carefully evaluating its role"
    }

    return `You're mostly ${sentiment} about AI — and ${trustPhrase}!`
  }

  return (
    <motion.div
      className="bg-yugo-navy/10 p-6 rounded-xl border border-yugo-navy/20 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center">
        <div className="bg-yugo-navy/10 p-3 rounded-full mr-4">
          <span className="text-2xl">💭</span>
        </div>
        <div>
          <h4 className="text-lg font-medium text-yugo-navy mb-1">Your AI Sentiment Summary</h4>
          <p className="text-yugo-navy italic">{getSentimentSummary()}</p>
        </div>
      </div>
    </motion.div>
  )
}
