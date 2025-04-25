'use client'

import React from 'react'
import { useQuiz } from '@/components/quiz-provider'
import WelcomeScreen from './welcome-screen'
import IntroScreen from './intro-screen'
import ProgressBar from './progress-bar'
import FeedbackMessage from './feedback-message'
import ResultsScreen from './results-screen'
import SentimentSummary from './sentiment-summary'
import BackgroundAnimation from './background-animation'
import ConfettiAnimation from './confetti-animation'
import SoundToggle from './sound-toggle'

const QuizContainer: React.FC = () => {
  const { step } = useQuiz()

  return (
    <>
      {/* always-on decorations */}
      <BackgroundAnimation />
      <SoundToggle />

      {/* your screens, one at a time */}
      {step === 'welcome'  && <WelcomeScreen />}
      {step === 'intro'    && <IntroScreen />}
      {step === 'quiz'     && (
        <>
          <ProgressBar />
          {/* if your actual question UI is in question-types/, import it here instead */}
        </>
      )}
      {step === 'feedback' && <FeedbackMessage />}
      {step === 'results'  && <ResultsScreen />}
      {step === 'sentiment'&& <SentimentSummary />}

      {/* confetti can fire on any step */}
      <ConfettiAnimation />
    </>
  )
}

export default QuizContainer
