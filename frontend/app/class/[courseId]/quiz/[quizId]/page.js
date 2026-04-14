"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { Flame, ChevronLeft, Clock, User, ChevronRight } from 'lucide-react'
import Link from "next/link"

const QUIZ_SELECTION = {
  questionAmount: 3,
  difficulty: ["easy", "medium", "hard"],
  topic: "Trees"
}

const LETTERS = ["A", "B", "C", "D"]

export default function Page() {
  // add these with your other state
  const searchParams = useSearchParams()
  const isReviewMode = searchParams.get("mode") === "review"
  const attemptId = searchParams.get("attemptId")

  const { quizId, courseId } = useParams()
  const [quizQuestions, setQuizQuestions] = useState([])
  const className = "Discrete Math"//replace with fetch 
 
  const [current, setCurrent] = useState(0) //which question you are currently on
  const [reviewIndex, setReviewIndex] = useState(0) //which question you are currently reviewing
  const [selected, setSelected] = useState(null)
  const [userAnswers, setUserAnswers] = useState([]) //store answers for review
  const [scores, setScores] = useState([])
  const [finished, setFinished] = useState(false)
  const router = useRouter()

  // fetch quiz data
  useEffect(() => {
    console.log("quizId:", quizId)
    async function fetchQuiz() {
      const res = await fetch(`/backend/quizzes/${quizId}/questions`)
      const data = await res.json()
      setQuizQuestions(data.questions)
    }

    if (quizId) fetchQuiz()
  }, [quizId])

  // add this useEffect after your existing one
  useEffect(() => {
    if (!isReviewMode || !attemptId) return

    async function fetchAttempt() {
      const res = await fetch(`/backend/quizzes/${attemptId}/questions`)
      const data = await res.json()
      setQuizQuestions(data.questions)
      setFinished(true) // jump straight to review UI
    }

    fetchAttempt()
  }, [isReviewMode, attemptId])

  // loading guard
  if (!quizQuestions || !quizQuestions.length) {
    return <div className="p-10">Loading...</div>
  }

  function handleSelect(choice) {
    setSelected(choice)
  }

  function handleNext() {
    const updated = [...userAnswers]
    updated[current] = selected
    setUserAnswers(updated)
    const isCorrect = selected === quizQuestions[current]?.answer
    const updatedScores = [...scores]
    updatedScores[current] = isCorrect
    setScores(updatedScores)

    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1)
      setSelected(userAnswers[current + 1] ?? null) // restore if revisiting
    }
  }

  function handleBack() {
    if (current > 0) {
      setCurrent(current - 1)
      setSelected(userAnswers[current - 1] ?? null) // restore previous answer
    }
  }

  function handleFinish() {
    const updated = [...userAnswers]
    updated[current] = selected
    setUserAnswers(updated)
    const updatedScores = [...scores]
    updatedScores[current] = (selected === quizQuestions[current]?.correct_answer)
    setScores(updatedScores)
    console.log("selected:", selected, "answer:", quizQuestions[current]?.correct_answer)
    console.log("question:", quizQuestions[current])

    setFinished(true)
  }

  function handleReviewNext() { //move to next question in review mode
    if (reviewIndex < quizQuestions.length - 1) {
      setReviewIndex(reviewIndex + 1)
    }
  }

  function handleReviewBack() { //navigate backward one question in review mode
    if (reviewIndex > 0) {
      setReviewIndex(reviewIndex - 1)
    }
  }

  if (finished) {
    const currentQuestion = quizQuestions[reviewIndex] ?? {}
    const userAnswer = userAnswers[reviewIndex]
    const isCorrect = scores[reviewIndex]
 
    return (
      <div
      className={`h-screen flex`}
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(240,245,244,0.7) 0%, rgba(245,248,247,0.7) 60%, rgba(247,245,251,0.7) 100%), url('/gridbackground.svg')",
        // backgroundImage: "linear-gradient(to right, rgba(234,244,242,0.85) 0%, rgba(245,248,247,0.45) 100%), url('/gridbackground.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
        }}
    >

        <div className="flex flex-col flex-1">
          {/* header */}
         <div className="px-8 py-6 grid grid-cols-3 items-center w-full">
          <div className="flex justify-start">
            <Link 
              href={`/class/${courseId}`} 
              className="flex items-center gap-1.5 px-4 h-12 rounded-full bg-white/90 hover:bg-white transition-all"
            >
              <ChevronLeft size={18} className="text-[#141f1d]" />
              <span className="text-sm font-semibold text-[#141f1d]">{className}</span>
            </Link>
          </div>
          
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {QUIZ_SELECTION.topic}
            </h1>
          </div>

          <div className="flex justify-end" /> {/* Spacer for grid alignment */}
        </div>
          
          <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto px-20 py-2">
            {/* progress */}
            <p className="text-md font-semibold text-[#3a9e94] mb-8">
              QUESTION {reviewIndex + 1} OF {quizQuestions.length}
            </p>
 
            {/* progress bar */}
            <div className="h-2 w-full bg-white rounded-full overflow-hidden mb-6">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-300 to-teal-300 transition-all duration-500 ease-in-out"
                style={{ width: `${((reviewIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
 
            {/* question card */}
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-16 py-12 mb-6">
              <p className="text-3xl text-center font-bold text-gray-900">
                {currentQuestion.question}
              </p>
            </div>
 
            {/* answer choices */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {currentQuestion.options?.map((choice, i) => (
                <div
                  key={choice}
                  className={`flex items-center gap-4 rounded-2xl px-6 py-4 text-sm font-medium border-2 ${
                    choice === currentQuestion.correct_answer
                      ? "border-green-400 bg-green-50 text-green-600"
                      : choice === userAnswer && !isCorrect
                      ? "border-red-400 bg-red-50 text-red-500"
                      : "border-gray-100 bg-white/65 backdrop-blur-sm text-gray-400"
                  }`}
                >
                  {/* letter choice */}
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    choice === currentQuestion.correct_answer
                      ? "bg-green-100 text-green-500"
                      : choice === userAnswer && !isCorrect
                      ? "bg-red-100 text-red-400"
                      : "bg-gray-100 text-gray-400"
                  }`}>
                    {LETTERS[i]}
                  </span>
                  {choice}
                </div>
              ))}
            </div>
 
            {/* explanation */}
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-8 py-6 mb-8">
              <p className="text-sm font-bold text-[#3a9e94] mb-2">
                EXPLANATION
              </p>
              <p className="text-sm font-medium text-gray-600">
                {currentQuestion.explanation}
              </p>
            </div>
 
            {/* back and next/exit buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleReviewBack}
                disabled={reviewIndex === 0}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  reviewIndex === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Back
              </button>
 
              <button
                onClick={reviewIndex === quizQuestions.length - 1 ? () => router.push(`/class/${courseId}`) : handleReviewNext}
                className="px-8 py-2.5 rounded-xl text-sm font-semibold transition-all bg-[#3a9e94] text-white hover:bg-[#2c7a72]"
              >
                {reviewIndex === quizQuestions.length - 1 ? "Exit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //actual quiz (not review)
  return (
    <div
      className={`h-screen flex`}
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(240,245,244,0.7) 0%, rgba(245,248,247,0.7) 60%, rgba(247,245,251,0.7) 100%), url('/gridbackground.svg')",
        // backgroundImage: "linear-gradient(to right, rgba(234,244,242,0.85) 0%, rgba(245,248,247,0.45) 100%), url('/gridbackground.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
        }}
    >

      <div className="flex flex-col flex-1">
        {/* header */}
       <div className="px-8 py-6 grid grid-cols-3 items-center w-full">
          <div className="flex justify-start">
            <Link 
              href={`/class/${courseId}`} 
              className="flex items-center gap-1.5 px-4 h-12 rounded-full bg-white/90 hover:bg-white transition-all"
            >
              <ChevronLeft size={18} className="text-[#141f1d]" />
              <span className="text-sm font-semibold text-[#141f1d]">{className}</span>
            </Link>
          </div>
          
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {QUIZ_SELECTION.topic}
            </h1>
          </div>

          <div className="flex justify-end" /> {/* Spacer for grid alignment */}
        </div>

        {/* body */}
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto px-6 py-24">
          {/* progress */}
          <p className="text-md font-semibold text-[#3a9e94] mb-8">
            QUESTION {current + 1} OF {quizQuestions.length}
          </p>

          {/* progress bar */}
          <div className="h-2 w-full bg-white rounded-full overflow-hidden mb-6"> 
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-300 to-teal-300 transition-all duration-500 ease-in-out"
              style={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          {/* question card */}
          <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-16 py-12 mb-8 mt-4">
            <p className="text-3xl text-center font-bold text-gray-900">
              {quizQuestions[current]?.question}
            </p>
          </div>

          {/* answer choices */}
          <div className="grid grid-cols-2 gap-4 mb-8 auto-rows-fr">
            {quizQuestions[current]?.options?.map((choice, i) => (
              <button
                key={choice}
                onClick={() => handleSelect(choice)}
                className={`flex items-center gap-4 rounded-2xl px-6 py-4 text-sm text-left font-medium transition-all duration-200 ease-in-out h-full min-h-16 ${
                  selected === choice
                    ? "border-2 border-[#3a9e94] bg-white/90 text-[#3a9e94]"
                    : "border border-gray-100 bg-white/65 backdrop-blur-sm text-gray-800 hover:border-[#3a9e94] hover:text-[#3a9e94]"
                }`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  selected === choice
                    ? "bg-[#D0E8E4] text-[#3a9e94]"
                    : "bg-gray-100 text-gray-400"
                }`}>
                  {LETTERS[i]}
                </span>
                {choice}
              </button>
            ))}
          </div>

          {/* back and next buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={current === 0}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                current === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Back
            </button>

            <button
              onClick={current === quizQuestions.length - 1 ? handleFinish : handleNext} 
              disabled={!selected}
              className={`px-8 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selected
                  ? "bg-[#3a9e94] text-white hover:bg-[#2c7a72]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {current === quizQuestions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}