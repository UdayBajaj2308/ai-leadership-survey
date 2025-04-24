"use client"

import type React from "react"

import { useState } from "react"
import { useQuiz } from "./quiz-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function WelcomeScreen() {
  const { handleNextQuestion, handleAnswer } = useQuiz()
  const [name, setName] = useState("")

  // Handle name change without using useEffect
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)

    // Only update the answer when name is not empty
    if (newName.trim()) {
      handleAnswer("participant_name", newName.trim())
    }
  }

  // Handle button click
  const handleBeginClick = () => {
    if (name.trim()) {
      handleNextQuestion()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          className="w-40 h-40 mx-auto mb-6"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <RobotAnimation />
        </motion.div>
      </motion.div>

      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Discover Your AI Leadership Archetype
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Explore your understanding, engagement, and strategic thinking around AI in this interactive experience.
      </motion.p>

      <motion.div
        className="w-full max-w-md mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <label htmlFor="name" className="block text-left text-gray-700 font-medium mb-2">
          What&apos;s your first name?
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your first name"
          className="w-full p-3 text-lg"
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Button
          onClick={handleBeginClick}
          disabled={!name.trim()}
          className={`px-8 py-6 text-lg transition-all duration-300 ${
            name.trim() ? "opacity-100 hover:scale-105" : "opacity-70"
          }`}
        >
          Begin Your Journey
        </Button>
      </motion.div>
    </div>
  )
}

function RobotAnimation() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Robot head */}
      <rect x="50" y="30" width="100" height="80" rx="10" fill="#00205B" />

      {/* Robot eyes */}
      <circle cx="80" cy="60" r="12" fill="#6CDBD6">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy="60" r="12" fill="#6CDBD6">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Robot mouth */}
      <rect x="75" y="85" width="50" height="10" rx="5" fill="#6CDBD6">
        <animate attributeName="width" values="50;40;50" dur="4s" repeatCount="indefinite" />
      </rect>

      {/* Robot antenna */}
      <rect x="95" y="15" width="10" height="15" fill="#00205B" />
      <circle cx="100" cy="10" r="6" fill="#6CDBD6">
        <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Robot body */}
      <rect x="65" y="110" width="70" height="60" rx="5" fill="#00205B" />

      {/* Robot buttons */}
      <circle cx="85" cy="130" r="5" fill="#FFD166" />
      <circle cx="100" cy="130" r="5" fill="#6CDBD6" />
      <circle cx="115" cy="130" r="5" fill="#FFD166" />

      {/* Robot arms */}
      <rect x="30" y="120" width="35" height="10" rx="5" fill="#00205B" />
      <rect x="135" y="120" width="35" height="10" rx="5" fill="#00205B" />

      {/* Robot hands */}
      <circle cx="30" cy="125" r="8" fill="#6CDBD6" />
      <circle cx="170" cy="125" r="8" fill="#6CDBD6" />

      {/* Robot legs */}
      <rect x="75" y="170" width="15" height="25" rx="5" fill="#00205B" />
      <rect x="110" y="170" width="15" height="25" rx="5" fill="#00205B" />

      {/* Robot feet */}
      <rect x="70" y="190" width="25" height="8" rx="4" fill="#6CDBD6" />
      <rect x="105" y="190" width="25" height="8" rx="4" fill="#6CDBD6" />
    </svg>
  )
}
