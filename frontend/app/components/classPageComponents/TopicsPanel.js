"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import PastQuizzes from "./PastQuizzes"

export default function TopicsPanel({ onQuizClick }) {
  const { courseId } = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [view, setView] = useState("topics")
  const [Topics, setTopics] = useState([])
  const [quizData, setQuizData] = useState([])

  useEffect(() => {
    fetch(`/backend/classes/${courseId}/topics`)
      .then(res => res.json())
      .then(data => {
        console.log("topics:", data)
        setTopics(Array.isArray(data) ? data : data.topics ?? [])
      })
  }, [courseId])

  useEffect(() => {
    if (!session?.user?.id) return
    fetch(`/backend/api/quizzes/users/${session.user.id}`)
      .then(res => res.json())
      .then(data => setQuizData(data.filter(q => q.class_code === courseId)))
  }, [session, courseId])

  return (
    <>
      <div className="flex flex-col h-full">
        {/* underline tabs */}
        <div className="flex gap-6 border-b border-[#EAEEED] mb-4">
          <button
            onClick={() => setView("topics")}
            className={`pb-2 text-sm font-semibold transition-all ${
              view === "topics"
                ? "text-[#141f1d] border-b-2 border-[#141f1d] -mb-px"
                : "text-[#90aba7]"
            }`}>
            Topics
          </button>
          <button
            onClick={() => setView("quizzes")}
            className={`pb-2 text-sm font-semibold transition-all ${
              view === "quizzes"
                ? "text-[#141f1d] border-b-2 border-[#141f1d] -mb-px"
                : "text-[#90aba7]"
            }`}>
            Past Quizzes
          </button>
        </div>

        {/* scrollable area */}
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide pb-2">
          {view === "topics" && (
            <div className="flex flex-col gap-1">
              {Topics.map((t, i) => {
                const stats = quizData.find(q => q.topic_id === t.id)
                const count = stats?.quiz_count ?? 0
                const avg = stats?.avg_score ?? 0
                return (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-0.5 shrink-0">
                    <div className="flex flex-col flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#14153A]">{t.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{count} quizzes</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${avg}%`,
                              background: avg >= 70
                                ? `linear-gradient(to right, #10b98199, #10b981)`
                                : count > 0
                                ? `linear-gradient(to right, #fbbf2499, #fbbf24)`
                                : `#e5e7eb`,
                            }}
                          />
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-xl ${
                          avg >= 70 ? "bg-green-100 text-green-700" :
                          count > 0  ? "bg-yellow-100 text-yellow-600" :
                                       "bg-gray-100 text-gray-400"
                        }`}>
                          {count > 0 ? `${avg}%` : "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {view === "quizzes" && (
            <PastQuizzes
              topics={Topics}
              onRetake={(quizId) => router.push(`/class/${courseId}/quiz/${quizId}`)}
              onReview={(quizId) => router.push(`/class/${courseId}/quiz/${quizId}?mode=review&attemptId=${quizId}`)}
            />
          )}
        </div>
      </div>
    </>
  )
}