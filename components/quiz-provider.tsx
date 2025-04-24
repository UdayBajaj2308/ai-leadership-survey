"use client"

import type React from "react"
import { createContext, useState, useContext, useCallback } from "react"
import { questions, type ArchetypeKey } from "@/data/quiz-data"
import { submitQuizResults } from "@/services/submit-data"

type AnswersType = Record<string, any>

interface QuizContextType {
  currentQuestionIndex: number
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>
  answers: AnswersType
  setAnswers: React.Dispatch<React.SetStateAction<AnswersType>>
  isComplete: boolean
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  handleNextQuestion: () => void
  handlePreviousQuestion: () => void
  handleAnswer: (fieldName: string, value: any) => void
  getProgress: () => number
  isNextButtonDisabled: (fieldName: string) => boolean
  determineArchetype: () => string
  archetype: string | null
  error: string | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
  handleSubmit: () => Promise<void>
  submissionResult: { success: boolean; message: string } | null
  setSubmissionResult: React.Dispatch<React.SetStateAction<{ success: boolean; message: string } | null>>
  soundEnabled: boolean
  toggleSound: () => void
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswersType>({})
  const [isComplete, setIsComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [archetype, setArchetype] = useState<string | null>(null)
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; message: string } | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Handle moving to the next question
  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setIsComplete(true)
    }
  }, [currentQuestionIndex])

  // Handle moving to the previous question
  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [currentQuestionIndex])

  // Handle answering a question - use useCallback to prevent unnecessary re-renders
  const handleAnswer = useCallback(
    (fieldName: string, value: any) => {
      setAnswers((prev) => {
        // Only update if the value has changed
        if (prev[fieldName] === value) return prev

        // Store the answer with both the field name and the question ID format
        const currentQuestion = questions[currentQuestionIndex]
        const updatedAnswers = { ...prev, [fieldName]: value }

        // If this is a question from our quiz data, also store it with the fieldName
        if (currentQuestion && currentQuestion.fieldName) {
          updatedAnswers[currentQuestion.fieldName] = value
        }

        console.log("Updated answers:", updatedAnswers)
        return updatedAnswers
      })
    },
    [currentQuestionIndex],
  )

  // Calculate progress percentage
  const getProgress = useCallback(() => {
    return ((currentQuestionIndex + 1) / questions.length) * 100
  }, [currentQuestionIndex])

  // Check if the next button should be disabled
  const isNextButtonDisabled = useCallback(
    (fieldName: string) => {
      const currentQuestion = questions[currentQuestionIndex]

      // If the question is required and not answered, disable next button
      if (currentQuestion.required && !answers[fieldName]) {
        return true
      }

      return false
    },
    [currentQuestionIndex, answers],
  )

  // Determine user's archetype based on their answers
  const determineArchetype = useCallback(() => {
    // Default to explorer if no archetype selected
    const selectedArchetype = (answers.archetype as ArchetypeKey) || "explorer"

    // Set the archetype
    setArchetype(selectedArchetype)

    return selectedArchetype
  }, [answers.archetype])

  // Toggle sound
  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev)
  }, [])

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setSubmissionResult(null)

    try {
      // Log all answers before submission for debugging
      console.log("All answers before submission:", answers)

      // Format the data for submission
      const formattedData = {
        archetype: determineArchetype(),
        answers: answers,
        textInputs: {
          participant_name: answers.participant_name || "",
          ai_biggest_hope: answers.ai_biggest_hope || "",
          ai_word_future: answers.ai_word_future || "",
        },
      }

      // Try to submit to Google Sheets
      const result = await submitQuizResults(formattedData)
      setSubmissionResult(result)
      // After successful submission, show the results
      setIsComplete(true)
    } catch (error) {
      console.error("Failed to submit to Google Sheets:", error)
      setError("Failed to submit online. Please try again.")
      setSubmissionResult({
        success: false,
        message: "Failed to submit responses. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }, [answers, determineArchetype])

  // Values to be provided to the context
  const value = {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswers,
    isComplete,
    setIsComplete,
    isLoading,
    setIsLoading,
    handleNextQuestion,
    handlePreviousQuestion,
    handleAnswer,
    getProgress,
    isNextButtonDisabled,
    determineArchetype,
    archetype,
    error,
    setError,
    handleSubmit,
    submissionResult,
    setSubmissionResult,
    soundEnabled,
    toggleSound,
  }

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export const useQuiz = () => {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider")
  }
  return context
}
