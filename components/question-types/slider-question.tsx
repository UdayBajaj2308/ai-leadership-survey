"use client"

import { useState, useEffect } from "react"
import { useQuiz } from "../quiz-provider"
import type { Question } from "@/data/quiz-data"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"

interface SliderQuestionProps {
  question: Question
}

export default function SliderQuestion({ question }: SliderQuestionProps) {
  const { answers, handleAnswer } = useQuiz()
  const [value, setValue] = useState<number[]>(answers[question.fieldName] ? [answers[question.fieldName]] : [3])
  const [isDragging, setIsDragging] = useState(false)

  // Handle slider change directly without useEffect
  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue)

    // Store the answer with the question's fieldName
    handleAnswer(question.fieldName, newValue[0])

    // Also store with section-id format for compatibility if needed
    if (question.section && question.id) {
      handleAnswer(`${question.section}-${question.id}`, newValue[0])
    }

    console.log(`Slider question answered: ${question.fieldName} = ${newValue[0]}`)
  }

  // Update value if answers change externally
  useEffect(() => {
    if (answers[question.fieldName] && answers[question.fieldName] !== value[0]) {
      setValue([answers[question.fieldName]])
    }
  }, [answers, question.fieldName, value])

  // Handle drag start/end for animation effects
  const handleDragStart = () => setIsDragging(true)
  const handleDragEnd = () => setIsDragging(false)

  const options = question.options || []

  return (
    <div className="py-6">
      <div className="mb-10">
        <Slider
          value={value}
          min={1}
          max={5}
          step={1}
          onValueChange={handleSliderChange}
          onPointerDown={handleDragStart}
          onPointerUp={handleDragEnd}
          className="w-full"
        />
      </div>

      <div className="flex justify-between text-sm mt-2">
        {options.map((option) => (
          <div
            key={option.value}
            className={`text-center px-2 transition-all duration-300 ${
              value[0] === option.value ? "font-bold text-navy scale-110" : "text-gray-500"
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>

      <motion.div
        className="text-center mt-6"
        animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <span className="text-2xl font-bold gradient-text">{value[0]}/5</span>
        <p className="mt-2">{options.find((o) => o.value === value[0])?.label}</p>
      </motion.div>
    </div>
  )
}
