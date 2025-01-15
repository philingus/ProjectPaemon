'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const questions = [
  {
    question: "Which of these best describes your ideal day?",
    options: [
      "Exploring a lush forest full of secrets",
      "Relaxing by the ocean with a cool breeze",
      "Competing in a high-stakes tournament",
      "Sharing laughs and stories with friends",
      "Masterminding a brilliant plan"
    ]
  },
  {
    question: "If you had a special ability, what would it be?",
    options: [
      "Control nature and grow plants",
      "Summon fire to light darkness",
      "Swim and talk to sea creatures",
      "Fly and explore new horizons",
      "Shape-shift and blend in"
    ]
  },
  {
    question: "What snack would you pick at a Pokémon Center café?",
    options: [
      "A hearty berry salad with honey",
      "A spicy curry that warms you",
      "A refreshing seaweed roll",
      "A colorful mysterious parfait",
      "A loaded sandwich with everything"
    ]
  },
  {
    question: "What's your favorite way to handle a challenge?",
    options: [
      "Work patiently and adapt",
      "Charge ahead with confidence",
      "Stay calm and think logically",
      "Rally your team together",
      "Outsmart it with strategy"
    ]
  },
  {
    question: "Where would you want to live in the Pokémon world?",
    options: [
      "A serene forest with tall trees",
      "A volcanic island with peaks",
      "A quiet seaside town",
      "A mysterious ancient cave",
      "A bustling energetic city"
    ]
  },
  {
    question: "What kind of Pokémon companion would you want?",
    options: [
      "A loyal nurturing healer",
      "A fiery courageous battler",
      "A sleek swift water specialist",
      "A wise strategic thinker",
      "A cheerful playful entertainer"
    ]
  }
]

export default function Questionnaire() {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''))
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const router = useRouter()

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem('pokemonAnswers', JSON.stringify({
      environment: answers[0],
      strength: answers[1],
      color: answers[2],
      personality: answers[3],
      activity: answers[4],
      element: answers[5]
    }))
    router.push('/generate')
  }

  const question = questions[currentQuestion]

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      {/* Background GIF */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/mnslf2y8hxab1 (1).gif"
          alt="Background Animation"
          fill
          className="object-cover opacity-30"
          priority
          unoptimized
        />
      </div>

      <div className="gba-container max-w-2xl w-full relative z-10">
        <div className="gba-screen">
          <div className="space-y-6">
            <div className="flex justify-between text-sm text-[#2D1B2E] mb-4 px-4">
              <span>Question {currentQuestion + 1}/6</span>
              <span>{Math.round((answers.filter(Boolean).length / questions.length) * 100)}%</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B2E] text-center mb-12 px-4 max-w-3xl mx-auto">
              {question.question}
            </h2>

            <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto px-4">
              {question.options.map((option, index) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`gba-button p-6 text-xl min-h-[5rem] text-center flex items-center justify-center
                    ${answers[currentQuestion] === option ? 'border-[#E0757C] bg-[#4A3B55]' : 'border-transparent hover:bg-[#3D2F45]'}
                    transition-all duration-200
                    ${index < 3 ? 'w-full md:w-[calc(33%-1rem)]' : 'w-full md:w-[calc(45%-1rem)]'}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>

            {answers.filter(Boolean).length === questions.length && (
              <button
                onClick={handleComplete}
                className="gba-button w-full mt-8 animate-hover"
              >
                Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
