"use client"
import { useState } from "react"
import { X, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function QuizModal({ onClose, courseId }) {
  const router = useRouter()  
  const { data: session } = useSession()

  const [topic, setTopic] = useState("")
  const [topics, setTopics] = useState([]) 

  const [questions, setQuestions] = useState(10)
  const [timer, setTimer] = useState("0h 15m")
  const [easy, setEasy] = useState(true)
  const [medium, setMedium] = useState(true)
  const [hard, setHard] = useState(true)

    // fetch topics
    useEffect(() => {
        if (!courseId) return
        fetch(`/backend/classes/${courseId}/topics`)
            .then(res => res.json())
            .then(data => {
              const topicsArray = Array.isArray(data) ? data : data.topics ?? []
              setTopics(topicsArray)
              if (topicsArray.length > 0) setTopic(topicsArray[0].name)
            })
            .catch(err => console.error(err))
    }, [courseId])



//   async function handleStartQuiz() {
//       console.log("handleStartQuiz called", { session: session?.user?.id, topic, courseId })

//     if (!session?.user?.id) return
//     if (!topic) return

//     const difficulty = []
//     if (easy) difficulty.push("easy")
//     if (medium) difficulty.push("medium")
//     if (hard) difficulty.push("hard") 
    
//     const res = await fetch("/backend/api/quizzes/generate",
//        {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({  
//         classCode: courseId,
//         topic: topic,
//         numQuestions: questions,
//         easy: easy,
//         medium: medium,
//         hard: hard, 
//         userId : session.user.id

//       })
//     })

//     const quizData = await res.json()
//     console.log("quiz:", quizData)
//     const quizId = quizData.quizId
//     onClose()
//     router.push(`/class/${courseId}/quiz/${quizId}`)
// }

async function handleStartQuiz() {
try {
    const res = await fetch("/backend/api/quizzes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  
            classCode: courseId,
            topic: topic,
            numQuestions: questions,
            easy: easy,
            medium: medium,
            hard: hard, 
            userId: session.user.id
        })
    })
    const quizData = await res.json()
    console.log("quiz:", quizData)
    const quizId = quizData.quizId
    onClose()
    router.push(`/class/${courseId}/quiz/${quizId}`)
} catch (err) {
    console.error("Quiz error:", err)
}
}





  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl px-10 py-8 w-[520px] flex flex-col gap-8">

        {/* Header */}
        <div className="flex items-center justify-center relative pt-2">
          <h2 className="text-xl font-bold text-gray-900">Quiz</h2>
          <X
            size={26}
            className="text-gray-400 cursor-pointer absolute right-0"
            onClick={onClose}
          />
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-7">

          {/* Topic */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-800">Topic</label>
            <div className="relative w-52">
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-600 appearance-none cursor-pointer pr-10"
              >
                {topics.map((t) => (
                <option key={t.id} value={t.name}>{t.name}</option>
            ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Questions*/}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-800">Questions</label>
            <div className="flex items-center border border-gray-100 rounded-xl bg-gray-50 w-52 px-4 py-3">
              <span className="flex-1 text-sm text-gray-500">{questions}</span>
              <div className="flex flex-col items-center gap-0.5">
                <button
                  onClick={() => setQuestions(q => q + 1)}
                  className="text-gray-400 hover:text-gray-600 leading-none"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  onClick={() => setQuestions(q => Math.max(1, q - 1))} //doesn't go below one question
                  className="text-gray-400 hover:text-gray-600 leading-none"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Timer */}
          {/* <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-800">Timer (Optional)</label>
            <div className="flex items-center border border-gray-100 rounded-xl bg-gray-50 w-52 px-4 py-3 gap-2">
              <input
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
                className="flex-1 text-sm text-gray-400 bg-transparent outline-none"
                placeholder="0h 15m"
              />
              <Clock size={15} className="text-gray-400 shrink-0" />
            </div>
          </div> */}

        </div>

        {/* Question Type */}
        <div className="flex flex-col gap-5">
          <p className="text-md font-bold text-center text-gray-900">Question Type</p>

          {[
            { label: "Easy",   state: easy,   set: setEasy },
            { label: "Medium", state: medium, set: setMedium },
            { label: "Hard",   state: hard,   set: setHard },
          ].map(({ label, state, set }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-800">{label}</span>

              <div
                onClick={() => set(s => !s)}
                className={`w-10 h-[22px] rounded-full cursor-pointer flex items-center px-0.5 transition-colors duration-200 ${state ? "bg-[#347A73]" : "bg-gray-300"}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${state ? "translate-x-[18px]" : "translate-x-0"}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <button
            onClick={handleStartQuiz}
            className="self-center bg-[#347A73] hover:bg-[#1F5C57] text-white text-lg font-medium px-32 py-2 rounded-2xl transition-colors">
            Start Quiz
        </button>

      </div>
    </div>
  )
}