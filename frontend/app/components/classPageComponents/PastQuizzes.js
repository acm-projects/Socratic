const quizzes = [
  { name: "Trees",      date: "Mar 1, 2025",  score: 92 },
  { name: "Trees",      date: "Feb 28, 2025", score: 74 },
  { name: "Graphs",     date: "Feb 21, 2025", score: 98 },
  { name: "Set Theory", date: "Feb 14, 2025", score: 64 },
  { name: "Set Theory", date: "Feb 14, 2025", score: 64 },
   { name: "Set Theory", date: "Feb 14, 2025", score: 64 },
    { name: "Set Theory", date: "Feb 14, 2025", score: 64 },
]

import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

function ScoreBadge({ score }) {
  const passing = score >= 70
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-xl  ${
      passing
        ? "bg-green-100 text-green-700"
        : "bg-yellow-100 text-yellow-600"
    }`}>
      {score}%
    </span>
  )
}

export default function PastQuizzes() {
  return (
    <div className="flex flex-col gap-2 h-full">
      {quizzes.map((quiz, i) => (
        <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2 shrink-0">

          {/* Name and date */}
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-sm font-medium text-[#14153A]">{quiz.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{quiz.date}</p>
            {/* progress bar */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1.5">
            <div
              className="h-full rounded-full"
              style={{
                width: `${quiz.score}%`,
                background: `linear-gradient(to right, #10b98199, #10b981)`,
              }}
            />
          </div>
          </div>

          {/* Score */}
          <ScoreBadge score={quiz.score} />

          {/* Buttons */}
          <div className="flex gap-2">
            <button className="text-xs font-medium text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
              Retake
            </button>
            <button className="text-xs font-bold text-white bg-[#3a9e94] px-3 py-1 rounded-lg hover:bg-[#2d766f]">
              Review
            </button>
            {/* previous color was #3959e9 */}
          </div>

        </div>
      ))}
    </div>
  )
}