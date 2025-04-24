"use client"

import { useQuiz } from "../quiz-provider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function ScaleQuestion({ question }: { question: any }) {
  const { answers, setAnswer } = useQuiz()
  const questionId = `${question.section}-${question.id}`
  const currentAnswer = answers[questionId]

  const handleChange = (value: string) => {
    setAnswer(questionId, Number.parseInt(value))
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
          <span className="text-2xl">{question.icon || "🤔"}</span>
        </div>
        <h3 className="text-lg font-medium text-yugo-navy">{question.text}</h3>
      </div>

      <RadioGroup value={currentAnswer?.toString() || ""} onValueChange={handleChange} className="space-y-3">
        <div className="flex justify-between items-center mb-2 px-2">
          <span className="text-sm text-slate-500">Strongly Disagree</span>
          <span className="text-sm text-slate-500">Strongly Agree</span>
        </div>

        <div className="flex justify-between gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <div key={value} className="flex-1">
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`w-full h-12 flex items-center justify-center rounded-lg border-2 transition-all duration-200 ${
                    currentAnswer === value
                      ? "border-yugo-teal bg-yugo-teal/10 shadow-md"
                      : "border-slate-200 hover:border-yugo-teal/50"
                  }`}
                >
                  <RadioGroupItem value={value.toString()} id={`${questionId}-${value}`} className="sr-only" />
                  <Label
                    htmlFor={`${questionId}-${value}`}
                    className={`w-full h-full flex items-center justify-center cursor-pointer text-lg font-medium ${
                      currentAnswer === value ? "text-yugo-navy" : "text-slate-500"
                    }`}
                  >
                    {value}
                  </Label>
                </div>
                <span className="text-xs text-slate-500">
                  {value === 1 ? "😕" : value === 2 ? "🙁" : value === 3 ? "😐" : value === 4 ? "🙂" : "😀"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </motion.div>
  )
}
