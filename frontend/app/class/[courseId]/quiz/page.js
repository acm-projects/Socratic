"use client"
import Navbar from "../components/Navbar"
import AnchoredHeader from "../components/AnchoredHeader"
import { useState } from "react"
import { useRouter } from "next/navigation"

const QUESTIONS = [
  {
    id: 1,
    difficulty: "easy",
    question: "What organelle is known as the powerhouse of the cell?",
    choices: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
    answer: "Mitochondria",
    explanation: "Mitochondria produce ATP through cellular respiration, which is the cell's main energy source.",
  },
  {
    id: 2,
    difficulty: "medium",
    question: "What is the primary function of the cell membrane?",
    choices: [
      "Produce energy",
      "Control what enters and exits the cell",
      "Store genetic information",
      "Synthesize proteins",
    ],
    answer: "Control what enters and exits the cell",
    explanation: "The cell membrane is selectively permeable, meaning it controls which substances pass in and out of the cell.",
  },
  {
    id: 3,
    difficulty: "hard",
    question: "Which step of the Calvin Cycle directly produces G3P?",
    choices: ["Carbon fixation", "Reduction", "Regeneration of RuBP", "Oxidation"],
    answer: "Reduction",
    explanation: "During the reduction stage, ATP and NADPH are used to convert 3-PGA into G3P.",
  },
]

const QUIZ_SELECTION = {
  questionAmount: 3,
  difficulty: ["easy", "medium", "hard"],
}

const LETTERS = ["A", "B", "C", "D"]


export default function Page() {
  const quizQuestions = QUESTIONS
    .filter(q => QUIZ_SELECTION.difficulty.includes(q.difficulty))
    .slice(0, QUIZ_SELECTION.questionAmount)

  const [current, setCurrent] = useState(0) //which question you are currently on
  const [reviewIndex, setReviewIndex] = useState(0) //which question you are currently reviewing
  const [selected, setSelected] = useState(null)
  const [userAnswers, setUserAnswers] = useState([]) //store answers for review
  const [scores, setScores] = useState([])
  const [finished, setFinished] = useState(false)
  const router = useRouter()

  function handleSelect(choice) {
    setSelected(choice)
  }

    function handleNext() {
        setUserAnswers(a => [...a, selected]) //add selected answers to saved answers array
        const isCorrect = (selected === quizQuestions[current].answer) //checks if chosen answer matches correct option
        setScores(s => [...s, isCorrect]) //add true or false to scores array

        if (current < quizQuestions.length - 1) {
        setCurrent(current + 1)
        setSelected(null)
        }
    }

    function handleBack() {
        if (current > 0) {
        setCurrent(current - 1)
        setSelected(null)
        }
    }

    function handleFinish() {
        setUserAnswers(a => [...a, selected])
        const isCorrect = (selected === quizQuestions[current].answer) // check last question
        setScores(s => [...s, isCorrect])
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
        const currentQuestion = quizQuestions[reviewIndex]
        const userAnswer = userAnswers[reviewIndex]
        const isCorrect = scores[reviewIndex]
 
        return (
            <main className="min-h-screen bg-[#F5F6FA] flex">
            <div className="flex flex-col flex-1">
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
                {currentQuestion.choices.map((choice, i) => (
                    <div
                    key={choice}
                    className={`flex items-center gap-4 rounded-2xl px-6 py-6 text-sm font-medium border-2 ${
                        choice === currentQuestion.answer
                        ? "border-green-400 bg-green-50 text-green-600"
                        : choice === userAnswer && !isCorrect
                        ? "border-red-400 bg-red-50 text-red-500"
                        : "border-gray-100 bg-white text-gray-400"
                    }`}
                    >
                    {/* letter choice */}
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        choice === currentQuestion.answer
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
 
                    {/* change to router.push(`/class/${courseId}`) */}
                    <button
                        onClick={reviewIndex === quizQuestions.length - 1 ? () => router.push("/class/2340") : handleReviewNext}
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
      <div className="flex flex-col flex-1">

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
              {quizQuestions[current].question}
            </p>
          </div>

          {/* answer choices */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {quizQuestions[current].choices.map((choice, i) => (
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
