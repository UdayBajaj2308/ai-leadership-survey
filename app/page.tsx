import { QuizProvider } from "@/components/quiz-provider"
import QuizContainer from "@/components/quiz-container"
import BackgroundAnimation from "@/components/background-animation"

export default function Home() {
  return (
    <main className="min-h-screen bg-light relative overflow-hidden">
      <BackgroundAnimation />
      <QuizProvider>
        <QuizContainer />
      </QuizProvider>
    </main>
  )
}
