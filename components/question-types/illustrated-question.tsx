"use client"

import { useQuiz } from "../quiz-provider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function IllustratedQuestion({ question }: { question: any }) {
  const { answers, setAnswer } = useQuiz()
  const questionId = `${question.section}-${question.id}`
  const currentAnswer = answers[questionId]

  const handleChange = (value: string) => {
    setAnswer(questionId, value)
  }

  return (
    <motion.div
      className="bg-gradient-to-r from-light to-white p-6 rounded-xl border border-teal/20 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start mb-6">
        <div className="bg-teal/10 p-3 rounded-full mr-4">
          <span className="text-2xl">{question.icon || "🏢"}</span>
        </div>
        <h3 className="text-lg font-medium text-navy">{question.text}</h3>
      </div>

      <RadioGroup value={currentAnswer || ""} onValueChange={handleChange} className="space-y-3">
        {question.options.map((option: any) => (
          <motion.div key={option.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <RadioGroupItem value={option.value} id={`${questionId}-${option.value}`} className="peer sr-only" />
            <Label
              htmlFor={`${questionId}-${option.value}`}
              className="flex items-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer peer-checked:border-teal peer-checked:bg-teal/10 peer-checked:shadow-md hover:border-teal/50 border-slate-200"
            >
              <div className="bg-teal/10 p-3 rounded-full mr-4">
                <span className="text-2xl">{option.icon}</span>
              </div>
              <div>
                <div className="font-medium text-navy">{option.label}</div>
                <div className="text-sm text-slate-600">{option.description}</div>
              </div>
            </Label>
          </motion.div>
        ))}
      </RadioGroup>
    </motion.div>
  )
}
