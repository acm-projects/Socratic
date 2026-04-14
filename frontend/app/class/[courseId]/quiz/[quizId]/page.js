"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"






 
const QUIZ_SELECTION = {
  questionAmount: 3,
  difficulty: ["easy", "medium", "hard"],
}


const LETTERS = ["A", "B", "C", "D"]


export default function Page() {

    // add these with your other state
const searchParams = useSearchParams()
const isReviewMode = searchParams.get("mode") === "review"
const attemptId = searchParams.get("attemptId")


const { quizId, courseId } = useParams()
const [quizQuestions, setQuizQuestions] = useState([])
const [retakeCount, setRetakeCount] = useState(0)





 
  const [current, setCurrent] = useState(0) //which question you are currently on
  const [reviewIndex, setReviewIndex] = useState(0) //which question you are currently reviewing
  const [selected, setSelected] = useState(null)
  const [userAnswers, setUserAnswers] = useState([]) //store answers for review
  const [scores, setScores] = useState([])
  const [finished, setFinished] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  const [topicId, setTopicId] = useState(null)  // add this




// fetch quiz data
  useEffect(() => {
    if (isReviewMode) return  // add this line

console.log("quizId:", quizId)
  async function fetchQuiz() {
    const res = await fetch(`/backend/quizzes/${quizId}/questions`)
    const data = await res.json()
    console.log("full quiz data:", data)  // check if topic_id is on data
    setQuizQuestions(data.questions)
    setTopicId(data.topic_id)  // grab it from the quiz object
    setRetakeCount(data.retake_count ?? 0)


  }

  if (quizId) fetchQuiz()
}, [quizId])

 

  // add this useEffect after your existing one
useEffect(() => {
  if (!isReviewMode || !attemptId) return

  async function fetchAttempt() {
    const res = await fetch(`/backend/quizzes/${attemptId}/questions`)
    const data = await res.json()
    console.log("attempt questions:", data.questions)
    setQuizQuestions(data.questions)
    // populate userAnswers and scores from stored data
    setUserAnswers(data.questions.map(q => q.user_answer))
    setScores(data.questions.map(q => q.is_correct))
    setFinished(true)  // directly go to review screen
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
        const isCorrect = selected === quizQuestions[current]?.correct_answer
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

async function handleFinish() {
    const updated = [...userAnswers]
    updated[current] = selected
    setUserAnswers(updated)
    
    const updatedScores = [...scores]
    updatedScores[current] = (selected === quizQuestions[current]?.correct_answer)
    setScores(updatedScores)

    const numCorrect = updatedScores.filter(Boolean).length
    const score = Math.round((numCorrect / quizQuestions.length) * 100)

    // save completed attempt
    await fetch(`/backend/quizzes/${quizId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            score: score,
            retake_count: retakeCount + 1,
            questions: quizQuestions.map((q, i) => ({
                id: q.id,
                user_answer: updated[i] ?? null,
                is_correct: updatedScores[i] ?? false,

            }))
        })
    })

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
            <main className="min-h-screen bg-[#F5F6FA] flex">
            <div className="flex flex-col flex-1 pl-16">
                {/* header */}
               <div className="px-8 py-6 bg-[#F5F6FA]">
                <h1 className="text-2xl font-bold text-[#14153A]">
                    Discrete Math{" "}
                    <span className="text-gray-300 font-normal">—</span>{" "}
                    <span className="text-gray-400 font-semibold">{QUIZ_SELECTION.topic}</span>
                </h1>
                </div>
                
                <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto px-20 py-2">
 
                {/* progress */}
                <p className="text-md font-semibold text-[#3D5C9B] mb-8">
                    QUESTION {reviewIndex + 1} OF {quizQuestions.length}
                </p>
 
                {/* progress bar */}
                <div className="h-1.5 w-full bg-white rounded-full overflow-hidden mb-6">
                    <div
                    className="h-full rounded-full bg-gradient-to-r from-green-300 to-teal-300 transition-all duration-500 ease-in-out"
                    style={{ width: `${((reviewIndex + 1) / quizQuestions.length) * 100}%` }}
                    />
                </div>
 
                {/* question card */}
                <div className="bg-white rounded-2xl px-32 py-24 mb-6">
                    <p className="text-3xl text-center font-bold text-gray-900">
                    {currentQuestion.question}
                    </p>
                </div>
 
                {/* answer choices */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                {currentQuestion.options?.map((choice, i) => (
                    <div
                    key={choice}
                    className={`flex items-center gap-4 rounded-2xl px-6 py-6 text-sm font-medium border-2 ${
                        choice === currentQuestion.correct_answer
                        ? "border-green-400 bg-green-50 text-green-600"
                        : choice === userAnswer && !isCorrect
                        ? "border-red-400 bg-red-50 text-red-500"
                        : "border-gray-100 bg-white text-gray-400"
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
                <div className="bg-white rounded-2xl px-8 py-6 mb-8">
                    <p className="text-sm font-bold text-[#728AB7] mb-2">
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
                        className="px-8 py-2.5 rounded-xl text-sm font-medium transition-all bg-[#3D5C9B] text-white hover:bg-[#2e4a80]"
                    >
                        {reviewIndex === quizQuestions.length - 1 ? "Exit" : "Next"}
                    </button>
                </div>
 
                </div>
            </div>
            </main>
        )
    }

  //actual quiz (not review)
  return (

    <main className="min-h-screen bg-[#F5F6FA] flex">
      <div className="flex flex-col flex-1 pl-16">

        {/* header */}
        <div className="px-8 py-6 bg-[#F5F6FA]">
        <h1 className="text-2xl font-bold text-[#14153A]">
            Discrete Math{" "}
            <span className="text-gray-300 font-normal">—</span>{" "}
            <span className="text-gray-400 font-semibold">Trees</span>
        </h1>
        </div>

        {/* body */}
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto px-6 py-24">

          {/* progress */}
          <p className="text-md font-semibold text-[#3D5C9B] mb-8">
            QUESTION {current + 1} OF {quizQuestions.length}
          </p>

          {/* progress bar */}
        <div className="h-1.5 w-full bg-white rounded-full overflow-hidden mb-6"> 
        <div
            className="h-full  rounded-full bg-gradient-to-r from-green-300 to-teal-300 transition-all duration-500 ease-in-out"
            style={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }}
        />
        </div>

          {/* question card */}
          <div className="bg-white rounded-2xl px-32 py-24 mb-6">
            <p className="text-3xl text-center font-bold text-gray-900">
              {quizQuestions[current]?.question}
            </p>
          </div>

          {/* answer choices */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {quizQuestions[current]?.options?.map((choice, i) => (
              <button
                key={choice}
                onClick={() => handleSelect(choice)}
                className={`flex items-center gap-4 rounded-2xl px-6 py-6 text-sm text-left font-medium transition-all duration-200 ease-in-out ${
                  selected === choice
                    ? "border-2 border-[#3D5C9B] bg-white text-[#3D5C9B]"
                    : "border border-gray-100 bg-white text-gray-800 hover:border-[#3D5C9B] hover:text-[#3D5C9B]"
                }`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  selected === choice
                    ? "bg-[#D9E5FD] text-[#3D5C9B]"
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
              onClick={current === quizQuestions.length - 1 ? handleFinish : handleNext} //either next or finish if last question
              disabled={!selected}
              className={`px-8 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selected
                  ? "bg-[#3D5C9B] text-white hover:bg-[#2e4a80]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {current === quizQuestions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}