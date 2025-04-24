"use client"

import { useQuiz } from "../quiz-provider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function ScenarioQuestion({ question }: { question: any }) {
  const { answers, setAnswer } = useQuiz()
  const questionId = `${question.section}-${question.id}`
  const currentAnswer = answers[questionId]

  const handleChange = (value: string) => {
    setAnswer(questionId, value)
  }

  const scenarios =
    question.section === 3
      ? [
          {
            value: "explorer",
            title: "Learning & Research",
            description: "Use AI to gather insights and explore possibilities",
            icon: "🔍",
          },
          {
            value: "strategist",
            title: "Strategic Planning",
            description: "Integrate AI into your long-term business strategy",
            icon: "📝",
          },
          {
            value: "innovator",
            title: "Innovation & Development",
            description: "Create new products and services with AI",
            icon: "💡",
          },
          {
            value: "skeptic",
            title: "Risk Assessment",
            description: "Focus on security and ethical considerations",
            icon: "⚖️",
          },
        ]
      : [
          {
            value: "explorer",
            title: "Learn and Experiment",
            description: "Start with small experiments to learn about AI capabilities",
            icon: "🔍",
          },
          {
            value: "strategist",
            title: "Strategic Planning",
            description: "Develop a comprehensive AI strategy before implementation",
            icon: "📝",
          },
          {
            value: "innovator",
            title: "Disruptive Innovation",
            description: "Focus on creating breakthrough AI applications",
            icon: "💡",
          },
          {
            value: "skeptic",
            title: "Careful Evaluation",
            description: "Thoroughly assess risks and benefits before proceeding",
            icon: "⚖️",
          },
        ]

  return (
    <motion.div
      className="bg-gradient-to-r from-yugo-light to-white p-6 rounded-xl border border-yugo-teal/20 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start mb-6">
        <div className="bg-yugo-teal/10 p-3 rounded-full mr-4">
          <span className="text-2xl">{question.icon || "🎭"}</span>
        </div>
        <h3 className="text-lg font-medium text-yugo-navy">{question.text}</h3>
      </div>

      <RadioGroup value={currentAnswer || ""} onValueChange={handleChange} className="space-y-3">
        {scenarios.map((scenario) => (
          <div key={scenario.value}>
            <RadioGroupItem value={scenario.value} id={`${questionId}-${scenario.value}`} className="peer sr-only" />
            <Label
              htmlFor={`${questionId}-${scenario.value}`}
              className="flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer peer-checked:border-yugo-teal peer-checked:bg-yugo-teal/10 peer-checked:shadow-md hover:border-yugo-teal/50 border-slate-200"
            >
              <div className="text-2xl mr-3">{scenario.icon}</div>
              <div>
                <div className="font-medium text-yugo-navy">{scenario.title}</div>
                <div className="text-sm text-slate-600">{scenario.description}</div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  )
}
