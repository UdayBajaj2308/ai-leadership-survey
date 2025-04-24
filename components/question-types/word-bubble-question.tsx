"use client"

import { useQuiz } from "../quiz-provider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function WordBubbleQuestion({ question }: { question: any }) {
  const { answers, setAnswer } = useQuiz()
  const questionId = `${question.section}-${question.id}`
  const currentAnswer = answers[questionId]

  const handleChange = (value: string) => {
    setAnswer(questionId, value)
  }

  const bubbleColors = [
    "bg-blue-100 border-blue-300 hover:bg-blue-200",
    "bg-green-100 border-green-300 hover:bg-green-200",
    "bg-purple-100 border-purple-300 hover:bg-purple-200",
    "bg-amber-100 border-amber-300 hover:bg-amber-200",
    "bg-rose-100 border-rose-300 hover:bg-rose-200",
  ]

  return (
    <motion.div
      className="bg-gradient-to-r from-light to-white p-6 rounded-xl border border-teal/20 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start mb-6">
        <div className="bg-teal/10 p-3 rounded-full mr-4">
          <span className="text-2xl">{question.icon || "👥"}</span>
        </div>
        <h3 className="text-lg font-medium text-navy">{question.text}</h3>
      </div>

      <RadioGroup
        value={currentAnswer || ""}
        onValueChange={handleChange}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {question.options.map((option: any, index: number) => (
          <div key={option.value}>
            <RadioGroupItem value={option.value} id={`${questionId}-${option.value}`} className="peer sr-only" />
            <Label
              htmlFor={`${questionId}-${option.value}`}
              className={`block cursor-pointer transition-all duration-200 ${
                currentAnswer === option.value ? "transform scale-105" : ""
              }`}
            >
              <motion.div
                className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                  bubbleColors[index % bubbleColors.length]
                } ${currentAnswer === option.value ? "border-teal shadow-lg" : "border-transparent"}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium text-navy text-center text-lg">{option.label}</div>
              </motion.div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  )
}
