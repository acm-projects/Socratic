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
    <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-6 shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-md font-semibold text-[#14153A]">Achievements</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-7 h-7 rounded-full hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={14} className="text-[#141f1d]" />
          </button>
          <span className="text-xs text-[#90aba7]">{page + 1} / {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="w-7 h-7 rounded-full hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center transition-colors"
          >
            <ChevronRight size={14} className="text-[#141f1d]" />
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        {visible.map((a) => (
          <div key={a.id} className="bg-gradient-to-b from-white/80 to-white/40 rounded-2xl p-6 flex-1 flex flex-col items-center text-center hover:shadow-sm transition-all">
            <img src={a.unlocked ? a.colored : a.greyed} alt={a.label} className="w-24 h-24 object-contain mb-4" />
            <p className="text-sm font-bold text-[#141f1d] mb-1" style={{ opacity: a.unlocked ? 1 : 0.4 }}>{a.label}</p>
            <p className="text-xs font-medium text-[#347A73]">{a.unlocked ? "Completed" : "Locked"}</p>
          </div>
        ))}
      </div>
    </div>
  )
}