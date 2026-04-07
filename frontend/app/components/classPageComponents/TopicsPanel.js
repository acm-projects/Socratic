"use client"
import { useState } from "react"
import PastQuizzes from "../PastQuizzes"
// import QuizModal from "../QuizModal"

export default function TopicsPanel({ topics, onQuizClick }) {
  const [view, setView] = useState("topics")

  return (
    <>
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

      {/* fixed height - change */}
      <div className="min-h-72">
        {view === "topics" && (
          <div className="flex flex-col gap-2">
            {topics.map((t, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2">
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#14153A]">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.quizzes} quizzes</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-xl ${
                  t.pct >= 70 ? "bg-green-100 text-green-700" :
                  t.pct > 0   ? "bg-yellow-100 text-yellow-600" :
                                "bg-gray-100 text-gray-400"
                }`}>
                  {t.pct > 0 ? `${t.pct}%` : "—"}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={onQuizClick} 
                    className="text-xs font-bold text-white bg-[#3a9e94] px-4 py-1.5 rounded-lg hover:bg-[#2d766f]">
                    Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === "quizzes" && <PastQuizzes />}
      </div>

      
    </>
  )
}