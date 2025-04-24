"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useQuiz } from "../quiz-provider"
import type { Question } from "@/data/quiz-data"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface TextInputQuestionProps {
  question: Question
}

export default function TextInputQuestion({ question }: TextInputQuestionProps) {
  const { answers, handleAnswer } = useQuiz()
  const [value, setValue] = useState(answers[question.fieldName] || "")

  // Handle input change directly without useEffect
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)

    if (newValue.trim()) {
      // Store the answer with the question's fieldName
      handleAnswer(question.fieldName, newValue.trim())

      // Also store with section-id format for compatibility if needed
      if (question.section && question.id) {
        handleAnswer(`${question.section}-${question.id}`, newValue.trim())
      }

      console.log(`Text input question answered: ${question.fieldName} = ${newValue.trim()}`)
    }
  }

  // Update value if answers change externally
  useEffect(() => {
    if (answers[question.fieldName] && answers[question.fieldName] !== value) {
      setValue(answers[question.fieldName])
    }
  }, [answers, question.fieldName, value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 flex flex-col items-center"
    >
      <div className="w-full max-w-md">
        <Input
          value={value}
          onChange={handleInputChange}
          placeholder="Type your answer here"
          className="text-lg p-4 h-12"
        />

        {question.required && value.trim() === "" && (
          <p className="text-red-500 mt-2 text-sm">This field is required</p>
        )}

        <p className="text-gray-500 mt-4 text-center">Just one word that captures what you think about AI's future</p>
      </div>
    </motion.div>
  )
}
