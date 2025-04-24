"use client"

import { useState, useEffect } from "react"
import { useQuiz } from "../quiz-provider"
import type { Question } from "@/data/quiz-data"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface RadioQuestionProps {
  question: Question
}

export default function RadioQuestion({ question }: RadioQuestionProps) {
  const { answers, handleAnswer } = useQuiz()
  const [selected, setSelected] = useState<string>(answers[question.fieldName] || "")

  // Handle selection change directly without useEffect
  const handleSelectionChange = (value: string) => {
    setSelected(value)

    // Store the answer with the question's fieldName
    handleAnswer(question.fieldName, value)

    // Also store with section-id format for compatibility if needed
    if (question.section && question.id) {
      handleAnswer(`${question.section}-${question.id}`, value)
    }

    console.log(`Question answered: ${question.fieldName} = ${value}`)
  }

  // Update selected value if answers change externally
  useEffect(() => {
    if (answers[question.fieldName] && answers[question.fieldName] !== selected) {
      setSelected(answers[question.fieldName])
    }
  }, [answers, question.fieldName, selected])

  return (
    <RadioGroup value={selected} onValueChange={handleSelectionChange} className="space-y-4 mt-4">
      {question.options?.map((option, index) => (
        <motion.div
          key={option.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center space-x-2"
        >
          <div
            className={`
            border border-gray-200 rounded-lg p-4 w-full
            flex items-center
            hover:border-navy hover:bg-gray-50
            transition-all cursor-pointer
            ${selected === option.value ? "border-navy bg-navy/5" : ""}
          `}
            onClick={() => handleSelectionChange(option.value)}
          >
            <RadioGroupItem value={option.value} id={`${question.fieldName}-${option.value}`} />
            <Label htmlFor={`${question.fieldName}-${option.value}`} className="ml-4 text-lg cursor-pointer">
              {option.label}
            </Label>
          </div>
        </motion.div>
      ))}
    </RadioGroup>
  )
}
