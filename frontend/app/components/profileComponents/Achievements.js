"use client"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSession } from "next-auth/react"

  const achievements = [
    { id: 1,  label: "First Quiz Completed",          unlocked: true,  colored: "/icons/medal-green.png",   greyed: "/icons/medal-greyed.png" },
    { id: 2,  label: "10 Quizzes Completed",           unlocked: true,  colored: "/icons/pen-blue.png",      greyed: "/icons/pen-greyed.png" },
    { id: 3,  label: "First Retake Completed",         unlocked: true,  colored: "/icons/pen-blue.png",      greyed: "/icons/pen-greyed.png" },
    { id: 4,  label: "20 Chat Messages Sent",          unlocked: true,  colored: "/icons/chat-purple.png",   greyed: "/icons/chat-greyed.png" },
    { id: 5,  label: "Perfect Score on a Quiz",        unlocked: false,  colored: "/icons/medal-green.png",   greyed: "/icons/medal-greyed.png" },
    { id: 6,  label: "5 Day Study Streak",             unlocked: false, colored: "/icons/streak-blue.png",   greyed: "/icons/streak-greyed.png" },
    { id: 7,  label: "5 Perfect Quiz Scores",          unlocked: false, colored: "/icons/pen-blue.png",      greyed: "/icons/pen-greyed.png" },
    { id: 8,  label: "10 Perfect Quiz Scores",         unlocked: false, colored: "/icons/pen-blue.png",      greyed: "/icons/pen-greyed.png" },
    { id: 9,  label: "5 Retakes Completed",            unlocked: false, colored: "/icons/camera-purple.png", greyed: "/icons/cameria-greyed.png" },
    { id: 10, label: "10 Day Study Streak",            unlocked: false, colored: "/icons/streak-blue.png",   greyed: "/icons/streak-greyed.png" },
    { id: 11, label: "First Study Session Scheduled",  unlocked: false, colored: "/icons/chat-green.png",    greyed: "/icons/chat-greyed.png" },
    { id: 12, label: "10 Perfect Score Questions",     unlocked: false, colored: "/icons/medal-green.png",   greyed: "/icons/medal-greyed.png" },
    { id: 13, label: "20 Retakes Completed",           unlocked: false, colored: "/icons/camera-purple.png", greyed: "/icons/cameria-greyed.png" },
    { id: 14, label: "10 Study Sessions Scheduled",    unlocked: false, colored: "/icons/chat-green.png",    greyed: "/icons/chat-greyed.png" },
    { id: 15, label: "30 Day Study Streak",            unlocked: false, colored: "/icons/streak-blue.png",   greyed: "/icons/streak-greyed.png" },
    { id: 16, label: "20 Perfect Score Questions",     unlocked: false, colored: "/icons/medal-green.png",   greyed: "/icons/medal-greyed.png" },
    { id: 17, label: "100 Chat Messages Sent",         unlocked: false, colored: "/icons/chat-purple.png",   greyed: "/icons/chat-greyed.png" },
    { id: 18, label: "50 Perfect Score Questions",     unlocked: false, colored: "/icons/medal-green.png",   greyed: "/icons/medal-greyed.png" },
    { id: 19, label: "50 Day Study Streak",            unlocked: false, colored: "/icons/streak-blue.png",   greyed: "/icons/streak-greyed.png" },
    { id: 20, label: "20 Study Sessions Scheduled",    unlocked: false, colored: "/icons/chat-green.png",    greyed: "/icons/chat-greyed.png" },
  ]

export default function Achievements() {
  const { data: session } = useSession()
  const [achievements, setAchievements] = useState([])



  useEffect(() => { 
    if (!session) return
    fetch(`/backend/users/${session.user.id}/achievements`)
      .then(res => res.json())
      .then(data => {
        console.log("achievements:", data)
        const formatted = data.map(a => ({
        id: a.id,
        label: a.name,
        unlocked: a.unlocked,
        colored: a.icon_colored,
        greyed: a.icon_greyed
      }))
    .sort((a, b) => b.unlocked - a.unlocked)  // unlocked (true=1) first

        setAchievements(formatted)
      })
      .catch(err => console.error(err));
   }, [session])








  const [page, setPage] = useState(0)
  const perPage = 5
  const totalPages = Math.ceil(achievements.length / perPage)
  const visible = achievements.slice(page * perPage, page * perPage + perPage)

  return (
    <div className="flex flex-col gap-3">

      {/* cards */}
      <div className="flex gap-3 flex-1">
        {visible.map((a) => (
        <div key={a.id} className="bg-white/65 backdrop-blur-sm rounded-2xl flex-1 flex flex-col items-center justify-center px-5 pt-12 pb-12 gap-7">
            <img
            src={a.unlocked ? a.colored : a.greyed}
            alt={a.label}
            width={90}
            height={90}
            />
            <div className="flex flex-col items-center gap-1" style={{ minHeight: "52px", justifyContent: "flex-start" }}>
            <span
                className="text-center leading-snug"
                style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1a2e2b",
                opacity: a.unlocked ? 1 : 0.4,
                }}
            >
                {a.label}
            </span>
            <span style={{ fontSize: "11px", fontWeight: 400, color: "#90aba7" }}>
                {a.unlocked ? "Completed" : "Locked"}
            </span>
            </div>
        </div>
        ))}
      </div>

      {/* nav — bottom right */}
      <div className="flex items-center justify-end gap-2 mt-auto">
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center transition-colors"
        >
          <ChevronLeft size={14} className="text-[#141f1d]" />
        </button>
        <span className="text-xs text-[#90aba7]">{page + 1} / {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center transition-colors"
        >
          <ChevronRight size={14} className="text-[#141f1d]" />
        </button>
      </div>

    </div>
  )
}