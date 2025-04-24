"use client"

import { useState, useEffect } from "react"
import { useQuiz } from "../quiz-provider"
import type { Question } from "@/data/quiz-data"
import { motion } from "framer-motion"

interface EmojiQuestionProps {
  question: Question
}

export default function EmojiQuestion({ question }: EmojiQuestionProps) {
  const { answers, handleAnswer } = useQuiz()
  const [selected, setSelected] = useState<string>(answers[question.fieldName] || "")

  // Handle selection directly without useEffect
  const handleSelection = (value: string) => {
    setSelected(value)

    // Store the answer with the question's fieldName
    handleAnswer(question.fieldName, value)

    // Also store with section-id format for compatibility if needed
    if (question.section && question.id) {
      handleAnswer(`${question.section}-${question.id}`, value)
    }

    console.log(`Emoji question answered: ${question.fieldName} = ${value}`)
  }

  // Update selected value if answers change externally
  useEffect(() => {
    if (answers[question.fieldName] && answers[question.fieldName] !== selected) {
      setSelected(answers[question.fieldName])
    }
  }, [answers, question.fieldName, selected])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {question.options?.map((option, index) => (
        <motion.div
          key={option.value}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`
            border-2 rounded-lg p-4 flex flex-col items-center justify-center gap-3 cursor-pointer
            hover:border-navy hover:shadow-md transition-all card-hover
            ${selected === option.value ? "border-navy bg-navy/5" : "border-gray-200"}
          `}
          onClick={() => handleSelection(option.value)}
        >
          <span className="text-4xl">{option.emoji}</span>
          <span className="text-center font-medium">{option.label}</span>
        </motion.div>
      ))}
    </div>
  )
}
