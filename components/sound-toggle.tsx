"use client"

import { useQuiz } from "./quiz-provider"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import { motion } from "framer-motion"

export default function SoundToggle({ className = "" }: { className?: string }) {
  const { soundEnabled, toggleSound } = useQuiz()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSound}
        className="bg-white/80 backdrop-blur-sm hover:bg-white"
        aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
      >
        {soundEnabled ? <Volume2 className="h-5 w-5 text-navy" /> : <VolumeX className="h-5 w-5 text-navy" />}
      </Button>
    </motion.div>
  )
}
