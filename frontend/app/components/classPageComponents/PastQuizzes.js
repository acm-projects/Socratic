"use client"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

function ScoreBadge({ score }) {
  const passing = score >= 70
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-xl ${
      passing
        ? "bg-green-100 text-green-700"
        : "bg-yellow-100 text-yellow-600"
    }`}>
      {score}%
    </span>
  )
}

export default function PastQuizzes({ topics, onRetake, onReview }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    if (!session?.user?.id) return
    if (!topics || topics.length === 0) return
    fetch(`/backend/users/${session.user.id}/quizzes`)
      .then(res => res.json())
      .then(data => {
        console.log("raw quizzes:", data)
        const formatted = data
          .filter(q => topics.some(t => t.id === q.topic_id))
          .map(q => ({
            id: q.id,
            topic_id: q.topic_id,
            name: topics.find(t => t.id === q.topic_id)?.name || "Unknown",
            score: q.score,
            date: new Date(q.date).toLocaleDateString(),
            retake_count: q.retake_count,
          }))
        setQuizzes(formatted)
      })
      .catch(err => console.error(err))
  }, [session, topics.length])

  return (
    <div className="flex flex-col gap-2 h-full">
      {quizzes.map((quiz, i) => (
        <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2 shrink-0">

          {/* Name, date, progress bar */}
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-sm font-medium text-[#14153A]">{quiz.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{quiz.date}</p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${quiz.score}%`,
                  background: quiz.score >= 70
                    ? `linear-gradient(to right, #10b98199, #10b981)`
                    : `linear-gradient(to right, #fbbf2499, #fbbf24)`,
                }}
              />
            </div>
          </div>

          {/* Score + Buttons */}
          <ScoreBadge score={quiz.score} />
          <div className="flex gap-2">
            <button
              onClick={() => onRetake(quiz.id)}
              className="text-xs font-medium text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
              Retake
            </button>
            <button
              onClick={() => onReview(quiz.id)}
              className="text-xs font-bold text-white bg-[#3a9e94] px-3 py-1 rounded-lg hover:bg-[#2d766f]">
              Review
            </button>
          </div>

        </div>
      ))}
    </div>
  )
}