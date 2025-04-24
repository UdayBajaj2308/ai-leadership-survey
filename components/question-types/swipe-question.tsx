"use client"

import { useState } from "react"
import { useQuiz } from "../quiz-provider"
import type { Question } from "@/data/quiz-data"
import { motion } from "framer-motion"

interface SwipeQuestionProps {
  question: Question
}

export default function SwipeQuestion({ question }: SwipeQuestionProps) {
  const { answers, handleAnswer } = useQuiz()
  const [selected, setSelected] = useState<string>(answers[question.fieldName] || "")

  // Handle selection directly without useEffect
  const handleSelection = (value: string) => {
    setSelected(value)
    handleAnswer(question.fieldName, value)
  }

  return (
    <div className="flex flex-col space-y-4 mt-6">
      {question.options?.map((option, index) => (
        <motion.div
          key={option.value}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`
            border-2 rounded-lg p-5 cursor-pointer
            hover:border-navy hover:shadow-md transition-all
            ${selected === option.value ? "border-navy bg-navy/5" : "border-gray-200"}
          `}
          onClick={() => handleSelection(option.value)}
        >
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">{option.label}</span>
            {selected === option.value && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-navy"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
