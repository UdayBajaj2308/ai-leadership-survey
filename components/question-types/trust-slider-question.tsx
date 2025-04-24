"use client"

import { useQuiz } from "../quiz-provider"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function TrustSliderQuestion({ question }: { question: any }) {
  const { answers, setAnswer } = useQuiz()
  const questionId = `${question.section}-${question.id}`
  const [value, setValue] = useState<number[]>([3])

  useEffect(() => {
    if (answers[questionId] !== undefined) {
      setValue([answers[questionId]])
    }
  }, [answers, questionId])

  const handleChange = (newValue: number[]) => {
    setValue(newValue)
    setAnswer(questionId, newValue[0])
  }

  const getEmoji = () => {
    const val = value[0]
    if (val === 1) return "😬"
    if (val === 2) return "😕"
    if (val === 3) return "😐"
    if (val === 4) return "🙂"
    return "💯"
  }

  const getLabel = () => {
    const val = value[0]
    if (val === 1) return "Not at all"
    if (val === 2) return "Rarely"
    if (val === 3) return "Sometimes"
    if (val === 4) return "Often"
    return "Completely"
  }

  return (
    <motion.div
      className="bg-gradient-to-r from-yugo-light to-white p-6 rounded-xl border border-yugo-teal/20 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start mb-6">
        <div className="bg-yugo-teal/10 p-3 rounded-full mr-4">
          <span className="text-2xl">{question.icon || "🤝"}</span>
        </div>
        <h3 className="text-lg font-medium text-yugo-navy">{question.text}</h3>
      </div>

      <div className="mt-8 px-4">
        <Slider value={value} onValueChange={handleChange} max={5} min={1} step={1} className="mb-6" />

        <div className="flex justify-between text-sm text-slate-500 mb-8">
          <span className="flex flex-col items-center">
            <span className="text-xl">😬</span>
            <span>Not at all</span>
          </span>
          <span className="flex flex-col items-center">
            <span className="text-xl">😐</span>
            <span>Sometimes</span>
          </span>
          <span className="flex flex-col items-center">
            <span className="text-xl">💯</span>
            <span>Completely</span>
          </span>
        </div>

        <div className="flex justify-center">
          <motion.div
            className="bg-yugo-teal/10 px-6 py-3 rounded-full flex items-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            key={getLabel()}
          >
            <span className="text-2xl mr-2">{getEmoji()}</span>
            <span className="font-medium text-yugo-navy">{getLabel()}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
