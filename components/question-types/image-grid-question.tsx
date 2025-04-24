"use client"

import { useQuiz } from "../quiz-provider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ImageGridQuestion({ question }: { question: any }) {
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
          <span className="text-2xl">{question.icon || "🖼️"}</span>
        </div>
        <h3 className="text-lg font-medium text-navy">{question.text}</h3>
      </div>

      <RadioGroup value={currentAnswer || ""} onValueChange={handleChange} className="grid grid-cols-2 gap-4">
        {question.options.map((option: any) => (
          <div key={option.value}>
            <RadioGroupItem value={option.value} id={`${questionId}-${option.value}`} className="sr-only" />
            <Label
              htmlFor={`${questionId}-${option.value}`}
              className={`block cursor-pointer transition-all duration-200 ${
                currentAnswer === option.value ? "transform scale-105" : ""
              }`}
            >
              <div
                className={`rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  currentAnswer === option.value ? "border-teal shadow-lg" : "border-slate-200 hover:border-teal/50"
                } card-hover`}
              >
                <div className="relative h-40 w-full flex items-center justify-center">
                  <Image
                    src={option.image || "/placeholder.svg"}
                    alt={option.label}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <div
                  className={`p-3 text-center font-medium ${
                    currentAnswer === option.value ? "bg-teal/10 text-navy" : "text-slate-700"
                  }`}
                >
                  {option.label}
                </div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  )
}
