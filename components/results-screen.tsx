"use client"

import { useQuiz } from "./quiz-provider"
import { archetypes, type ArchetypeKey } from "@/data/quiz-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { saveResponsesToFile } from "@/lib/save-responses"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ConfettiAnimation from "./confetti-animation"

export default function ResultsScreen() {
  const { answers, submissionResult, error } = useQuiz()

  // Determine the archetype once
  const archetypeKey = (answers.archetype as ArchetypeKey) || "explorer"
  const archetype = archetypes[archetypeKey]

  // Get participant name for personalization
  const participantName = answers.participant_name || ""

  // Handle local save
  const handleLocalSave = () => {
    saveResponsesToFile(answers)
  }

  // Generate a personalized summary based on answers
  const generateSummary = () => {
    const emotion = answers.ai_primary_emotion || "curious"
    const outlook = answers.ai_future_outlook || "both"
    const trustScore = answers.ai_trust_score || 3
    const biggestHope = answers.ai_biggest_hope || "efficiency"
    const name = participantName || "there"

    let summary = `Hi ${name}! Based on your responses, you approach AI with a ${emotion} mindset and see it primarily as ${outlook === "threat" ? "a potential challenge" : outlook === "opportunity" ? "an exciting opportunity" : "having both opportunities and challenges"}.`

    summary += ` Your trust level in AI tools is ${trustScore < 3 ? "cautious" : trustScore > 3 ? "fairly strong" : "balanced"}, and you're most excited about AI's potential for ${biggestHope}.`

    return summary
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <ConfettiAnimation />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold gradient-text mb-4">
          {participantName ? `${participantName}'s AI Leadership Profile` : "Your AI Leadership Profile"}
        </h2>
        <p className="text-xl text-gray-700">
          Thank you for completing the assessment! Here's your personalized AI leadership insights.
        </p>
      </motion.div>

      {/* Submission result alert */}
      {submissionResult && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Alert variant={submissionResult.success ? "default" : "destructive"}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{submissionResult.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>
              {submissionResult.success
                ? "Your responses have been submitted successfully. Thank you for completing the survey!"
                : submissionResult.message}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Error message */}
      {error && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <Card className="shadow-lg border-t-4" style={{ borderTopColor: archetype.color }}>
          <CardHeader>
            <CardTitle className="text-3xl">{`The ${archetype.name}`}</CardTitle>
            <CardDescription className="text-xl">Your AI Leadership Archetype</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">{archetype.description}</p>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Your Strengths</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {archetype.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Growth Areas</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {archetype.growthAreas.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Recommendations</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {archetype.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Personalized Profile Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{generateSummary()}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mb-6"
      >
        <Button
          onClick={handleLocalSave}
          variant="outline"
          className="px-6 py-5 text-lg transition-all hover:scale-105"
        >
          Save Results Locally
        </Button>

        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
          className="px-6 py-5 text-lg transition-all hover:scale-105"
        >
          Start Over
        </Button>
      </motion.div>
    </div>
  )
}
