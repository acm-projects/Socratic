"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function FriendAchievements({ session }) {
  const [achievements, setAchievements] = useState([])
  const [achievementPage, setAchievementPage] = useState(0)
  const perPage = 5

  const totalPages = Math.ceil(achievements.length / perPage)
  const visibleAchievements = achievements.slice(achievementPage * perPage, achievementPage * perPage + perPage)

  useEffect(() => {
    if (!session) return
    fetch(`/backend/users/${session.user.id}/friends/achievements`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(f => ({
          friend: `${f.first_name} ${f.last_name}`,
          achievement: f.achievement_title,
          icon: f.icon_colored || "/icons/medal-green.png"  // use backend field, fallback to default
        }))
        setAchievements(formatted)
      })
      .catch(err => console.error(err))
  }, [session])

  return (
    <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-6 shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-md font-semibold text-[#14153A]">Friend Achievements</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAchievementPage(p => Math.max(0, p - 1))}
            disabled={achievementPage === 0}
            className="w-7 h-7 rounded-full hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={14} className="text-[#141f1d]" />
          </button>
          <span className="text-xs text-[#90aba7]">{achievementPage + 1} / {totalPages}</span>
          <button
            onClick={() => setAchievementPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={achievementPage === totalPages - 1}
            className="w-7 h-7 rounded-full hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center transition-colors"
          >
            <ChevronRight size={14} className="text-[#141f1d]" />
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        {visibleAchievements.map((achievement, i) => (
          <div
            key={i}
            className="bg-gradient-to-b from-white/80 to-white/40 rounded-2xl p-6 flex-1 flex flex-col items-center text-center hover:shadow-md transition-all"
          >
            <img
              src={achievement.icon}
              alt={achievement.achievement}
              className="w-24 h-24 object-contain mb-4"
            />
            <p className="text-sm font-bold text-[#141f1d] mb-1">{achievement.friend}</p>
            <p className="text-xs font-medium text-[#347A73]">{achievement.achievement}</p>
          </div>
        ))}
      </div>
    </div>
  )
}