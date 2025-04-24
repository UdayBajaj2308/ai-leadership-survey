"use client"

import { useState, useEffect } from "react"
import { useQuiz } from "../quiz-provider"
import type { Question } from "@/data/quiz-data"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface MultiSelectQuestionProps {
  question: Question
}

export default function MultiSelectQuestion({ question }: MultiSelectQuestionProps) {
  const { answers, handleAnswer } = useQuiz()
  const [selected, setSelected] = useState<string[]>(answers[question.fieldName] || [])

  // Handle option toggle directly without useEffect
  const toggleOption = (value: string) => {
    let newSelected: string[]

    if (selected.includes(value)) {
      newSelected = selected.filter((item) => item !== value)
    } else {
      newSelected = [...selected, value]
    }

    setSelected(newSelected)

    // Store the answer with the question's fieldName
    handleAnswer(question.fieldName, newSelected)

    // Also store with section-id format for compatibility if needed
    if (question.section && question.id) {
      handleAnswer(`${question.section}-${question.id}`, newSelected)
    }

    console.log(`Multi-select question answered: ${question.fieldName} = ${newSelected.join(", ")}`)
  }

  // Update selected value if answers change externally
  useEffect(() => {
    if (answers[question.fieldName] && JSON.stringify(answers[question.fieldName]) !== JSON.stringify(selected)) {
      setSelected(answers[question.fieldName])
    }
  }, [answers, question.fieldName, selected])

  return (
    <div className="space-y-4 mt-4">
      {question.options?.map((option, index) => (
        <motion.div
          key={option.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div
            className={`
              border border-gray-200 rounded-lg p-4 w-full
              flex items-center
              hover:border-navy hover:bg-gray-50
              transition-all cursor-pointer
              ${selected.includes(option.value) ? "border-navy bg-navy/5" : ""}
            `}
            onClick={() => toggleOption(option.value)}
          >
            <Checkbox
              id={`${question.fieldName}-${option.value}`}
              checked={selected.includes(option.value)}
              onCheckedChange={() => toggleOption(option.value)}
            />
            <Label htmlFor={`${question.fieldName}-${option.value}`} className="ml-4 text-lg cursor-pointer">
              {option.label}
            </Label>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
