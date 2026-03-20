"use client"
import Navbar from "../components/Navbar"
import AnchoredHeader from "../components/AnchoredHeader"
import { useState } from "react"

const QUESTIONS = [
  {
    id: 1,
    difficulty: "easy",
    question: "What organelle is known as the powerhouse of the cell?",
    choices: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
    answer: "Mitochondria",
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
  },
  {
    id: 3,
    difficulty: "hard",
    question: "Which step of the Calvin Cycle directly produces G3P?",
    choices: ["Carbon fixation", "Reduction", "Regeneration of RuBP", "Oxidation"],
    answer: "Reduction",
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

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)

  function handleSelect(choice) {
    setSelected(choice)
  }

  function handleNext() {
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

  return (
    <main className="min-h-screen bg-[#F5F6FA] flex">
      <Navbar />
      <div className="flex flex-col flex-1 pl-16">
        <AnchoredHeader title="Discrete Math" showPlus={false} />

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
              onClick={handleNext}
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

// const QUESTIONS = [
//   {
//     question: "What is the last step of photosynthesis?",
//     choices: [
//       "RuBP is regenerated in the Calvin Cycle",
//       "Water is split to release oxygen",
//       "Light energy is absorbed by chlorophyll",
//       "Carbon dioxide is converted into G3P",
//     ],
//   },
//   {
//     question: "Which organelle is known as the powerhouse of the cell?",
//     choices: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
//   },
//   {
//     question: "What is the primary function of the cell membrane?",
//     choices: [
//       "Produce energy",
//       "Control what enters and exits the cell",
//       "Store genetic information",
//       "Synthesize proteins",
//     ],
//   },
//   {
//     question: "Which process converts glucose into ATP without oxygen?",
//     choices: ["Photosynthesis", "Aerobic respiration", "Glycolysis", "Fermentation"],
//   },
//   {
//     question: "What molecule carries genetic information in the cell?",
//     choices: ["ATP", "DNA", "mRNA", "Protein"],
//   },
// ]

// export default function Page() {
//   const [current, setCurrent] = useState(0)
//   const [selected, setSelected] = useState(null)

//   const totalQuestions = QUESTIONS.length
//   const progressVal = (current / totalQuestions) * 100

//   const handleNext = () => {
//     if (current < totalQuestions - 1) {
//       setCurrent((c) => c + 1)
//       setSelected(null)
//     }
//   }

//   return (
//     <main className="min-h-screen bg-[#F5F6FA] flex">
//       <Navbar />
//       <div className="flex flex-col flex-1 pl-32 pr-6 pt-8">
//         <Header title="Discrete Math" showPlus={false} />

//         <div className="flex flex-col flex-1 mx-8 mt-8 pb-8">
//           <div className="bg-white rounded-2xl p-12 flex flex-col max-w-3xl w-full mx-auto">

//             {/* unit label */}
//             <p className="text-gray-700 font-semibold text-lg text-center mb-10">Unit 1: Cells</p>

//             {/* question card */}
//             <div className="border border-gray-200 rounded-2xl px-5 py-5 mb-8">
//               <p className="text-[#3D5C9B] font-semibold text-md mb-5">
//                 {current + 1}/{totalQuestions}
//               </p>
//               <p className="text-2xl font-semibold text-gray-900 text-center leading-snug px-10 py-10">
//                 {QUESTIONS[current].question}
//               </p>
//             </div>

//             {/* answer choices */}
//             <div className="grid grid-cols-2 gap-4 mb-10">
//               {QUESTIONS[current].choices.map((choice) => (
//                 <button
//                   key={choice}
//                   onClick={() => setSelected(choice)}
//                   className={`border rounded-2xl px-6 py-6 text-sm text-gray-700 text-center transition-colors ${
//                     selected === choice
//                       ? "border-[#3D5C9B] bg-blue-50 text-[#3D5C9B] font-medium"
//                       : "border-gray-200 hover:border-[#3D5C9B] hover:bg-blue-50"
//                   }`}
//                 >
//                   {choice}
//                 </button>
//               ))}
//             </div>

//             {/* progress bar */}
//             <div className="h-2 rounded-full bg-gray-200 overflow-hidden mb-8">
//               <div
//                 className="h-full rounded-full bg-linear-to-r from-green-400 to-teal-400 transition-all duration-500"
//                 style={{ width: `${progressVal}%` }}
//               />
//             </div>

//             {/* next button */}
//             <div className="flex justify-end">
//               <button
//                 onClick={handleNext}
//                 disabled={!selected}
//                 className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all ${
//                   selected
//                     ? "bg-[#3D5C9B] text-white hover:bg-[#2f4a80]"
//                     : "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 {current === totalQuestions - 1 ? "Finish" : "Next"}
//               </button>
//             </div>

//           </div>
//         </div>

//       </div>
//     </main>
//   )
// }